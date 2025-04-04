<?php
// src/Controller/Api/OwnerController.php

namespace App\Controller\Api;

use App\Entity\Project;
use App\Entity\User;
use App\Repository\InvoiceRepository;
use App\Repository\ProjectRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api/owner')]
class OwnerController extends AbstractController
{
    public function __construct(
        private readonly EntityManagerInterface $em,
        private readonly UserRepository $userRepo,
        private readonly ProjectRepository $projectRepo,
        private readonly InvoiceRepository $invoiceRepo
    ) {}

    #[Route('/dashboard/{userId}', name: 'api_owner_dashboard', methods: ['GET'])]
    public function ownerDashboard(int $userId, SerializerInterface $serializer): JsonResponse
    {
        $user = $this->userRepo->find($userId);

        if (!$user || !in_array('ROLE_OWNER', $user->getRoles())) {
            return $this->json(['error' => 'Access denied'], 403);
        }

        $allUsers = $this->userRepo->findAll();
        $allProjects = $this->projectRepo->findAll();
        $allInvoices = $this->invoiceRepo->findAll();

        $revenue = array_reduce($allInvoices, fn($carry, $invoice) => $carry + (float)$invoice->getAmount(), 0);

        $paid = count(array_filter($allInvoices, fn($i) => $i->getStatus()?->value === 'paid'));
        $pending = count(array_filter($allInvoices, fn($i) => $i->getStatus()?->value === 'pending'));
        $overdue = count(array_filter($allInvoices, fn($i) => $i->getStatus()?->value === 'overdue'));

        $systemStats = [
            'users' => count($allUsers),
            'projects' => count($allProjects),
            'pending' => count(array_filter($allProjects, fn($p) => $p->getStatus()?->value === 'backlog')),
            'revenue' => $revenue,
        ];

        $financials = [
            'totalRevenue' => $revenue,
            'expenses' => round($revenue * 0.4),
            'paymentDistribution' => [
                ['name' => 'Paid', 'value' => round($paid / max(1, count($allInvoices)) * 100)],
                ['name' => 'Pending', 'value' => round($pending / max(1, count($allInvoices)) * 100)],
                ['name' => 'Overdue', 'value' => round($overdue / max(1, count($allInvoices)) * 100)],
            ]
        ];

        $usersData = array_map(function (User $u) {
            return [
                'id' => $u->getId(),
                'fullName' => $u->getFullName(),
                'email' => $u->getEmail(),
                'role' => $u->getRoles()[0] ?? 'N/A'
            ];
        }, $allUsers);

        return $this->json([
            'systemStats' => $systemStats,
            'financials' => $financials,
            'allUsers' => $usersData
        ], 200);
    }

    #[Route('/user-details/{userId}', name: 'api_owner_user_details', methods: ['GET'])]
    public function getUserDetails(int $userId): JsonResponse
    {
        $user = $this->userRepo->find($userId);

        if (!$user) {
            return $this->json(['error' => 'User not found'], 404);
        }

        $projects = $this->projectRepo->findBy(['client' => $user]);

        return $this->json([
            'id' => $user->getId(),
            'fullName' => $user->getFullName(),
            'email' => $user->getEmail(),
            'phone' => $user->getPhone(),
            'role' => $user->getRoles()[0] ?? 'N/A',
            'projects' => array_map(fn(Project $p) => [
                'id' => $p->getId(),
                'title' => $p->getTitle(),
                'status' => $p->getStatus()?->value,
                'deadline' => $p->getDeadline()?->format('Y-m-d'),
            ], $projects)
        ], 200);
    }

    #[Route('/assign-project/{userId}', name: 'api_owner_assign_project', methods: ['POST'])]
    public function assignProject(int $userId, Request $request): JsonResponse
    {
        $user = $this->userRepo->find($userId);

        if (!$user) {
            return $this->json(['error' => 'User not found'], 404);
        }

        $data = json_decode($request->getContent(), true);

        $projectId = $data['projectId'] ?? null;

        if (!$projectId) {
            return $this->json(['error' => 'Missing projectId'], 400);
        }

        $project = $this->projectRepo->find($projectId);

        if (!$project) {
            return $this->json(['error' => 'Project not found'], 404);
        }

        $project->setExpert($user->getExpertProfile());
        $this->em->flush();

        return $this->json(['message' => 'Project assigned successfully'], 200);
    }
}
