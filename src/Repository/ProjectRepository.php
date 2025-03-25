<?php

// src/Repository/ProjectRepository.php

namespace App\Repository;

use App\Entity\Project;
use App\Entity\User;
use App\Enum\StatusEnum;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class ProjectRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Project::class);
    }

    /**
     * @return Project[]
     */
    public function findByClientWithStatus(User $user, ?StatusEnum $status = null): array
    {
        $qb = $this->createQueryBuilder('p')
            ->andWhere('p.client = :user')
            ->setParameter('user', $user)
            ->orderBy('p.createdAt', 'DESC');

        if ($status) {
            $qb->andWhere('p.status = :status')
                ->setParameter('status', $status->value);
        }

        return $qb->getQuery()
            ->getResult();
    }

    public function findRecentProjects(User $user, int $maxResults = 5): array
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.client = :user')
            ->setParameter('user', $user)
            ->orderBy('p.updatedAt', 'DESC')
            ->setMaxResults($maxResults)
            ->getQuery()
            ->getResult();
    }
}
