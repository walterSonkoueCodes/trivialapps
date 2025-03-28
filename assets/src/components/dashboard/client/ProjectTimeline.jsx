import { Box, Typography, Divider, Chip } from '@mui/material';
import { Event, CheckCircle, Warning } from '@mui/icons-material';

export default function ProjectTimeline({ projects }) {
    return (
        <Box sx={{ p: 3, border: '1px solid #eee', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
                Chronologie des Projets
            </Typography>

            {(projects || []).map((project, index) => (
                <Box key={project.id} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        {project.status === 'completed' ? (
                            <CheckCircle color="success" sx={{ mr: 1 }} />
                        ) : (
                            <Warning color={project.status === 'delayed' ? 'error' : 'warning'} sx={{ mr: 1 }} />
                        )}
                        <Typography variant="subtitle1">{project.name}</Typography>
                        <Chip
                            label={project.status}
                            size="small"
                            sx={{ ml: 2 }}
                            color={
                                project.status === 'completed' ? 'success' :
                                    project.status === 'delayed' ? 'error' : 'info'
                            }
                        />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, ml: 4 }}>
                        <Event color="action" sx={{ mr: 1, fontSize: '1rem' }} />
                        <Typography variant="body2">
                            {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                        </Typography>
                    </Box>

                    <LinearProgress
                        variant="determinate"
                        value={project.progress}
                        sx={{ height: 8, borderRadius: 4, mb: 1 }}
                    />

                    {index < projects.length - 1 && <Divider sx={{ my: 2 }} />}
                </Box>
            ))}
        </Box>
    );
}