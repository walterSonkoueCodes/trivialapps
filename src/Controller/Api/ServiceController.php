<?php

namespace App\Controller\Api;

use App\Entity\Service;
use App\Repository\ServiceRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;

#[Route('/api/services')]
class ServiceController extends AbstractController
{
    public function __construct(
        private ServiceRepository $serviceRepository
    ) {}

    #[Route('', name: 'api_services_list', methods: ['GET'])]
    public function list(Request $request): JsonResponse
    {
        try {
            $category = $request->query->get('category', 'all');

            $qb = $this->serviceRepository->createQueryBuilder('s')
                ->orderBy('s.createdAt', 'DESC');

            if ($category !== 'all') {
                $qb->where('s.category = :category')
                    ->setParameter('category', $category);
            }

            $services = $qb->getQuery()->getResult();

            return $this->json(
                $services,
                Response::HTTP_OK,
                [],
                ['groups' => ['service:list']]
            );

        } catch (\Exception $e) {
            return $this->json(
                [
                    'error' => 'Server error',
                    'message' => $e->getMessage(),
                    'trace' => $e->getTraceAsString() // Seulement en dev
                ],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }
    #[Route('/{id}', name: 'api_service_detail', methods: ['GET'])]
    public function detail(Service $service, Request $request): JsonResponse
    {
        $fields = $request->query->get('fields', 'id,name,fullDescription,price,category,videoUrl,features,image,icon');

        return $this->json(
            $service,
            Response::HTTP_OK,
            [],
            [
                'groups' => ['service:detail'],
                AbstractNormalizer::ATTRIBUTES => explode(',', $fields)
            ]
        );
    }

    #[Route('/categories', name: 'api_services_categories', methods: ['GET'])]
    public function categories(): JsonResponse
    {
        $categories = $this->serviceRepository->findAllCategories();

        return $this->json([
            'categories' => $categories,
            'count' => count($categories)
        ]);
    }

    #[Route('/featured', name: 'api_services_featured', methods: ['GET'])]
    public function featured(): JsonResponse
    {
        $services = $this->serviceRepository->findFeatured(3);

        return $this->json(
            $services,
            Response::HTTP_OK,
            [],
            ['groups' => ['service:list']]
        );
    }
}