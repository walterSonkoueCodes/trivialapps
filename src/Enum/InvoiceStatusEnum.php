<?php

// src/Enum/InvoiceStatusEnum.php
namespace App\Enum;

enum InvoiceStatusEnum: string
{
    case PAID = 'paid';
    case PENDING = 'pending';
    case OVERDUE = 'overdue';

    public function getLabel(): string
    {
        return match ($this) {
            self::PAID => 'paid',
            self::PENDING => 'pending',
            self::OVERDUE => 'overdue',
        };
    }
}