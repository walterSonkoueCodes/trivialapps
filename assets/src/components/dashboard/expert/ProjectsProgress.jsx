// assets/src/components/dashboard/expert/ProjectsProgress.jsx

import { Card, CardContent, LinearProgress, Typography, List, ListItem, ListItemIcon } from '@mui/material';
import { Circle, CheckCircle, Alarm } from '@mui/icons-material';

export default function ProjectsProgress({ projects }) {
    const completedProjects = projects?.filter(p => p.status === "completed" ).length || 0;
    const totalProjects = projects?.length || 1;
    const progress = Math.round((completedProjects / totalProjects) * 100);

    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Project Progression ({progress}%)
                </Typography>

                <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{ height: 10, borderRadius: 5, mb: 3 }}
                />

                <List dense>
                    {(projects || []).slice(0, 5).map((project) => (
                        <ListItem key={project.id} sx={{ px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                                {project.status === 'completed' ? (
                                    <CheckCircle color="success" fontSize="small" />
                                ) : (
                                    <Circle color={project.deadline < new Date() ? 'error' : 'disabled'} fontSize="small" />
                                )}
                            </ListItemIcon>
                            <Typography variant="body2">
                                {project.name} ({new Date(project.deadline).toLocaleDateString()})
                            </Typography>
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
}