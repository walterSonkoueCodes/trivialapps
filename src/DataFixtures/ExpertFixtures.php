<?php
// src/DataFixtures/ExpertFixtures.php

namespace App\DataFixtures;

use App\Entity\Expert;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class ExpertFixtures extends Fixture
{
    public function __construct(private readonly UserPasswordHasherInterface $hasher) {}

    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();

        for ($i = 0; $i < 10; $i++) {
            $user = new User();
            $user->setEmail("expert$i@example.com")
                ->setFullName($faker->name())
                ->setPassword($this->hasher->hashPassword($user, 'password'))
                ->setRoles(['ROLE_EXPERT'])
                ->setPhone($faker->phoneNumber())
                ->setBirthDate(\DateTimeImmutable::createFromMutable($faker->dateTimeBetween('-40 years', '-20 years')));


            $expert = new Expert();
            $expert->setUser($user)
                ->setBio($faker->paragraph(3))
                ->setPhotoUrl("https://i.pravatar.cc/300?img=" . rand(1, 70))
                ->setExpertises($faker->randomElements(['web', 'mobile', 'data', 'design'], 2))
                ->setScore($faker->randomFloat(1, 3, 5))
                ->setProjectsCompleted($faker->numberBetween(5, 40))
                ->setAvailability("Full time")
                ->setHobbies([$faker->word(), $faker->word()])
                ->setEarnings($faker->randomFloat(2, 1000, 10000));

            $manager->persist($user);
            $manager->persist($expert);
        }

        $manager->flush();
    }
}
