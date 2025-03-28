<?php

namespace App\Entity;

use App\Repository\ExpertRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ExpertRepository::class)]
class Expert
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['expert:read', 'project:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['expert:read', 'project:read'])]
    private ?string $fullName = null;

    #[ORM\Column(length: 180, unique: true)]
    #[Groups(['expert:read'])]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    #[Groups(['expert:read'])]
    private ?string $bio = null;

    #[ORM\Column(length: 255)]
    #[Groups(['expert:read', 'project:read'])]
    private ?string $photoUrl = null;

    #[ORM\Column(type: Types::JSON)]
    #[Groups(['expert:read', 'project:read'])]
    private array $expertises = [];

    #[ORM\Column(nullable: true)]
    #[Groups(['expert:read'])]
    private ?int $age = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 3, scale: 1, nullable: true)]
    #[Groups(['expert:read'])]
    private ?float $score = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 5, scale: 2, nullable: true)]
    #[Groups(['expert:read'])]
    private ?string $hourlyRate = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['expert:read'])]
    private ?string $availability = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    #[Groups(['expert:read'])]
    private ?\DateTimeInterface $hireDate = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2, nullable: true)]
    #[Groups(['expert:read'])]
    private ?string $totalEarned = null;

    #[ORM\Column(length: 50, nullable: true)]
    #[Groups(['expert:read'])]
    private ?string $nationality = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['expert:read'])]
    private ?string $education = null;

    // Relation avec les projets (si nécessaire)
    #[ORM\OneToMany(mappedBy: 'assignedExpert', targetEntity: Project::class)]
    private Collection $projects;

    public function __construct()
    {
        $this->projects = new ArrayCollection();
    }

    // Getters et Setters

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFullName(): ?string
    {
        return $this->fullName;
    }

    public function setFullName(string $fullName): static
    {
        $this->fullName = $fullName;
        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;
        return $this;
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

    public function addExpertise(string $expertise): static
    {
        if (!in_array($expertise, $this->expertises)) {
            $this->expertises[] = $expertise;
        }
        return $this;
    }

    public function removeExpertise(string $expertise): static
    {
        $this->expertises = array_diff($this->expertises, [$expertise]);
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

    public function getScore(): ?float
    {
        return $this->score;
    }

    public function setScore(?float $score): static
    {
        $this->score = $score;
        return $this;
    }

    public function getHourlyRate(): ?string
    {
        return $this->hourlyRate;
    }

    public function setHourlyRate(?string $hourlyRate): static
    {
        $this->hourlyRate = $hourlyRate;
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

    public function getHireDate(): ?\DateTimeInterface
    {
        return $this->hireDate;
    }

    public function setHireDate(?\DateTimeInterface $hireDate): static
    {
        $this->hireDate = $hireDate;
        return $this;
    }

    public function getTotalEarned(): ?string
    {
        return $this->totalEarned;
    }

    public function setTotalEarned(?string $totalEarned): static
    {
        $this->totalEarned = $totalEarned;
        return $this;
    }

    public function getNationality(): ?string
    {
        return $this->nationality;
    }

    public function setNationality(?string $nationality): static
    {
        $this->nationality = $nationality;
        return $this;
    }

    public function getEducation(): ?string
    {
        return $this->education;
    }

    public function setEducation(?string $education): static
    {
        $this->education = $education;
        return $this;
    }

    /**
     * @return Collection<int, Project>
     */
    public function getProjects(): Collection
    {
        return $this->projects;
    }

    public function addProject(Project $project): static
    {
        if (!$this->projects->contains($project)) {
            $this->projects->add($project);
            $project->setAssignedExpert($this);
        }
        return $this;
    }

    public function removeProject(Project $project): static
    {
        if ($this->projects->removeElement($project)) {
            // set the owning side to null (unless already changed)
            if ($project->getAssignedExpert() === $this) {
                $project->setAssignedExpert(null);
            }
        }
        return $this;
    }
}