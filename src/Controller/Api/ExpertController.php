<?php

namespace App\Controller\Api;

use App\Repository\ExpertRepository;
use App\Repository\InvoiceRepository;
use App\Repository\ProjectRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;

#[Route('/api/experts')]
class ExpertController extends AbstractController
{
    public function __construct(
        private readonly ExpertRepository $expertRepository,
        private readonly ProjectRepository $projectRepository,
        private readonly InvoiceRepository $invoiceRepository,
        private readonly EntityManagerInterface $em
    ) {}

    #[Route('', name: 'api_experts_list', methods: ['GET'])]
    public function listExperts(Request $request): JsonResponse
    {
        try {
            $page = max(1, (int)$request->query->get('page', 1));
            $pageSize = max(1, (int)$request->query->get('pageSize', 6));

            $paginatedResult = $this->expertRepository->findPaginated($page, $pageSize);

            return $this->json(
                [
                    'experts' => $paginatedResult['items'],
                    'total' => $paginatedResult['total']
                ],
                Response::HTTP_OK,
                [],
                ['groups' => ['expert:read']]
            );
        } catch (\Exception $e) {
            return $this->json(
                ['error' => 'Failed to fetch experts', 'details' => $e->getMessage()],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    #[Route('/{id}', name: 'api_expert_details', methods: ['GET'])]
    public function getExpertDetails(int $id): JsonResponse
    {
        $expert = $this->expertRepository->findExpertWithDetails($id);

        if (!$expert) {
            return $this->json(['error' => 'Expert not found'], 404);
        }

        return $this->json($expert, 200, [], [
            'groups' => [
                'expert:read',
                'user:read',
                'project:read',
                'invoice:read',
                'service:detail',
            ],
            'circular_reference_handler' => fn($object) => $object->getId()
        ]);
    }

    #[Route('/top', name: 'api_experts_top', methods: ['GET'])]
    public function topExperts(): JsonResponse
    {
        $experts = $this->expertRepository->findTopExperts(5);
        return $this->json($experts, 200, [], ['groups' => ['expert:read', 'user:read']]);
    }

    #[Route('/dashboard/{userId}', name: 'api_expert_dashboard', methods: ['GET'])]
    public function expertDashboard(int $userId): JsonResponse
    {
        $expert = $this->expertRepository->findExpertWithDetailsByUserId($userId);

        if (!$expert) {
            return $this->json(['error' => 'Expert not found'], 404);
        }

        $projects = $expert->getProjects();

        $pendingTotal = 0;
        $pendingCount = 0;
        $earningsTotal = 0;
        $completedCount = 0;

        $currentProjects = [];
        $assignedProjects = [];

        foreach ($projects as $project) {
            $status = $project->getStatus()?->value;
            $amount = array_sum(array_map(
                fn($invoice) => (float) $invoice->getAmount(),
                $project->getInvoices()->toArray()
            ));

            // Ajout enrichi dans assignedProjects (tous)
            $assignedProjects[] = [
                'id' => $project->getId(),
                'title' => $project->getTitle(),
                'status' => $status,
                'deadline' => $project->getDeadline()?->format('Y-m-d'),
                'client' => $project->getClient()?->getFullName(),
                'service' => $project->getService()?->getName(),
                'image' => $project->getImage(),
                'earnings' => $amount,
                'estimated_working_hours' => $project->getEstimatedWorkingHours(),
            ];

            if ($status === 'completed') {
                $earningsTotal += $amount;
                $completedCount++;
            } else {
                $pendingTotal += $amount;
                $pendingCount++;

                $currentProjects[] = [
                    'id' => $project->getId(),
                    'title' => $project->getTitle(),
                    'status' => $status,
                    'deadline' => $project->getDeadline()?->format('Y-m-d'),
                    'client' => $project->getClient()?->getFullName(),
                    'service' => $project->getService()?->getName(),
                    'image' => $project->getImage(),
                    'earnings' => $amount,
                    'estimated_working_hours' => $project->getEstimatedWorkingHours(),
                ];
            }
        }

        // Mise à jour conditionnelle des propriétés persistées
        $hasChanged = false;

        if ($expert->getProjectsCompleted() !== $completedCount) {
            $expert->setProjectsCompleted($completedCount);
            $hasChanged = true;
        }

        if ((float) $expert->getEarnings() !== $earningsTotal) {
            $expert->setEarnings($earningsTotal);
            $hasChanged = true;
        }

        if ($hasChanged) {
            $this->em->flush();
        }

        return $this->json([
            'earnings' => [
                'total' => $earningsTotal
            ],
            'pendingPayments' => [
                'total' => $pendingTotal,
                'count' => $pendingCount
            ],
            'currentProjects' => $currentProjects,
            'assignedProjects' => $assignedProjects,
            'expertises' => $expert->getExpertises(), // 🎯 Ajout ici
        ], 200);
    }


}