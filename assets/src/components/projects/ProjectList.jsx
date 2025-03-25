import { List, ListItem, ListItemText, Chip } from '@mui/material';
import { Link } from 'react-router-dom';

export default function ProjectList({ projects }) {
    return (
        <List>
            {projects.map((project) => (
                <ListItem
                    key={project.id}
                    component={Link}
                    to={`/dashboard/projects/${project.id}`}
                >
                    <ListItemText
                        primary={project.title}
                        secondary={`Statut: ${project.status}`}
                    />
                    <Chip
                        label={`${project.progress}%`}
                        color={project.progress === 100 ? 'success' : 'primary'}
                    />
                </ListItem>
            ))}
        </List>
    );
}