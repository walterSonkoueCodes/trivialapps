<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250327194501 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE project ADD image VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE service ADD full_description TEXT DEFAULT NULL');
        $this->addSql('ALTER TABLE service ADD icon VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE service ADD image VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE service ADD video_url VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE service ADD features JSON DEFAULT NULL');
        $this->addSql('ALTER TABLE service ALTER description TYPE TEXT');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE service DROP full_description');
        $this->addSql('ALTER TABLE service DROP icon');
        $this->addSql('ALTER TABLE service DROP image');
        $this->addSql('ALTER TABLE service DROP video_url');
        $this->addSql('ALTER TABLE service DROP features');
        $this->addSql('ALTER TABLE service ALTER description TYPE VARCHAR(255)');
        $this->addSql('ALTER TABLE project DROP image');
    }
}
