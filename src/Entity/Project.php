<?php

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
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['invoice:read'])]
    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\Column(length: 255)]
    private ?string $description = null;

    #[ORM\Column(
        type: 'string',
        length: 20,
        enumType: StatusEnum::class
    )]
    private ?StatusEnum $status = null;

    #[ORM\ManyToOne(inversedBy: 'userProjects')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $client = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $updatedAt = null;

    /**
     * @var Collection<int, Invoice>
     */
    #[ORM\OneToMany(targetEntity: Invoice::class, mappedBy: 'project')]
    private Collection $projectInvoice;

    public function __construct()
    {
        $this->projectInvoice = new ArrayCollection();
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

    #[ORM\PrePersist]
    #[ORM\PreUpdate]
    public function validateStatus(): void
    {
        if ($this->status === null) {
            $this->status = StatusEnum::BACKLOG;
        }
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
}
