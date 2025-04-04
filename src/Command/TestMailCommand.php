<?php

namespace App\Command;

use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

#[AsCommand(name: 'test:mail')]
class TestMailCommand extends Command
{
    public function __construct(private readonly MailerInterface $mailer)
    {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $email = (new Email())
            ->from('noreply@trivialapps.net') // 🔁 doit correspondre à ton email hébergé
            ->to('fw4256O@gmail.com') // test
            ->subject('Test Email from Symfony')
            ->text('If you received this, Symfony Mailer works 📨');

        $this->mailer->send($email);
        $output->writeln('✅ Email sent!');

        return Command::SUCCESS;
    }
}
