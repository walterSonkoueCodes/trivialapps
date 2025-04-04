<?php
namespace App\Controller\Api;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api/orders')]
class OrderController extends AbstractController
{
    #[Route('', name: 'api_create_order', methods: ['POST'])]
    public function createOrder(
        Request $request,
        EntityManagerInterface $em,
        ValidatorInterface $validator
    ): JsonResponse {
        /** @var User $user */
        $user = $this->getUser();

        $data = json_decode($request->getContent(), true);
        $orderRequest = new OrderRequest();
        // ... remplir l'objet avec les données

        $errors = $validator->validate($orderRequest);
        if (count($errors) > 0) {
            return $this->json($errors, 400);
        }

        // Créer le projet et la facture
        $project = new Project();
        $project->setClient($user)
            ->setTitle($orderRequest->serviceType)
            ->setStatus(StatusEnum::NEW);

        $invoice = new Invoice();
        $invoice->setAmount($orderRequest->budget)
            ->setProject($project);

        $em->persist($project);
        $em->persist($invoice);
        $em->flush();

        return $this->json($project, 201, context: ['groups' => ['project:read']]);
    }
}