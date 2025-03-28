import { useState } from 'react';
import { Button, Typography, Stack } from '@mui/material';
import ProjectList from '../../components/projects/ProjectList';
import ProjectFilter from '../../components/projects/ProjectFilter';
import useProjects from '../../hooks/useProjects';

export default function ProjectsPage() {
    const { projects, loading, error } = useProjects();
    const [filters, setFilters] = useState({
        status: '',
        searchQuery: ''
    });

    const filteredProjects = projects.filter(project => {
        const matchesStatus = !filters.status || project.status === filters.status;
        const matchesSearch = project.title.toLowerCase().includes(filters.searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    return (
        <div>
            <Stack direction="row" justifyContent="space-between" mb={4}>
                <Typography variant="h4">Mes Projets</Typography>
                <Button variant="contained" href="/dashboard/orders/new">
                    Nouveau projet
                </Button>
            </Stack>

            <ProjectFilter onFilterChange={setFilters} />

            <ProjectList
                projects={filteredProjects}
                loading={loading}
                error={error}
            />
        </div>
    );
}