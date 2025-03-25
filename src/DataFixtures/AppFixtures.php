<?php

namespace App\DataFixtures;

use App\Entity\Expert;
use App\Entity\Invoice;
use App\Entity\Project;
use App\Entity\Service;
use App\Entity\User;
use App\Enum\InvoiceStatusEnum;
use App\Enum\StatusEnum;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    public function __construct(
        private UserPasswordHasherInterface $passwordHasher
    ) {}

    public function load(ObjectManager $manager): void
    {
        // Création des services
        $services = [
            ['name' => 'Site Vitrine', 'description' => 'Création site web vitrine', 'price' => 1500, 'category' => 'web'],
            ['name' => 'Application Mobile', 'description' => 'Développement app iOS/Android', 'price' => 5000, 'category' => 'mobile'],
            ['name' => 'Logo Design', 'description' => 'Création identité visuelle', 'price' => 300, 'category' => 'design'],
        ];

        foreach ($services as $serviceData) {
            $service = new Service();
            $service->setName($serviceData['name'])
                ->setDescription($serviceData['description'])
                ->setPrice($serviceData['price'])
                ->setCategory($serviceData['category']);
            $manager->persist($service);
        }

        // Création des experts
        $experts = [
            ['fullName' => 'Jean Dupont', 'bio' => 'Expert en développement web', 'photoUrl' => 'jean.jpg', 'expertise' => ['PHP', 'Symfony', 'React']],
            ['fullName' => 'Marie Martin', 'bio' => 'Designer graphique', 'photoUrl' => 'marie.jpg', 'expertise' => ['Photoshop', 'Illustrator', 'UI/UX']],
        ];

        foreach ($experts as $expertData) {
            $expert = new Expert();
            $expert->setFullName($expertData['fullName'])
                ->setBio($expertData['bio'])
                ->setPhotoUrl($expertData['photoUrl'])
                ->setExpertise($expertData['expertise']);
            $manager->persist($expert);
        }

        // Création des utilisateurs
        $admin = new User();
        $admin->setEmail('admin@trivialapps.net')
            ->setFullName('Admin System')
            ->setRoles(['ROLE_ADMIN'])
            ->setPassword($this->passwordHasher->hashPassword($admin, 'admin123'))
            ->setCreatedAt(new \DateTimeImmutable())
            ->setUpdatedAt(new \DateTimeImmutable());
        $manager->persist($admin);

        $client1 = new User();
        $client1->setEmail('client1@example.com')
            ->setFullName('Client Premium')
            ->setRoles(['ROLE_CLIENT'])
            ->setPassword($this->passwordHasher->hashPassword($client1, 'client123'))
            ->setCreatedAt(new \DateTimeImmutable())
            ->setUpdatedAt(new \DateTimeImmutable());
        $manager->persist($client1);

        $client2 = new User();
        $client2->setEmail('client2@example.com')
            ->setFullName('Client Standard')
            ->setRoles(['ROLE_CLIENT'])
            ->setPassword($this->passwordHasher->hashPassword($client2, 'client123'))
            ->setCreatedAt(new \DateTimeImmutable())
            ->setUpdatedAt(new \DateTimeImmutable());
        $manager->persist($client2);

        // Création des projets
        $project1 = new Project();
        $project1->setTitle('Site e-commerce')
            ->setDescription('Création boutique en ligne')
            ->setStatus(StatusEnum::IN_PROGRESS)
            ->setClient($client1)
            ->setCreatedAt(new \DateTimeImmutable())
            ->setUpdatedAt(new \DateTimeImmutable());
        $manager->persist($project1);

        $project2 = new Project();
        $project2->setTitle('Application mobile')
            ->setDescription('App de gestion de projet')
            ->setStatus(StatusEnum::BACKLOG)
            ->setClient($client2)
            ->setCreatedAt(new \DateTimeImmutable())
            ->setUpdatedAt(new \DateTimeImmutable());
        $manager->persist($project2);

        // Création des factures
        $invoice1 = new Invoice();
        $invoice1->setNumber('FAC-2023-001')
            ->setClient($client1)
            ->setProject($project1)
            ->setAmount(2500)
            ->setStatus(InvoiceStatusEnum::PAID)
            ->setIssuedAt(new \DateTimeImmutable('-1 week'))
            ->setDueAt(new \DateTimeImmutable('+1 month'));
        $manager->persist($invoice1);

        $invoice2 = new Invoice();
        $invoice2->setNumber('FAC-2023-002')
            ->setClient($client2)
            ->setProject($project2)
            ->setAmount(1200)
            ->setStatus(InvoiceStatusEnum::PENDING)
            ->setIssuedAt(new \DateTimeImmutable())
            ->setDueAt(new \DateTimeImmutable('+3 weeks'));
        $manager->persist($invoice2);

        $manager->flush();
    }
}