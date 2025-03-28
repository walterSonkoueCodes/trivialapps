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
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');
        $now = new \DateTimeImmutable();

        $expertisePool = [
            'Développement Web', 'Design UX/UI', 'Applications Mobiles', 'SEO', 'Science des Données',
            'Modélisation 3D', 'Rédaction', 'DevOps', 'IA/ML', 'Cybersécurité'
        ];

        $hobbiesPool = [
            'Photographie', 'Randonnée', 'Cuisine', 'Jeux vidéo', 'Lecture', 'Voyage', 'Musique',
            'Peinture', 'Sport', 'Jardinage', 'Bricolage', 'Cinéma', 'Échecs', 'Natation', 'Yoga'
        ];

        $photos = [
            '/images/experts/expert_1.png',
            '/images/experts/expert_2.png',
            '/images/experts/expert_3.png',
            '/images/experts/expert_4.png'
        ];

        for ($i = 0; $i < 10; $i++) {
            $user = new User();
            $fullName = $faker->name();
            $email = $faker->unique()->email();

            $user->setEmail($email);
            $user->setFullName($fullName);
            $user->setRoles(['ROLE_EXPERT']);
            $user->setCreatedAt($now);
            $user->setUpdatedAt($now);
            $user->setPhone($faker->phoneNumber());
            $user->setIsVerified(true);
            $user->setVerificationToken(null);

            $hashedPassword = $this->passwordHasher->hashPassword($user, 'password');
            $user->setPassword($hashedPassword);

            $expert = new Expert();
            $expert->setUser($user);
            $expert->setBio($faker->paragraph(3));
            $expert->setPhotoUrl($faker->randomElement($photos));
            $expert->setExpertises($faker->randomElements($expertisePool, rand(2, 4)));
            $expert->setHobbies($faker->randomElements($hobbiesPool, rand(2, 5)));
            $expert->setAvailability($faker->sentence(8));
            $expert->setAge($faker->numberBetween(25, 60));
            $expert->setScore($faker->randomFloat(2, 3.5, 5.0));
            $expert->setProjectsCompleted($faker->numberBetween(5, 40));

            $experiences = [];
            for ($j = 0; $j < rand(1, 3); $j++) {
                $experiences[] = [
                    'title' => $faker->jobTitle,
                    'company' => $faker->company,
                    'period' => $faker->year('-5 years') . ' - ' . $faker->year(),
                    'description' => $faker->paragraph(2)
                ];
            }
            $expert->setExperiences($experiences);

            $education = [];
            for ($k = 0; $k < rand(1, 2); $k++) {
                $education[] = [
                    'degree' => $faker->randomElement(['Licence', 'Master', 'Doctorat']),
                    'institution' => $faker->randomElement([
                        'Université Paris-Saclay',
                        'École Polytechnique',
                        'Sorbonne Université',
                        'Université Lyon 1',
                        'École 42'
                    ]),
                    'year' => $faker->year('-10 years'),
                    'description' => $faker->sentence()
                ];
            }
            $expert->setEducation($education);

            $manager->persist($user);
            $manager->persist($expert);
        }

        $manager->flush();
    }
}