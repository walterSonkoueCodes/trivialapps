<?php
namespace App\Controller\Api;

use App\Entity\User;
use App\Repository\ProjectRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/me/projects')]
class ProjectController extends AbstractController
{
    #[Route('', name: 'api_me_projects', methods: ['GET'])]
    public function getUserProjects(ProjectRepository $repository): \Symfony\Component\HttpFoundation\JsonResponse
    {
        /** @var User $user */
        $user = $this->getUser();

        $projects = $repository->findByClientWithStatus($user);

        return $this->json(
            $projects,
            context: ['groups' => ['project:read']]
        );
    }
}