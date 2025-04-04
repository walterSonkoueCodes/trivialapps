<?php

namespace App\Controller\Api;

use App\Entity\Invoice;
use App\Entity\Project;
use App\Entity\Service;
use App\Entity\User;
use App\Enum\InvoiceStatusEnum;
use App\Enum\StatusEnum;
use App\Repository\ServiceRepository;
use App\Repository\ProjectRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api')]
class ProjectController extends AbstractController
{
    public function __construct(
        private readonly ProjectRepository $projectRepository,
        private readonly EntityManagerInterface $em
    ) {}

    #[Route('/project/start', name: 'api_project_start', methods: ['POST'])]
    public function startProject(
        Request $request,
        ServiceRepository $serviceRepository,
        ValidatorInterface $validator,
        SerializerInterface $serializer,
        MailerInterface $mailer
    ): JsonResponse {
        $user = $this->getUser();
        if (!$user instanceof User) {
            return $this->json(['error' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
        }

        $data = json_decode($request->getContent(), true);

        $service = $serviceRepository->find($data['serviceId'] ?? 0);
        if (!$service) {
            return $this->json(['error' => 'Service not found'], Response::HTTP_BAD_REQUEST);
        }

        // Créer un nouveau projet
        $project = new Project();
        $project->setClient($user);
        $project->setService($service);
        $project->setStatus(StatusEnum::BACKLOG);
        $project->setCreatedAt(new \DateTimeImmutable());
        $project->setUpdatedAt(new \DateTimeImmutable());
        $project->setEstimatedWorkingHours((float)($data['estimatedWorkingHours'] ?? 30));
        $project->setDeadline(isset($data['deadline']) ? new \DateTimeImmutable($data['deadline']) : null);
        $project->setSelectedFeatures($data['selectedFeatures'] ?? []);
        $project->setTitle('Pending title');

        // Description générée automatiquement
        $features = $data['selectedFeatures'] ?? [];
        $description = "Service: {$service->getName()}\n";
        $description .= "Client: {$user->getFullName()}\n";
        $description .= "Selected Features:\n";
        foreach ($features as $f) {
            $description .= "- $f\n";
        }
        $project->setDescription($description);

        // Valider
        $errors = $validator->validate($project);
        if (count($errors) > 0) {
            return $this->json($serializer->serialize($errors, 'json'), 400);
        }

        $this->em->persist($project);
        $this->em->flush(); // On flush pour récupérer l'ID

        // Générer un vrai titre de projet
        $projectTitle = $service->getName() . ' - ' . $user->getFullName() . ' - ' . $project->getId();
        $project->setTitle($projectTitle);

        // Créer une facture provisoire
        $invoice = new Invoice();
        $invoice->setClient($user);
        $invoice->setProject($project);
        $invoice->setAmount($service->getPrice()); // Prix de base
        $invoice->setStatus(InvoiceStatusEnum::PENDING);
        $invoice->setIssuedAt(new \DateTimeImmutable());
        $invoice->setDeadline($project->getDeadline() ?? (new \DateTimeImmutable())->modify('+7 days'));

        // Générer le numéro d'Invoice
        $today = new \DateTimeImmutable();
        $invoiceNumber = sprintf(
            'TA-%d-%d-%02d-%02d-%d',
            $user->getId(),
            $project->getId(),
            $today->format('d'),
            $today->format('m'),
            $today->format('Y')
        );
        $invoice->setNumber($invoiceNumber);

        $this->em->persist($invoice);
        $this->em->flush();

        // Envoi d'email
        $email = (new TemplatedEmail())
            ->from('noreply@trivialapps.net')
            ->to($user->getEmail())
            ->subject('📄 Your project request has been received!')
            ->htmlTemplate('emails/project_confirmation.html.twig')
            ->context([
                'user' => $user,
                'project' => $project,
                'invoice' => $invoice,
                'logoPath' => '/images/logo.svg'
            ]);

        $mailer->send($email);

        $emailToAdmin = (new TemplatedEmail())
            ->from('noreply@trivialapps.net')
            ->to('admin@trivialapps.net')
            ->subject('📢 New Project Started')
            ->htmlTemplate('emails/admin_new_project.html.twig')
            ->context([
                'user' => $user,
                'project' => $project,
                'invoice' => $invoice,
            ]);

        $mailer->send($emailToAdmin);


        return $this->json(['message' => 'Project created, invoice initialized and confirmation email sent.'], 201);
    }
}
