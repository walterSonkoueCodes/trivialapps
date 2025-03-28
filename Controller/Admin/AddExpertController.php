<?php
// src/Controller/Admin/ExpertController.php
namespace App\Controller\Admin;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

#[Route('/api/admin/addexperts')]
#[IsGranted('ROLE_OWNER')]
class AddExpertController extends AbstractController
{
    #[Route('', name: 'add_expert', methods: ['POST'])]
    public function addExpert(
        Request $request,
        EntityManagerInterface $em,
        UserPasswordHasherInterface $passwordHasher
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

// On attend fullName, email et password
        if (!isset($data['fullName'], $data['email'], $data['password'])) {
            return new JsonResponse(['message' => 'Données incomplètes'], 400);
        }

        $expert = new User();
        $expert->setFullName($data['fullName']);
        $expert->setEmail($data['email']);
        $hashedPassword = $passwordHasher->hashPassword($expert, $data['password']);
        $expert->setPassword($hashedPassword);
// Attribuer le rôle expert
        $expert->setRoles(['ROLE_EXPERT']);

        $em->persist($expert);
        $em->flush();

        return new JsonResponse(['message' => 'Expert ajouté avec succès'], 201);
    }
}
