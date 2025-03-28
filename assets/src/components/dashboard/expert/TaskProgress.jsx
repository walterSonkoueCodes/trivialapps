import { Card, CardContent, LinearProgress, Typography, List, ListItem, ListItemIcon } from '@mui/material';
import { Circle, CheckCircle, Alarm } from '@mui/icons-material';

export default function TaskProgress({ tasks }) {
    const completedTasks = tasks?.filter(t => t.status === 'completed').length || 0;
    const totalTasks = tasks?.length || 1;
    const progress = Math.round((completedTasks / totalTasks) * 100);

    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Progression des Tâches ({progress}%)
                </Typography>

                <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{ height: 10, borderRadius: 5, mb: 3 }}
                />

                <List dense>
                    {(tasks || []).slice(0, 5).map((task) => (
                        <ListItem key={task.id} sx={{ px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                                {task.status === 'completed' ? (
                                    <CheckCircle color="success" fontSize="small" />
                                ) : (
                                    <Circle color={task.dueDate < new Date() ? 'error' : 'disabled'} fontSize="small" />
                                )}
                            </ListItemIcon>
                            <Typography variant="body2">
                                {task.name} ({new Date(task.dueDate).toLocaleDateString()})
                            </Typography>
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
}