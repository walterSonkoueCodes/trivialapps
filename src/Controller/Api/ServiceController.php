<?php

namespace App\Controller\Api;

use App\Repository\ServiceRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

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

            $query = $this->serviceRepository->createQueryBuilder('s')
                ->addSelect('partial s.{id, name, description, price, category, image}');

            if ($category !== 'all') {
                $query->where('LOWER(s.category) = LOWER(:category)')
                    ->setParameter('category', $category);
            }

            $services = $query->getQuery()->getArrayResult();

            if (empty($services)) {
                return $this->json([], Response::HTTP_OK);
            }

            return $this->json($services, Response::HTTP_OK);

        } catch (\Exception $e) {
            return $this->json(
                ['error' => 'Server error', 'message' => $e->getMessage()],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }
    #[Route('/{id}', name: 'api_service_detail', methods: ['GET'])]
    public function detail(int $id): JsonResponse
    {
        $service = $this->serviceRepository->find($id);

        if (!$service) {
            return $this->json(
                ['error' => 'Service not found'],
                Response::HTTP_NOT_FOUND,
                headers: ['Content-Type' => 'application/json']
            );
        }

        $data = [
            'id' => $service->getId(),
            'name' => $service->getName(),
            'description' => $service->getDescription(),
            'fullDescription' => $service->getFullDescription(),
            'price' => $service->getPrice(),
            'category' => $service->getCategory(),
            'icon' => $service->getIcon(),
            'image' => $service->getImage(),
            'videoUrl' => $service->getVideoUrl(),
            'features' => $service->getFeatures() ?? [],
            'createdAt' => $service->getCreatedAt()?->format('Y-m-d H:i:s')
        ];

        return $this->json(
            $data,
            Response::HTTP_OK,
            headers: ['Content-Type' => 'application/json']
        );
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

    #[Route('/test', name: 'test', methods: ['GET'])]
    public function test(): JsonResponse
    {
        return $this->json(['status' => 'API working']);
    }
}