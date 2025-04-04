<?php
// src/EventSubscriber/UserCreationSubscriber.php
namespace App\EventSubscriber;

use App\Entity\User;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;

class UserCreationSubscriber implements EventSubscriberInterface
{
    public function __construct(private MailerInterface $mailer) {}

    public static function getSubscribedEvents(): array
    {
        return [
            'postPersist' => 'onUserCreated',
        ];
    }

    public function onUserCreated(LifecycleEventArgs $args): void
    {
        $entity = $args->getObject();

        if (!$entity instanceof User) return;

        $email = (new TemplatedEmail())
            ->from('noreply@trivialapps.net')
            ->to('admin@trivialapps.net') // ou une adresse paramétrée
            ->subject('🆕 New User Registered')
            ->htmlTemplate('emails/admin_new_user.html.twig')
            ->context(['user' => $entity]);

        $this->mailer->send($email);
    }
}
