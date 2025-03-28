import { Grid, Card, CardContent, Typography, Chip, Avatar } from '@mui/material';
import { Assignment, Schedule, CheckCircle } from '@mui/icons-material';

export default function ProjectsGrid({ projects }) {
    return (
        <Grid container spacing={3}>
            {(projects || []).map((project) => (
                <Grid item xs={12} sm={6} md={4} key={project.id}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h6" component="h3">
                                {project.name}
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Assignment color="action" sx={{ mr: 1 }} />
                                <Typography variant="body2" color="text.secondary">
                                    {project.client}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Schedule color="action" sx={{ mr: 1 }} />
                                <Typography variant="body2">
                                    Échéance: {new Date(project.dueDate).toLocaleDateString()}
                                </Typography>
                            </Box>

                            <Chip
                                avatar={<Avatar>{project.progress}%</Avatar>}
                                label={project.status}
                                color={
                                    project.status === 'completed' ? 'success' :
                                        project.status === 'delayed' ? 'error' : 'primary'
                                }
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