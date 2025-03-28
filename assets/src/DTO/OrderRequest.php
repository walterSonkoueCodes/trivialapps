<?php
class OrderRequest
{
    #[Assert\NotBlank]
    public string $serviceType;

    #[Assert\Positive]
    public float $budget;

    #[Assert\NotNull]
    public \DateTimeInterface $deadline;

    public ?string $description = null;
}