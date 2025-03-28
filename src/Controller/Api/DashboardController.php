<?php
// src/Controller/Api/DashboardController.php

namespace App\Controller\Api;

use App\Repository\UserRepository;
use App\Repository\ProjectRepository;
use App\Repository\InvoiceRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class DashboardController extends AbstractController
{
    private $userRepository;
    private $projectRepository;
    private $invoiceRepository;

    public function __construct(
        UserRepository $userRepository,
        ProjectRepository $projectRepository,
        InvoiceRepository $invoiceRepository
    ) {
        $this->userRepository = $userRepository;
        $this->projectRepository = $projectRepository;
        $this->invoiceRepository = $invoiceRepository;
    }

    /**
     * @Route("/api/dashboard/client/{id}", name="api_dashboard_client", methods={"GET"})
     */
    public function clientDashboard(int $id): JsonResponse
    {
        $client = $this->userRepository->find($id);

        if (!$client || !in_array('ROLE_CLIENT', $client->getRoles())) {
            return $this->json(['error' => 'Client not found'], 404);
        }

        $projects = $this->projectRepository->findBy(['client' => $client]);
        $invoices = $this->invoiceRepository->findBy(['client' => $client]);

        $data = [
            'projects' => array_map(function($project) {
                return [
                    'id' => $project->getId(),
                    'title' => $project->getTitle(),
                    'status' => $project->getStatus(),
                    'progress' => $project->getProgress(),
                    'image' => $project->getImage(),
                    'expert' => $project->getExpert() ? [
                        'id' => $project->getExpert()->getId(),
                        'name' => $project->getExpert()->getFullName(),
                        'email' => $project->getExpert()->getEmail(),
                        'photo' => $project->getExpert()->getPhoto()
                    ] : null,
                    'createdAt' => $project->getCreatedAt()->format('Y-m-d H:i:s')
                ];
            }, $projects),
            'invoices' => array_map(function($invoice) {
                return [
                    'id' => $invoice->getId(),
                    'number' => $invoice->getNumber(),
                    'amount' => $invoice->getAmount(),
                    'status' => $invoice->getStatus(),
                    'projectTitle' => $invoice->getProject()->getTitle(),
                    'issuedAt' => $invoice->getIssuedAt()->format('Y-m-d H:i:s'),
                    'dueAt' => $invoice->getDueAt()->format('Y-m-d H:i:s'),
                    'downloadUrl' => '/api/invoices/' . $invoice->getId() . '/download'
                ];
            }, $invoices),
            'stats' => [
                'totalProjects' => count($projects),
                'activeProjects' => count(array_filter($projects, fn($p) => $p->getStatus() === 'active')),
                'paidInvoices' => count(array_filter($invoices, fn($i) => $i->getStatus() === 'paid')),
                'pendingInvoices' => count(array_filter($invoices, fn($i) => $i->getStatus() === 'pending'))
            ]
        ];

        return $this->json($data);
    }

    /**
     * @Route("/api/dashboard/expert/{id}", name="api_dashboard_expert", methods={"GET"})
     */
    public function expertDashboard(int $id): JsonResponse
    {
        $expert = $this->userRepository->find($id);

        if (!$expert || !in_array('ROLE_EXPERT', $expert->getRoles())) {
            return $this->json(['error' => 'Expert not found'], 404);
        }

        $projects = $this->projectRepository->findBy(['expert' => $expert]);
        $invoices = $this->invoiceRepository->findExpertInvoices($expert);

        // Calcul des gains
        $earnings = array_reduce($invoices, fn($carry, $i) =>
        $i->getStatus() === 'paid' ? $carry + ($i->getAmount() * 0.3) : $carry, 0);

        $pending = array_reduce($invoices, fn($carry, $i) =>
        $i->getStatus() === 'pending' ? $carry + ($i->getAmount() * 0.3) : $carry, 0);

        $data = [
            'assignedProjects' => array_map(function($project) {
                return [
                    'id' => $project->getId(),
                    'title' => $project->getTitle(),
                    'client' => [
                        'id' => $project->getClient()->getId(),
                        'name' => $project->getClient()->getFullName()
                    ],
                    'deadline' => $project->getDeadline()->format('Y-m-d'),
                    'progress' => $project->getProgress(),
                    'status' => $project->getStatus()
                ];
            }, $projects),
            'earnings' => [
                'total' => $earnings,
                'pending' => $pending,
                'completedProjects' => count(array_filter($projects, fn($p) => $p->getStatus() === 'completed'))
            ],
            'tasks' => $this->projectRepository->findCurrentTasks($expert)
        ];

        return $this->json($data);
    }

    /**
     * @Route("/api/dashboard/owner", name="api_dashboard_owner", methods={"GET"})
     */
    public function ownerDashboard(): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_OWNER');

        $users = $this->userRepository->findAll();
        $projects = $this->projectRepository->findAll();
        $invoices = $this->invoiceRepository->findAll();

        $data = [
            'systemOverview' => [
                'totalUsers' => count($users),
                'totalClients' => count(array_filter($users, fn($u) => in_array('ROLE_CLIENT', $u->getRoles()))),
                'totalExperts' => count(array_filter($users, fn($u) => in_array('ROLE_EXPERT', $u->getRoles()))),
                'totalProjects' => count($projects),
                'activeProjects' => count(array_filter($projects, fn($p) => $p->getStatus() === 'active'))
            ],
            'financialStatus' => [
                'totalRevenue' => array_reduce($invoices, fn($carry, $i) => $carry + $i->getAmount(), 0),
                'paidAmount' => array_reduce(
                    array_filter($invoices, fn($i) => $i->getStatus() === 'paid'),
                    fn($carry, $i) => $carry + $i->getAmount(), 0
                ),
                'expertPayouts' => array_reduce(
                    array_filter($invoices, fn($i) => $i->getStatus() === 'paid'),
                    fn($carry, $i) => $carry + ($i->getAmount() * 0.3), 0
                )
            ],
            'recentActivity' => [
                'lastProjects' => array_slice(array_map(function($project) {
                    return [
                        'id' => $project->getId(),
                        'title' => $project->getTitle(),
                        'status' => $project->getStatus(),
                        'client' => $project->getClient()->getFullName()
                    ];
                }, $projects), 0, 5),
                'pendingInvoices' => count(array_filter($invoices, fn($i) => $i->getStatus() === 'pending'))
            ]
        ];

        return $this->json($data);
    }

    /**
     * @Route("/api/invoices/{id}/download", name="api_invoice_download", methods={"GET"})
     */
    public function downloadInvoice(int $id): Response
    {
        $invoice = $this->invoiceRepository->find($id);
        // ... implémentation PDF
    }
}