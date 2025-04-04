<?php

namespace App\Entity;

use App\Enum\InvoiceStatusEnum;
use App\Repository\InvoiceRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: InvoiceRepository::class)]
#[ORM\HasLifecycleCallbacks]
class Invoice
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[Groups(['invoice:read'])]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['invoice:read'])]
    #[ORM\Column(length: 255)]
    private ?string $number = null;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'clientInvoices')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $client = null;

    #[ORM\ManyToOne(targetEntity: Project::class, inversedBy: 'invoices')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Project $project = null;

    #[ORM\Column(type: Types::STRING, length: 255, nullable: true)]
    #[Groups(['invoice:read'])]
    private ?string $pdfPath = null;

    #[Groups(['invoice:read'])]
    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2)]
    private ?string $amount = null;

    #[Groups(['invoice:read'])]
    #[ORM\Column(
        type: 'string',
        length: 20,
        enumType: InvoiceStatusEnum::class
    )]
    private ?InvoiceStatusEnum $status = null;

    #[Groups(['invoice:read'])]
    #[ORM\Column]
    private ?\DateTimeImmutable $issuedAt = null;

    #[ORM\Column(name: "deadline")]
    private ?\DateTimeImmutable $deadline = null;

    public function __construct()
    {
        $this->issuedAt = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNumber(): ?string
    {
        return $this->number;
    }

    public function setNumber(string $number): static
    {
        $this->number = $number;
        return $this;
    }

    public function getClient(): ?User
    {
        return $this->client;
    }

    public function setClient(?User $client): static
    {
        $this->client = $client;
        return $this;
    }

    public function getProject(): ?Project
    {
        return $this->project;
    }

    public function setProject(?Project $project): static
    {
        $this->project = $project;
        return $this;
    }

    public function getAmount(): ?string
    {
        return $this->amount;
    }

    public function setAmount(string $amount): static
    {
        $this->amount = $amount;
        return $this;
    }

    public function getStatus(): ?InvoiceStatusEnum
    {
        return $this->status;
    }

    public function setStatus(InvoiceStatusEnum $status): static
    {
        $this->status = $status;
        return $this;
    }

    #[ORM\PrePersist]
    #[ORM\PreUpdate]
    public function validateStatus(): void
    {
        if ($this->status === null) {
            $this->status = InvoiceStatusEnum::PENDING;
        }
    }

    public function getIssuedAt(): ?\DateTimeImmutable
    {
        return $this->issuedAt;
    }

    public function setIssuedAt(\DateTimeImmutable $issuedAt): static
    {
        $this->issuedAt = $issuedAt;
        return $this;
    }

    public function getDeadline(): ?\DateTimeImmutable
    {
        return $this->deadline;
    }

    public function setDeadline(\DateTimeImmutable $deadline): static
    {
        $this->deadline = $deadline;
        return $this;
    }

    public function getPdfPath(): ?string
    {
        return $this->pdfPath;
    }

    public function setPdfPath(?string $pdfPath): static
    {
        $this->pdfPath = $pdfPath;
        return $this;
    }
}