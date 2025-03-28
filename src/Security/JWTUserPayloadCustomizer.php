<?php
// src/Security/JWTUserPayloadCustomizer.php

namespace App\Security;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;

#[AsEventListener(event: JWTCreatedEvent::class, method: 'onJWTCreated')]
class JWTUserPayloadCustomizer
{
    public function onJWTCreated(JWTCreatedEvent $event): void
    {
        $user = $event->getUser();

        $payload = $event->getData();
        $payload['fullName'] = $user->getFullName();
        $payload['roles'] = $user->getRoles();

        $event->setData($payload);
    }
}
