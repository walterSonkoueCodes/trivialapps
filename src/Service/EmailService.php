<?php
// src/Service/EmailService.php

namespace App\Service;

use App\Entity\User;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Twig\Environment;

class EmailService
{
    public function __construct(
        private MailerInterface $mailer,
        private Environment $twig,
        private UrlGeneratorInterface $urlGenerator
    ) {}

    public function sendVerificationEmail(User $user): void
    {
        $verificationUrl = $this->urlGenerator->generate('api_verify_email', [
            'token' => $user->getVerificationToken(),
        ], UrlGeneratorInterface::ABSOLUTE_URL);

        $email = (new Email())
            ->from('noreply@trivialapps.net')
            ->to($user->getEmail())
            ->subject('Verifying your email address')
            ->html($this->twig->render('emails/verify_email.html.twig', [
                'user' => $user,
                'verificationUrl' => $verificationUrl
            ]));

        $this->mailer->send($email);
    }

    public function sendAdminNotification(User $user): void
    {
        $email = (new Email())
            ->from('noreply@trivialapps.net')
            ->to('admin@trivialapps.net')
            ->subject('New user account created')
            ->html($this->twig->render('emails/admin_new_user.html.twig', [
                'user' => $user
            ]));

        $this->mailer->send($email);
    }
}
