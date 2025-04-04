import useProjects from '../../hooks/useProjects';
import ProjectList from '../../components/projects/ProjectList';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ErrorAlert from '../../components/ui/ErrorAlert';

export default function ProjectsPage() {
    const { projects, loading, error } = useProjects();

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorAlert message={error} />;

    return (
        <div>
            <h1>Mes Projets</h1>
            <ProjectList projects={projects} />
        </div>
    );
}