<?php

// src/Repository/ExpertRepository.php

namespace App\Repository;

use App\Entity\Expert;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class ExpertRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Expert::class);
    }

    /**
     * @return Expert[]
     */
    public function findAllWithSkills(array $skills = []): array
    {
        $qb = $this->createQueryBuilder('e')
            ->orderBy('e.fullName', 'ASC');

        if (!empty($skills)) {
            $qb->andWhere('e.expertise IN (:skills)')
                ->setParameter('skills', $skills);
        }

        return $qb->getQuery()
            ->getResult();
    }
}