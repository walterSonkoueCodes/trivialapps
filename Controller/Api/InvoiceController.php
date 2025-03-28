<?php
// src/Controller/API/InvoiceController.php

namespace App\Controller\Api;

use App\Entity\Invoice;
use App\Repository\InvoiceRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/me')]
class InvoiceController extends AbstractController
{
    #[Route('/invoices', name: 'api_invoices', methods: ['GET'])]
    public function getInvoices(InvoiceRepository $repository): JsonResponse
    {
        /** @var User $user */
        $user = $this->getUser();

        $invoices = $repository->findLatestInvoices($user);

        return $this->json(
            $invoices,
            200,
            [],
            ['groups' => ['invoice:read']]
        );
    }

    #[Route('/invoices/unpaid', name: 'api_unpaid_invoices', methods: ['GET'])]
    public function getUnpaidInvoices(InvoiceRepository $repository): JsonResponse
    {
        /** @var User $user */
        $user = $this->getUser();

        $invoices = $repository->findUnpaidForUser($user);

        return $this->json(
            $invoices,
            200,
            [],
            ['groups' => ['invoice:read']]
        );
    }
}