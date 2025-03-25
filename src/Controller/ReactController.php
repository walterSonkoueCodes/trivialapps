<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ReactController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('react/index.html.twig', [
            'app_name' => 'TrivialApps',
            'app_version' => '1.0',
            'dark_mode_enabled' => $this->getUser() ? $this->getUser()->getDarkMode() : false
        ]);
    }

    #[Route('/api/home-data', name: 'api_home_data', methods: ['GET'])]
    public function getHomeData(): JsonResponse
    {
        return $this->json([
            'featuredProjects' => $this->projectRepository->findFeatured(),
            'services' => $this->serviceRepository->findAll(),
        ]);
    }
}