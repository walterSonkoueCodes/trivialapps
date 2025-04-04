<?php
// src/DataFixtures/UserFixtures.php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{
    public function __construct(private readonly UserPasswordHasherInterface $hasher) {}

    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();

        for ($i = 0; $i < 30; $i++) {
            $user = new User();
            $user->setEmail("user$i@example.com")
                ->setFullName($faker->name())
                ->setPassword($this->hasher->hashPassword($user, 'password'))
                ->setRoles(['ROLE_CLIENT'])
                ->setPhone($faker->phoneNumber())
                ->setBirthDate(\DateTimeImmutable::createFromMutable($faker->dateTimeBetween('-40 years', '-18 years')));

            $manager->persist($user);
        }

        $manager->flush();
    }
}