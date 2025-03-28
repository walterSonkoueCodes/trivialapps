<?php
// src/Service/EmailService.php

namespace App\Service;

use App\Entity\User;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;

class EmailService
{
    public function __construct(
        private MailerInterface $mailer,
        private string $appEnv
    ) {}

    public function sendVerificationEmail(User $user): void
    {
        //if ($this->appEnv === 'dev') {
        //    return; // Ne pas envoyer d'email en dev
        //}

        $email = (new TemplatedEmail())
            ->from('noreply@trivialapps.net')
            ->to($user->getEmail())
            ->subject('Confirmez votre email')
            ->htmlTemplate('emails/verification.html.twig')
            ->context([
                'verificationUrl' => "https://votre-domaine.com/api/auth/verify-email?token={$user->getVerificationToken()}",
                'user' => $user
            ]);

        $this->mailer->send($email);
    }
}