<?php
// src/Controller/Api/UserController.php

namespace App\Controller\Api;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Doctrine\ORM\EntityManagerInterface;

class UserController extends AbstractController
{
    public function __construct(private EntityManagerInterface $em) {}

    #[Route('/api/me', name: 'api_me', methods: ['GET'])]
    #[IsGranted('IS_AUTHENTICATED_FULLY')]
    public function me(SerializerInterface $serializer): JsonResponse
    {
        /** @var User $user */
        $user = $this->getUser();

        $json = $serializer->serialize(
            $user,
            'json',
            ['groups' => ['user:read', 'expert:read']]
        );

        return JsonResponse::fromJsonString($json);
    }

    #[Route('/api/Clients/dashboard/{userId}', name: 'api_client_dashboard', methods: ['GET'])]
    public function clientDashboard(int $userId): JsonResponse
    {
        $user = $this->em->getRepository(User::class)->find($userId);

        if (!$user) {
            return $this->json(['error' => 'User not found'], 404);
        }

        return $this->json([
            'projects' => $user->getUserProjects(),
            'invoices' => $user->getClientInvoices(),
        ], 200, [], [
            'groups' => [
                'user:read',
                'project:read',
                'invoice:read',
                'service:detail',
            ],
            'circular_reference_handler' => fn($object) => $object->getId()
        ]);
    }

}
