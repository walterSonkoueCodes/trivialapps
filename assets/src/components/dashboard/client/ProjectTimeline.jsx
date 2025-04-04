import { Box, Typography, Divider, Chip, LinearProgress } from '@mui/material';
import { Event, CheckCircle, Warning } from '@mui/icons-material';

export default function ProjectTimeline({ projects }) {
    const getProgress = (status) => {
        switch (status) {
            case 'completed':
                return 100;
            case 'in_progress':
                return 50;
            default:
                return 10;
        }
    };

    return (
        <Box sx={{ p: 3, border: '1px solid #eee', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
                Project chronology
            </Typography>

            {(projects || []).map((project, index) => {
                const progress = getProgress(project.status);

                return (
                    <Box key={project.id} sx={{ mb: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            {project.status === 'completed' ? (
                                <CheckCircle color="success" sx={{ mr: 1 }} />
                            ) : (
                                <Warning
                                    color={project.status === 'backlog' ? 'error' : 'warning'}
                                    sx={{ mr: 1 }}
                                />
                            )}
                            <Typography variant="subtitle1">{project.title}</Typography>
                            <Chip
                                label={project.status}
                                size="small"
                                sx={{ ml: 2 }}
                                color={
                                    project.status === 'completed'
                                        ? 'success'
                                        : project.status === 'delayed'
                                            ? 'error'
                                            : 'info'
                                }
                            />
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, ml: 4 }}>
                            <Event color="action" sx={{ mr: 1, fontSize: '1rem' }} />
                            <Typography variant="body2">
                                {new Date(project.createdAt).toLocaleDateString()} -{' '}
                                {project.deadline
                                    ? new Date(project.deadline).toLocaleDateString()
                                    : 'No deadline'}
                            </Typography>
                        </Box>

                        <LinearProgress
                            variant="determinate"
                            value={progress}
                            sx={{ height: 8, borderRadius: 4, mb: 1 }}
                        />

                        {index < projects.length - 1 && <Divider sx={{ my: 2 }} />}
                    </Box>
                );
            })}
        </Box>
    );
}
