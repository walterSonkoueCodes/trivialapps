<?php

namespace App\Controller\Api;

use App\Entity\Expert;
use App\Repository\ExpertRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;

#[Route('/api/experts')]
class ExpertController extends AbstractController
{
    public function __construct(
        private readonly ExpertRepository $expertRepository
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
            'circular_reference_handler' => function ($object) {
                return $object->getId(); // Ou tout autre identifiant unique
            }
        ]);
    }
}