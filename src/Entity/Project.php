<?php
// src/Entity/Project.php

namespace App\Entity;

use App\Enum\StatusEnum;
use App\Repository\ProjectRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ProjectRepository::class)]
class Project
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[Groups(['project:read'])]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['invoice:read'])]
    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[Groups(['project:read'])]
    #[ORM\Column(length: 255)]
    private ?string $description = null;

    #[ORM\Column(
        type: 'string',
        length: 20,
        enumType: StatusEnum::class
    )]
    #[Groups(['project:read'])]
    private ?StatusEnum $status = null;

    #[Groups(['project:read'])]
    #[ORM\ManyToOne(inversedBy: 'userProjects')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $client = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $updatedAt = null;

    #[ORM\OneToMany(targetEntity: Invoice::class, mappedBy: 'project')]
    private Collection $projectInvoice;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $image = null;

    #[ORM\ManyToOne(inversedBy: 'projects')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Service $service = null;

    #[ORM\ManyToOne(inversedBy: 'projects')]
    private ?Expert $expert = null;

    #[ORM\OneToMany(targetEntity: Invoice::class, mappedBy: 'project')]
    private Collection $invoices;

    #[ORM\Column(type: 'float', nullable: true)]
    #[Groups(['project:read', 'project:write'])]
    private ?float $estimated_working_hours = 30.5;

    #[ORM\Column(type: 'datetime_immutable', nullable: true)]
    #[Groups(['project:read', 'project:write'])]
    private ?\DateTimeImmutable $deadline = null;

    public function __construct()
    {
        $this->projectInvoice = new ArrayCollection();
        $this->invoices = new ArrayCollection();
    }

    // Tous les getters/setters existants...

    public function getService(): ?Service
    {
        return $this->service;
    }

    public function setService(?Service $service): static
    {
        $this->service = $service;
        return $this;
    }

    public function getExpert(): ?Expert
    {
        return $this->expert;
    }

    public function setExpert(?Expert $expert): static
    {
        $this->expert = $expert;
        return $this;
    }

    /**
     * @return Collection<int, Invoice>
     */
    public function getInvoices(): Collection
    {
        return $this->invoices;
    }

    public function addInvoice(Invoice $invoice): static
    {
        if (!$this->invoices->contains($invoice)) {
            $this->invoices->add($invoice);
            $invoice->setProject($this);
        }
        return $this;
    }

    public function removeInvoice(Invoice $invoice): static
    {
        if ($this->invoices->removeElement($invoice)) {
            if ($invoice->getProject() === $this) {
                $invoice->setProject(null);
            }
        }
        return $this;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getStatus(): ?StatusEnum
    {
        return $this->status;
    }

    public function setStatus(StatusEnum $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeImmutable $updatedAt): static
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): static
    {
        $this->image = $image;

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

    /**
     * @return Collection<int, Invoice>
     */
    public function getProjectInvoice(): Collection
    {
        return $this->projectInvoice;
    }

    public function addProjectInvoice(Invoice $projectInvoice): static
    {
        if (!$this->projectInvoice->contains($projectInvoice)) {
            $this->projectInvoice->add($projectInvoice);
            $projectInvoice->setProject($this);
        }

        return $this;
    }

    public function removeProjectInvoice(Invoice $projectInvoice): static
    {
        if ($this->projectInvoice->removeElement($projectInvoice)) {
            // set the owning side to null (unless already changed)
            if ($projectInvoice->getProject() === $this) {
                $projectInvoice->setProject(null);
            }
        }

        return $this;
    }

    public function getEstimatedWorkingHours(): ?float
    {
        return $this->estimated_working_hours;
    }

    public function setEstimatedWorkingHours(?float $hours): static
    {
        $this->estimated_working_hours = $hours;
        return $this;
    }

    public function getDeadline(): ?\DateTimeImmutable
    {
        return $this->deadline;
    }

    public function setDeadline(?\DateTimeImmutable $deadline): static
    {
        $this->deadline = $deadline;
        return $this;
    }
}