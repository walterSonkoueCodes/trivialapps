<?php

namespace App\DataFixtures;

use App\Entity\User;
use App\Entity\Project;
use App\Entity\Service;
use App\Entity\Expert;
use App\Entity\Invoice;
use App\Enum\InvoiceStatusEnum;
use App\Enum\StatusEnum;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        // Création de services
        $services = [];
        foreach (['Site Web', 'App Mobile', 'Design 3D', 'Logo', 'Montage Vidéo'] as $serviceName) {
            $service = new Service();
            $service->setName($serviceName);
            $service->setDescription("Description du service $serviceName");
            $service->setPrice(rand(500, 5000));
            $service->setCategory("Catégorie générale");
            $manager->persist($service);
            $services[] = $service;
        }

        // Création d'un client
        $client = new User();
        $client->setFullName("Jean Dupont");
        $client->setEmail("jean.dupont@example.com");
        $client->setRoles(["ROLE_USER"]);
        $client->setPassword($this->passwordHasher->hashPassword($client, "password123"));
        $client->setCreatedAt(new \DateTimeImmutable());  // Ajout de la date de création
        $client->setUpdatedAt(new \DateTimeImmutable());  // Ajout de la date de mise à jour
        $manager->persist($client);

        // Création d'un expert
        $expert = new Expert();
        $expert->setFullName("Expert Designer");
        $expert->setBio("Spécialiste en design 3D et UX/UI");
        $expert->setPhotoUrl("https://via.placeholder.com/150");
        $expert->setExpertise(["Design 3D", "Logo"]);
        $manager->persist($expert);

        // Création d'un projet
        $project = new Project();
        $project->setTitle("Refonte du site web");
        $project->setDescription("Un projet de refonte pour un site e-commerce.");
        $project->setStatus(StatusEnum::BACKLOG);
        $project->setClient($client);
        $project->setCreatedAt(new \DateTimeImmutable());
        $project->setUpdatedAt(new \DateTimeImmutable());
        $manager->persist($project);

        // Création d'une facture
        $invoice = new Invoice();
        $invoice->setNumber("INV-001");
        $invoice->setClient($client);
        $invoice->setProject($project);
        $invoice->setAmount(1200);
        $invoice->setStatus(InvoiceStatusEnum::PENDING);
        $invoice->setIssuedAt(new \DateTimeImmutable());
        $invoice->setDueAt((new \DateTimeImmutable())->modify('+15 days'));
        $manager->persist($invoice);

        $manager->flush();
    }
}
