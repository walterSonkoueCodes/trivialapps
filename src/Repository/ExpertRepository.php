<?php

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
            foreach ($skills as $key => $skill) {
                $qb->andWhere("JSON_CONTAINS(e.expertises, :skill$key) = 1")
                    ->setParameter("skill$key", json_encode($skill));
            }
        }

        return $qb->getQuery()
            ->getResult();
    }

    /**
     * @return Expert[]
     */
    public function findAllWithDetails(): array
    {
        // Si vous ajoutez une relation 'projects' à votre entité Expert plus tard
        return $this->createQueryBuilder('e')
            //->leftJoin('e.projects', 'p') // À décommenter si la relation existe
            //->addSelect('p')
            ->getQuery()
            ->getResult();
    }

    public function findExpertProjects(Expert $expert): array
    {
        return $this->createQueryBuilder('e')
            ->select('p.id', 'p.title', 'p.status', 'p.progress', 'c.fullName as client')
            ->join('e.projects', 'p')
            ->join('p.client', 'c')
            ->where('e.id = :expertId')
            ->setParameter('expertId', $expert->getId())
            ->orderBy('p.dueDate', 'ASC')
            ->getQuery()
            ->getArrayResult();
    }

    public function findExpertWithDetails(int $id): ?Expert
    {
        return $this->createQueryBuilder('e')
            ->leftJoin('e.user', 'u')           // Ajout du user
            ->addSelect('u')
            ->leftJoin('e.projects', 'p')
            ->addSelect('p')
            ->leftJoin('p.client', 'c')
            ->addSelect('c')
            ->leftJoin('p.service', 's')
            ->addSelect('s')
            ->leftJoin('p.projectInvoice', 'i')
            ->addSelect('i')
            ->where('e.id = :id')
            ->setParameter('id', $id)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function findExpertWithDetailsByUserId(int $userId): ?Expert
    {
        return $this->createQueryBuilder('e')
            ->leftJoin('e.user', 'u')
            ->addSelect('u')
            ->leftJoin('e.projects', 'p')
            ->addSelect('p')
            ->leftJoin('p.client', 'c')
            ->addSelect('c')
            ->leftJoin('p.service', 's')
            ->addSelect('s')
            ->leftJoin('p.projectInvoice', 'i')
            ->addSelect('i')
            ->where('u.id = :userId')
            ->setParameter('userId', $userId)
            ->getQuery()
            ->getOneOrNullResult();
    }


    public function findPaginated(int $page, int $pageSize): array
    {
        // Requête principale avec jointures valides
        $queryBuilder = $this->createQueryBuilder('e')
            ->leftJoin('e.projects', 'p')
            ->addSelect('p') // Chargement des projets associés
            ->orderBy('e.id', 'ASC')
            ->setFirstResult(($page - 1) * $pageSize)
            ->setMaxResults($pageSize);

        $items = $queryBuilder->getQuery()->getResult();

        // Requête de comptage total
        $totalQuery = $this->createQueryBuilder('e')
            ->select('COUNT(e.id)')
            ->getQuery();

        $total = $totalQuery->getSingleScalarResult();

        return [
            'items' => $items,
            'total' => (int)$total
        ];
    }

    /**
     * Récupère les 5 experts avec les meilleurs scores
     */
    public function findTopExperts(int $limit = 5): array
    {
        return $this->createQueryBuilder('e')
            ->orderBy('e.score', 'DESC')
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult();
    }

}