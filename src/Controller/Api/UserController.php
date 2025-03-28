<?php
// src/Controller/Api/UserController.php

namespace App\Controller\Api;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class UserController extends AbstractController
{
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
}
