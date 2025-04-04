// assets/src/components/dashboard/expert/ProjectList.jsx

import { Card, CardContent, Typography, LinearProgress, Box } from '@mui/material';

export default function ProjectsList({ projects }) {
    const getProgress = (status) => {
        switch (status) {
            case "completed":
                return 100;
            case "in_progress":
                return 50;
            default:
                return 0;
        }
    };

    const getColor = (status) => {
        switch (status) {
            case "completed":
                return "success";
            case "in_progress":
                return "warning";
            case "backlog":
            default:
                return "error";
        }
    };

    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Current Projects
                </Typography>

                {(projects || []).map((project, index) => {
                    if (!project?.id) return null; // skip items without ID

                    const status = project.status?.toLowerCase?.() || project.status || '';
                    const progress = getProgress(status);
                    const color = getColor(status);

                    return (
                        <Box key={project.id || `project-${index}`} sx={{ mb: 2 }}>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontWeight: 600,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {project.title || 'Untitled Project'}
                            </Typography>
                            <LinearProgress
                                variant="determinate"
                                value={progress}
                                sx={{ height: 8, borderRadius: 5, mb: 0.5 }}
                                color={color}
                            />
                            <Typography variant="caption" color="text.secondary">
                                Status: {status?.replace('_', ' ') || 'unknown'}
                            </Typography>
                        </Box>
                    );
                })}

            </CardContent>
        </Card>
    );
}
