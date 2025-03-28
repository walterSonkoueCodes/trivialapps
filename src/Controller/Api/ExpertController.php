<?php

namespace App\Controller\Api;

use App\Entity\Expert;
use App\Repository\ExpertRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/experts')]
class ExpertController extends AbstractController
{
    #[Route('', name: 'api_experts', methods: ['GET'])]
    public function getExperts(ExpertRepository $repository): JsonResponse
    {
        $experts = $repository->findAllWithSkills();

        return $this->json(
            $experts,
            context: ['groups' => ['expert:read']]
        );
    }
}