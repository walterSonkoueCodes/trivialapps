<?php
// src/Entity/Expert.php

namespace App\Entity;

use App\Repository\ExpertRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ExpertRepository::class)]
class Expert
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['expert:read'])]
    private ?int $id = null;

    #[ORM\OneToOne(inversedBy: 'expertProfile', targetEntity: User::class, cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['expert:read'])]
    private ?string $bio = null;

    #[ORM\Column(length: 255)]
    #[Groups(['expert:read'])]
    private ?string $photoUrl = null;

    #[ORM\Column(type: Types::JSON)]
    #[Groups(['expert:read'])]
    private array $expertises = [];

    #[ORM\Column(type: Types::JSON, nullable: true)]
    #[Groups(['expert:read'])]
    private ?array $hobbies = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['expert:read'])]
    private ?string $availability = null;

    #[ORM\Column(type: Types::SMALLINT, nullable: true)]
    private ?int $age = null;

    #[ORM\Column(type: Types::DECIMAL)]
    #[Groups(['expert:read'])]
    private ?string $score = null;

    #[ORM\Column]
    #[Groups(['expert:read'])]
    private ?int $projects_completed = null;

    #[Groups(['expert:read'])]
    #[ORM\OneToMany(targetEntity: Project::class, mappedBy: 'expert')]
    private Collection $projects;

    #[ORM\Column(type: Types::JSON, nullable: true)]
    #[Groups(['expert:read'])]
    private array $experiences = [];

    #[ORM\Column(type: Types::JSON, nullable: true)]
    #[Groups(['expert:read'])]
    private array $education = [];

    #[ORM\Column(type: Types::DATETIME_IMMUTABLE, nullable: true)]
    #[Groups(['expert:read'])]
    private ?\DateTimeImmutable $updatedAt = null;

    public function __construct()
    {
        $this->projects = new ArrayCollection();
        $this->score = '3.5';
        $this->projects_completed = 0;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(User $user): self
    {
        $this->user = $user;
        if ($user->getBirthDate()) {
            $this->setAge($this->calculateAgeFromBirthDate($user->getBirthDate()));
        }

        // Ajoute le rôle ROLE_EXPERT s'il n'est pas encore présent
        $roles = $user->getRoles();
        if (!in_array('ROLE_EXPERT', $roles, true)) {
            $roles[] = 'ROLE_EXPERT';
            $user->setRoles($roles);
        }

        return $this;
    }

    private function calculateAgeFromBirthDate(?\DateTimeImmutable $birthDate): int
    {
        $today = new \DateTimeImmutable();
        return $today->diff($birthDate)->y;
    }

    public function getProjects(): Collection
    {
        return $this->projects;
    }

    public function addProject(Project $project): static
    {
        if (!$this->projects->contains($project)) {
            $this->projects->add($project);
            $project->setExpert($this);
        }
        return $this;
    }

    public function removeProject(Project $project): static
    {
        if ($this->projects->removeElement($project)) {
            if ($project->getExpert() === $this) {
                $project->setExpert(null);
            }
        }
        return $this;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getBio(): ?string
    {
        return $this->bio;
    }

    public function setBio(string $bio): static
    {
        $this->bio = $bio;
        return $this;
    }

    public function getPhotoUrl(): ?string
    {
        return $this->photoUrl;
    }

    public function setPhotoUrl(string $photoUrl): static
    {
        $this->photoUrl = $photoUrl;
        return $this;
    }

    public function getExpertises(): array
    {
        return $this->expertises;
    }

    public function setExpertises(array $expertises): static
    {
        $this->expertises = $expertises;
        return $this;
    }

    public function getHobbies(): ?array
    {
        return $this->hobbies;
    }

    public function setHobbies(?array $hobbies): static
    {
        $this->hobbies = $hobbies;
        return $this;
    }

    public function getAvailability(): ?string
    {
        return $this->availability;
    }

    public function setAvailability(?string $availability): static
    {
        $this->availability = $availability;
        return $this;
    }

    public function getAge(): ?int
    {
        return $this->age;
    }

    public function setAge(?int $age): static
    {
        $this->age = $age;
        return $this;
    }

    public function getScore(): ?string
    {
        return $this->score;
    }

    public function setScore(string $score): static
    {
        $this->score = $score;
        return $this;
    }

    public function getProjectsCompleted(): ?int
    {
        return $this->projects_completed;
    }

    public function setProjectsCompleted(int $projects_completed): static
    {
        $this->projects_completed = $projects_completed;
        return $this;
    }

    public function getFullName(): string
    {
        return $this->getUser()->getFullName();
    }

    public function getEmail(): string
    {
        return $this->getUser()->getEmail();
    }

    public function getExperiences(): array
    {
        return $this->experiences;
    }

    public function setExperiences(array $experiences): static
    {
        $this->experiences = $experiences;
        return $this;
    }

    public function getEducation(): array
    {
        return $this->education;
    }

    public function setEducation(array $education): static
    {
        $this->education = $education;
        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function getPhone(): string
    {
        return $this->getUser()->getPhone();
    }
}
