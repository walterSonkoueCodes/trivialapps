import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Box, Typography, Paper, Chip, Stack } from '@mui/material';
import { Code, CalendarToday, CheckCircle } from '@mui/icons-material';

export default function ProjectCarousel({ projects }) {
    return (
        <Box sx={{ p: 2 }}>
            {projects?.length > 0 ? (
                <Carousel
                    showThumbs={false}
                    showStatus={false}
                    showIndicators={projects.length > 1}
                    infiniteLoop
                    autoPlay
                    interval={5000}
                    stopOnHover
                    swipeable
                    emulateTouch
                    dynamicHeight
                >
                    {projects.map((project) => (
                        <Paper
                            key={project.id}
                            sx={{
                                p: 3,
                                height: 200,
                                borderRadius: 2,
                                boxShadow: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Box>
                                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                                    <Code color="primary" />
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {project.title}
                                    </Typography>
                                </Stack>

                                <Typography
                                    variant="body2"
                                    sx={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        mb: 2
                                    }}
                                >
                                    {project.description}
                                </Typography>
                            </Box>

                            <Stack direction="row" spacing={1} alignItems="center">
                                <CalendarToday fontSize="small" color="action" />
                                <Typography variant="caption" color="text.secondary">
                                    {new Date(project.createdAt).toLocaleDateString()}
                                </Typography>

                                <Chip
                                    icon={<CheckCircle fontSize="small" />}
                                    label={project.status}
                                    size="small"
                                    color={
                                        project.status === 'COMPLETED' ? 'success' :
                                            project.status === 'IN_PROGRESS' ? 'primary' : 'default'
                                    }
                                    variant="outlined"
                                    sx={{ ml: 'auto' }}
                                />
                            </Stack>
                        </Paper>
                    ))}
                </Carousel>
            ) : (
                <Typography variant="body2" color="text.secondary" textAlign="center">
                    No available projects
                </Typography>
            )}
        </Box>
    );
}