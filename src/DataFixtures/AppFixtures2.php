<?php
// src/DataFixtures/AppFixtures.php

namespace App\DataFixtures;

use App\Entity\Expert;
use App\Entity\Invoice;
use App\Entity\Project;
use App\Entity\Service;
use App\Entity\User;
use App\Enum\InvoiceStatusEnum;
use App\Enum\StatusEnum;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class AppFixtures2 extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        // Récupération des entités existantes
        $experts = $manager->getRepository(Expert::class)->findAll();
        $services = $manager->getRepository(Service::class)->findAll();

        // Création de clients (Users)
        $clients = [];
        for ($i = 0; $i < 5; $i++) {
            $client = new User();
            $client->setEmail('client'.$i.'-'.uniqid().'@example.com');
            $client->setPassword('$2y$13$...'); // Mot de passe hashé
            $client->setFullName($faker->name());
            $client->setCreatedAt(new \DateTimeImmutable());
            $client->setUpdatedAt(new \DateTimeImmutable());
            $manager->persist($client);
            $clients[] = $client;
        }

        // Création des projets
        foreach ($clients as $client) {
            for ($i = 0; $i < 3; $i++) { // 3 projets par client
                $project = new Project();
                $project->setTitle('Projet '.$faker->words(3, true));
                $project->setDescription($faker->paragraph(3));
                $project->setStatus($faker->randomElement(StatusEnum::cases()));
                $project->setClient($client);
                $project->setService($faker->randomElement($services));
                $project->setExpert($faker->randomElement($experts));
                $project->setCreatedAt(new \DateTimeImmutable());
                $project->setUpdatedAt(new \DateTimeImmutable());
                $project->setImage('/images/projects/project_'.rand(1,5).'.jpg');

                // Création des factures pour chaque projet
                $invoiceCount = rand(1, 3);
                for ($j = 0; $j < $invoiceCount; $j++) {
                    $invoice = new Invoice();
                    $invoice->setNumber('INV-'.date('Ymd').'-'.str_pad($j+1, 3, '0', STR_PAD_LEFT));
                    $invoice->setAmount($project->getService()->getPrice() / $invoiceCount);
                    $invoice->setStatus($faker->randomElement(InvoiceStatusEnum::cases()));
                    $invoice->setIssuedAt(new \DateTimeImmutable());
                    $invoice->setDueAt((new \DateTimeImmutable())->modify('+'.rand(15, 60).' days'));
                    $invoice->setClient($client);
                    $invoice->setProject($project);

                    $manager->persist($invoice);
                    $project->addInvoice($invoice);
                }

                // Mise à jour des compteurs
                $project->getExpert()->setProjectsCompleted(
                    $project->getExpert()->getProjectsCompleted() + 1
                );

                $manager->persist($project);
            }
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            ExpertFixtures::class,
            ServiceFixtures::class
        ];
    }
}