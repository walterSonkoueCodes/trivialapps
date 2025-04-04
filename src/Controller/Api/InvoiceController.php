<?php

namespace App\Controller\Api;

use App\Entity\Invoice;
use App\Enum\InvoiceStatusEnum;
use App\Repository\InvoiceRepository;
use Doctrine\ORM\EntityManagerInterface;
use Dompdf\Dompdf;
use Dompdf\Options;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Twig\Environment;

#[Route('/api/me')]
class InvoiceController extends AbstractController
{
    public function __construct(
        private readonly EntityManagerInterface $em,
        private readonly Environment $twig,
    ) {}

    #[Route('/invoices/{id}/download', name: 'api_invoice_download', methods: ['GET'])]
    public function downloadInvoice(int $id, InvoiceRepository $invoiceRepository): Response
    {
        $invoice = $invoiceRepository->find($id);
        if (!$invoice) {
            throw $this->createNotFoundException('Facture introuvable');
        }

        $project = $invoice->getProject();
        $user = $invoice->getClient();

        // Chemins
        $projectDir = $this->getParameter('kernel.project_dir');
        $invoiceDir = $projectDir.'/assets/docs/invoices/';
        $filename = 'invoice_' . $invoice->getNumber() . '.pdf';
        $fullPath = $invoiceDir . $filename;
        $relativePath = '/assets/docs/invoices/' . $filename;

        // Créer dossier s'il n'existe pas
        if (!file_exists($invoiceDir)) {
            (new Filesystem())->mkdir($invoiceDir);
        }

        // Création PDF si manquant
        if (!file_exists($fullPath)) {
            $features = $this->getSelectedFeatures($invoice);
            $total = $this->calculateTotal($invoice);

            $html = $this->twig->render('pdf/invoice_template.html.twig', [
                'invoice' => $invoice,
                'project' => $project,
                'client' => $user,
                'features' => $features,
                'total' => $total,
            ]);

            $dompdf = new Dompdf((new Options())->set('defaultFont', 'Helvetica'));
            $dompdf->loadHtml($html);
            $dompdf->setPaper('A4', 'portrait');
            $dompdf->render();

            file_put_contents($fullPath, $dompdf->output());
        }

        // Mise à jour du chemin
        if ($invoice->getPdfPath() !== $relativePath) {
            $invoice->setPdfPath($relativePath);
            $this->em->flush();
        }

        return new BinaryFileResponse($fullPath, 200, [
            'Content-Disposition' => ResponseHeaderBag::DISPOSITION_ATTACHMENT,
        ]);
    }

    private function getSelectedFeatures(Invoice $invoice): array
    {
        $project = $invoice->getProject();
        $service = $project->getService();

        return array_filter($service->getFeatureDetails() ?? [],
            fn($f) => in_array($f['name'], $project->getSelectedFeatures() ?? [])
        );
    }

    private function calculateTotal(Invoice $invoice): float
    {
        $service = $invoice->getProject()->getService();
        $total = (float) $service->getPrice();

        foreach ($this->getSelectedFeatures($invoice) as $feature) {
            $total += (float) $feature['price'];
        }

        return $total;
    }

    // Utilise ce code dans ton ProjectController lorsqu'on crée une Invoice
    public function createInvoiceForProject(Project $project): Invoice
    {
        $user = $project->getClient();
        $totalAmount = $this->calculateTotalFromProject($project);
        $invoiceNumber = 'TA-' . $user->getId() . '-' . $project->getId() . '-' . date('d-m-Y');

        $invoice = new Invoice();
        $invoice->setClient($user);
        $invoice->setProject($project);
        $invoice->setNumber($invoiceNumber);
        $invoice->setStatus(InvoiceStatusEnum::PENDING);
        $invoice->setAmount($totalAmount);
        $invoice->setIssuedAt(new \DateTimeImmutable());
        $invoice->setDeadline($project->getDeadline() ?? (new \DateTimeImmutable())->modify('+7 days'));

        $this->em->persist($invoice);
        $this->em->flush();

        return $invoice;
    }

    private function calculateTotalFromProject(Project $project): float
    {
        $service = $project->getService();
        $features = $project->getSelectedFeatures() ?? [];
        $featureDetails = $service->getFeatureDetails() ?? [];

        $total = (float) $service->getPrice();

        foreach ($featureDetails as $feature) {
            if (in_array($feature['name'], $features)) {
                $total += (float) $feature['price'];
            }
        }

        return $total;
    }

    #[Route('/invoices/{id}/email', name: 'api_invoice_email', methods: ['POST'])]
    public function sendInvoiceEmail(
        int $id,
        InvoiceRepository $invoiceRepository,
        MailerInterface $mailer,
        Environment $twig
    ): \Symfony\Component\HttpFoundation\JsonResponse
    {
        $invoice = $invoiceRepository->find($id);
        if (!$invoice) {
            return $this->json(['error' => 'Invoice not found'], Response::HTTP_NOT_FOUND);
        }

        $project = $invoice->getProject();
        $client = $invoice->getClient();
        $features = $this->getSelectedFeatures($invoice);
        $total = $this->calculateTotal($invoice);

        // Générer le PDF si nécessaire
        $projectDir = $this->getParameter('kernel.project_dir');
        $invoiceDir = $projectDir . '/assets/docs/invoices/';
        $filename = 'invoice_' . $invoice->getNumber() . '.pdf';
        $fullPath = $invoiceDir . $filename;

        if (!file_exists($fullPath)) {
            $html = $twig->render('pdf/invoice_template.html.twig', [
                'invoice' => $invoice,
                'project' => $project,
                'client' => $client,
                'features' => $features,
                'total' => $total
            ]);

            $dompdf = new Dompdf((new Options())->set('defaultFont', 'Helvetica'));
            $dompdf->loadHtml($html);
            $dompdf->setPaper('A4', 'portrait');
            $dompdf->render();

            file_put_contents($fullPath, $dompdf->output());
        }

        // Email avec pièce jointe
        $email = (new TemplatedEmail())
            ->from('noreply@trivialapps.net')
            ->to($client->getEmail())
            ->subject('🧾 Your Invoice is Ready')
            ->htmlTemplate('emails/invoice_notification.html.twig')
            ->context([
                'user' => $client,
                'project' => $project,
                'invoice' => $invoice
            ])
            ->attachFromPath($fullPath, $filename, 'application/pdf');

        $mailer->send($email);

        return $this->json(['message' => 'Invoice sent by email.']);
    }
}
