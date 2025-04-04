<?php
// src/Controller/Api/AuthController.php

namespace App\Controller\Api;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Service\EmailService;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\HttpFoundation\Response;



class AuthController extends AbstractController
{
    public function __construct(private readonly EmailService $emailService) {}

    #[Route('/api/auth/register', name: 'api_register', methods: ['POST'])]
    public function register(
        Request $request,
        EntityManagerInterface $em,
        UserPasswordHasherInterface $passwordHasher,
        ValidatorInterface $validator
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        // Basic validation
        $constraints = new Assert\Collection([
            'email' => [
                new Assert\NotBlank(),
                new Assert\Email()
            ],
            'password' => [
                new Assert\NotBlank(),
                new Assert\Length(['min' => 8])
            ],
            'fullName' => new Assert\NotBlank(),
            'phone' => new Assert\Optional(),
            'birthDate' => new Assert\Optional()
        ]);

        $violations = $validator->validate($data, $constraints);
        if (count($violations) > 0) {
            $errors = [];
            foreach ($violations as $violation) {
                $field = str_replace(['[', ']'], '', $violation->getPropertyPath());
                $errors[$field] = $violation->getMessage();
            }
            return new JsonResponse(['errors' => $errors], 400);
        }

        // Check if user already exists
        $existingUser = $em->getRepository(User::class)->findOneBy(['email' => $data['email']]);
        if ($existingUser) {
            return new JsonResponse(['error' => 'Email already exists'], 409);
        }

        // Create new user (automatically as ROLE_CLIENT)
        $user = new User();
        $user->setEmail($data['email']);
        $user->setPassword($passwordHasher->hashPassword($user, $data['password']));
        $user->setFullName($data['fullName']);
        $user->setRoles(['ROLE_CLIENT']); // Default role
        $user->setIsVerified(false);
        $user->setVerificationToken(Uuid::v4());

        if (isset($data['phone'])) {
            $user->setPhone($data['phone']);
        }

        if (isset($data['birthDate'])) {
            try {
                $birthDate = new \DateTimeImmutable($data['birthDate']);
                $user->setBirthDate($birthDate);
            } catch (\Exception $e) {
                return new JsonResponse(['error' => 'Invalid birth date format'], 400);
            }
        }

        $em->persist($user);
        $em->flush();

        // Send verification email
        $this->emailService->sendVerificationEmail($user);
        $this->emailService->sendAdminNotification($user);

        return new JsonResponse([
            'message' => 'Registration successful. Please check your email to verify your account.',
            'user' => [
                'email' => $user->getEmail(),
                'fullName' => $user->getFullName()
            ]
        ], 201);
    }

    #[Route('/api/auth/verify-email', name: 'api_verify_email', methods: ['GET'])]
    public function verifyEmail(Request $request, EntityManagerInterface $em): Response
    {
        $token = $request->query->get('token');
        $user = $em->getRepository(User::class)->findOneBy(['verificationToken' => $token]);

        if (!$user) {
            return new RedirectResponse('/verification-error');
        }

        $user->setIsVerified(true);
        $user->setVerificationToken(null);
        $em->flush();

        return new RedirectResponse('/verification-success');
    }

    #[Route('/api/auth/resend-verification', name: 'api_resend_verification', methods: ['POST'])]
    public function resendVerification(Request $request, EntityManagerInterface $em, EmailService $emailService): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $user = $em->getRepository(User::class)->findOneBy(['email' => $data['email']]);

        if (!$user) {
            return new JsonResponse(['error' => 'No account found with this email'], 404);
        }

        if ($user->isVerified()) {
            return new JsonResponse(['error' => 'This account has already been verified'], 400);
        }

        if (!$user->getVerificationToken()) {
            $user->setVerificationToken(Uuid::v4());
            $em->flush();
        }

        $emailService->sendVerificationEmail($user);

        return new JsonResponse(['message' => 'A new confirmation email has been sent']);
    }

}