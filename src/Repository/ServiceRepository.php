<?php

// src/Repository/ServiceRepository.php

namespace App\Repository;

use App\Entity\Service;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\Tools\Pagination\Paginator;

class ServiceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Service::class);
    }

    /**
     * @return Service[]
     */
    public function findAllByCategory(string $category): array
    {
        return $this->createQueryBuilder('s')
            ->where('s.category = :category')
            ->setParameter('category', $category)
            ->orderBy('s.createdAt', 'DESC')
            ->getQuery()
            ->getResult();
    }

    public function findAllWithDetails()
    {
        return $this->createQueryBuilder('s')
            ->where('s.image IS NOT NULL')
            ->andWhere('s.videoUrl IS NOT NULL')
            ->getQuery()
            ->getResult();
    }

    public function findAllCategories(): array
    {
        return $this->createQueryBuilder('s')
            ->select('DISTINCT s.category')
            ->getQuery()
            ->getSingleColumnResult();
    }

    public function findFeatured(int $maxResults): array
    {
        return $this->createQueryBuilder('s')
            ->where('s.image IS NOT NULL')
            ->andWhere('s.videoUrl IS NOT NULL')
            ->setMaxResults($maxResults)
            ->getQuery()
            ->getResult();
    }

    public function findAllServices(?string $category = null, ?string $fields = null): array
    {
        $qb = $this->createQueryBuilder('s')
            ->where('s.image IS NOT NULL');

        if ($category && $category !== 'all') {
            $qb->andWhere('s.category = :category')
                ->setParameter('category', $category);
        }

        try {
            return $qb->getQuery()->getResult();
        } catch (\Exception $e) {
            // Log l'erreur si nécessaire
            return [];
        }
    }
    public function findByCriteria(string $category = 'all'): array
    {
        $qb = $this->createQueryBuilder('s')
            ->addSelect('partial s.{id, name, description, price, category, image, icon}');

        if ($category !== 'all') {
            $qb->where('s.category = :category')
                ->setParameter('category', $category);
        }

        return $qb->getQuery()
            ->setHint(Query::HINT_FORCE_PARTIAL_LOAD, true)
            ->getResult();
    }

    public function findPaginated(int $page, int $pageSize, string $category = 'all'): array
    {
        $queryBuilder = $this->createQueryBuilder('s')
            ->orderBy('s.id', 'ASC');

        if ($category !== 'all') {
            $queryBuilder->andWhere('s.category = :category')
                ->setParameter('category', $category);
        }

        // Création de la requête paginée
        $query = $queryBuilder->getQuery()
            ->setFirstResult(($page - 1) * $pageSize)
            ->setMaxResults($pageSize);

        // Utilisation du Paginator pour obtenir le total
        $paginator = new Paginator($query, $fetchJoinCollection = true);

        return [
            'services' => iterator_to_array($paginator),
            'total' => count($paginator)
        ];
    }


    public function findOnePerCategory(): array
    {
        $conn = $this->getEntityManager()->getConnection();

        $sql = <<<SQL
        SELECT DISTINCT ON (category) *
        FROM service
        ORDER BY category, created_at DESC
        SQL;

        $stmt = $conn->prepare($sql);
        $result = $stmt->executeQuery();

        return $result->fetchAllAssociative();
    }


}