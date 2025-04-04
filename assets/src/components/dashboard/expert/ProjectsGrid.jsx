// assets/src/components/dashboard/expert/ProjectsGrid.jsx

import { Grid, Card, CardContent, Typography, Chip, Avatar, Box } from '@mui/material';
import { Assignment, Schedule, CheckCircle } from '@mui/icons-material';

export default function ProjectsGrid({ projects }) {
    const formatStatus = (status) => {
        switch (status) {
            case 'in_progress': return 'In Progress';
            case 'backlog': return 'Backlog';
            case 'completed': return 'Completed';
            default: return status;
        }
    };

    const getProgress = (status) => {
        console.log("status :",status);
        switch (status) {
            case "completed":
                return 100;
            case "in_progress":
                return 50;
            default:
                return 0;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'success';
            case 'backlog': return 'info';
            case 'in_progress': return 'primary';
            default: return 'default';
        }
    };

    return (
        <Grid container spacing={3}>
            {(projects || []).map((project, index) => (
                <Grid item xs={12} sm={6} md={4} key={project.id || `project-${index}`}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h6" component="h3">
                                {project.title}
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Assignment color="action" sx={{ mr: 1 }} />
                                <Typography variant="body2" color="text.secondary">
                                    {project.client?.full_name || 'Unknown client'}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Schedule color="action" sx={{ mr: 1 }} />
                                <Typography variant="body2">
                                    Deadline: {project.deadline ? new Date(project.deadline).toLocaleDateString() : 'No deadline'}
                                </Typography>
                            </Box>

                            <Chip
                                avatar={<Avatar>{getProgress(project.status) ?? 0}%</Avatar>}
                                label={formatStatus(project.status)}
                                color={getStatusColor(project.status)}
                                sx={{ mt: 1 }}
                            />
                        </CardContent>

                        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
                            <CheckCircle
                                color={project.status === 'completed' ? 'success' : 'disabled'}
                                sx={{ mr: 1 }}
                            />
                            <Typography variant="caption">
                                {project.status === 'completed' ? 'Terminé' : 'En cours'}
                            </Typography>
                        </Box>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}
