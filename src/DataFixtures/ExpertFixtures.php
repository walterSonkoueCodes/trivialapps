<?php

namespace App\DataFixtures;

use App\Entity\Expert;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class ExpertFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        $expertisePool = [
            'Web Development', 'UX/UI Design', 'Mobile Apps', 'SEO', 'Data Science',
            '3D Modeling', 'Copywriting', 'DevOps', 'AI/ML', 'Cybersecurity'
        ];

        $hobbyPool = ['lecture', 'voyage', 'photographie', 'cuisine', 'randonnée', 'musique', 'jeux vidéo'];

        $photos = [
            '/images/experts/expert_1.png',
            '/images/experts/expert_2.png',
            '/images/experts/expert_3.png',
            '/images/experts/expert_4.png'
        ];

        // Données types pour expériences et formations
        $experienceTemplates = [
            [
                'title' => 'Développeur Full Stack',
                'company' => 'TechCorp',
                'period' => '2018 - Présent',
                'description' => 'Développement d\'applications web complexes avec React et Symfony'
            ],
            [
                'title' => 'Développeur Frontend',
                'company' => 'WebSolutions',
                'period' => '2015 - 2018',
                'description' => 'Création d\'interfaces utilisateur responsive'
            ],
            [
                'title' => 'Consultant IT',
                'company' => 'DigitalSoft',
                'period' => '2013 - 2015',
                'description' => 'Conseil et mise en place de solutions logicielles'
            ]
        ];

        $educationTemplates = [
            [
                'degree' => 'Master en Informatique',
                'institution' => 'Université Paris-Saclay',
                'year' => '2015',
                'description' => 'Spécialisation en Développement Web'
            ],
            [
                'degree' => 'Certification UX Design',
                'institution' => 'École de Design',
                'year' => '2014',
                'description' => 'Formation avancée en expérience utilisateur'
            ],
            [
                'degree' => 'Licence Informatique',
                'institution' => 'Université Lyon 1',
                'year' => '2012',
                'description' => 'Parcours général en informatique'
            ]
        ];

        $totalExperts = 10;

        for ($i = 0; $i < $totalExperts; $i++) {
            $expert = new Expert();
            $expert->setFullName($faker->name());
            $expert->setEmail($faker->unique()->email());
            $expert->setPhotoUrl($faker->randomElement($photos));
            $expert->setBio($faker->paragraph(3));
            $expert->setExpertises($faker->randomElements($expertisePool, rand(2, 4)));
            $expert->setHobbies($faker->randomElements($hobbyPool, rand(1, 3)));
            $expert->setAvailability($faker->sentence(8));
            $expert->setAge($faker->numberBetween(25, 60));
            $expert->setScore($faker->randomFloat(2, 3.5, 5.0));
            $expert->setProjectsCompleted($faker->numberBetween(5, 40));

            // Génération des expériences aléatoires
            $experiences = [];
            $expCount = rand(1, 3);
            for ($j = 0; $j < $expCount; $j++) {
                $template = $experienceTemplates[array_rand($experienceTemplates)];
                $experiences[] = [
                    'id' => $j + 1,
                    'title' => $template['title'],
                    'company' => $faker->company(),
                    'period' => ($faker->year('-5 years') . ' - ' . $faker->year()),
                    'description' => $template['description']
                ];
            }
            $expert->setExperiences($experiences);

            // Génération des formations aléatoires
            $education = [];
            $eduCount = rand(1, 2);
            for ($k = 0; $k < $eduCount; $k++) {
                $template = $educationTemplates[array_rand($educationTemplates)];
                $education[] = [
                    'id' => $k + 1,
                    'degree' => $template['degree'],
                    'institution' => $faker->randomElement([
                        'Université Paris-Saclay',
                        'École Polytechnique',
                        'Sorbonne Université',
                        'Université Lyon 1',
                        'École 42'
                    ]),
                    'year' => $faker->year('-10 years'),
                    'description' => $template['description']
                ];
            }
            $expert->setEducation($education);

            $manager->persist($expert);
        }

        $manager->flush();
    }
}