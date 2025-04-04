<?php

// src/Repository/InvoiceRepository.php

namespace App\Repository;

use App\Entity\Invoice;
use App\Entity\User;
use App\Enum\InvoiceStatusEnum;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class InvoiceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Invoice::class);
    }

    /**
     * @return Invoice[]
     */
    public function findUnpaidForUser(User $user): array
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.client = :user')
            ->andWhere('i.status IN (:unpaidStatuses)')
            ->setParameter('user', $user)
            ->setParameter('unpaidStatuses', [
                InvoiceStatusEnum::PENDING->value,
                InvoiceStatusEnum::OVERDUE->value
            ])
            ->orderBy('i.dueAt', 'ASC')
            ->getQuery()
            ->getResult();
    }

    public function findExpertInvoices(User $expert)
    {
        return $this->createQueryBuilder('i')
            ->join('i.project', 'p')
            ->where('p.expert = :expert')
            ->setParameter('expert', $expert)
            ->getQuery()
            ->getResult();
    }

    public function findLatestInvoices(User $user, int $maxResults = 5): array
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.client = :user')
            ->setParameter('user', $user)
            ->orderBy('i.issuedAt', 'DESC')
            ->setMaxResults($maxResults)
            ->getQuery()
            ->getResult();
    }
}