<?php
// src/Security/Voter/ProjectVoter.php

use App\Entity\Project;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;

class ProjectVoter extends Voter
{
    protected function supports(string $attribute, $subject): bool
    {
        return $subject instanceof Project && in_array($attribute, ['VIEW', 'EDIT']);
    }

    protected function voteOnAttribute(string $attribute, $project, TokenInterface $token): bool
    {
        $user = $token->getUser();
        return $user === $project->getClient();
    }
}
