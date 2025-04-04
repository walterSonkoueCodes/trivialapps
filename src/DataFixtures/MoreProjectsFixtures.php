<?php
// src/DataFixtures/MoreProjectsFixtures.php

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
use Faker\Factory;

class MoreProjectsFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        $experts = $manager->getRepository(Expert::class)->findAll();
        $services = $manager->getRepository(Service::class)->findAll();

        // Récupération manuelle des clients ayant le rôle "ROLE_CLIENT"
        $allUsers = $manager->getRepository(User::class)->findAll();
        $clients = array_filter($allUsers, fn($u) => in_array('ROLE_CLIENT', $u->getRoles()));

        for ($i = 0; $i < 20; $i++) {
            $expert = $faker->randomElement($experts);
            $client = $faker->randomElement($clients);
            $service = $faker->randomElement($services);

            $project = new Project();
            $project->setTitle(substr('Projet ' . implode(' ', $faker->words(3)), 0, 255));
            $project->setDescription(substr($faker->paragraph(3), 0, 255)); // ou changer le type en TEXT si plus de contenu
            $project->setStatus($faker->randomElement(StatusEnum::cases()));
            $project->setClient($client);
            $project->setService($service);
            $project->setExpert($expert);
            $project->setCreatedAt(new \DateTimeImmutable());
            $project->setUpdatedAt(new \DateTimeImmutable());
            $project->setImage('/images/projects/project_' . rand(1, 5) . '.jpg');
            $project->setEstimatedWorkingHours($faker->numberBetween(10, 100));
            $project->setDeadline((new \DateTimeImmutable())->modify('+' . rand(5, 60) . ' days'));

            $invoiceCount = rand(1, 2);
            for ($j = 0; $j < $invoiceCount; $j++) {
                $invoice = new Invoice();
                $invoice->setNumber('NEW-' . date('Ymd') . '-' . str_pad($j + 1, 3, '0', STR_PAD_LEFT));
                $invoice->setAmount($service->getPrice() / $invoiceCount);
                $invoice->setStatus($faker->randomElement(InvoiceStatusEnum::cases()));
                $invoice->setIssuedAt(new \DateTimeImmutable());
                $invoice->setDueAt((new \DateTimeImmutable())->modify('+' . rand(15, 60) . ' days'));
                $invoice->setClient($client);
                $invoice->setProject($project);

                $manager->persist($invoice);
                $project->addInvoice($invoice);
            }

            // Mise à jour des projets terminés
            if ($project->getStatus()?->value === 'completed') {
                $expert->setProjectsCompleted($expert->getProjectsCompleted() + 1);
            }

            $manager->persist($project);
        }

        $manager->flush();
    }
}
