<?php
// src/Enum/StatusEnum.php
namespace App\Enum;

enum StatusEnum: string
{
    case BACKLOG = 'Backlog';
    case IN_PROGRESS = 'in_progress';
    case COMPLETED = 'completed';

    public function getLabel(): string
    {
        return match($this) {
            self::BACKLOG => 'Backlog',
            self::IN_PROGRESS => 'in_progress',
            self::COMPLETED => 'completed',
        };
    }
}