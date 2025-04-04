import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Circle } from '@mui/icons-material';

export default function ExperienceList({ expertId }) {
    // Remplacer par un appel API réel
    const experiences = [
        {
            id: 1,
            title: "Développeur Full Stack",
            company: "TechCorp",
            period: "2018 - Présent",
            description: "Développement d'applications web complexes avec React et Symfony"
        },
        // ... autres expériences
    ];

    return (
        <List sx={{ width: '100%' }}>
            {experiences.map((exp, index) => (
                <Box key={exp.id}>
                    <ListItem alignItems="flex-start">
                        <ListItemIcon sx={{ minWidth: 36 }}>
                            <Circle color="primary" sx={{ fontSize: '0.8rem' }} />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <>
                                    <Typography variant="h6" component="span">
                                        {exp.title}
                                    </Typography>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ ml: 1 }}
                                    >
                                        @ {exp.company}
                                    </Typography>
                                </>
                            }
                            secondary={
                                <>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="text.secondary"
                                        display="block"
                                    >
                                        {exp.period}
                                    </Typography>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {exp.description}
                                    </Typography>
                                </>
                            }
                        />
                    </ListItem>
                    {index < experiences.length - 1 && (
                        <Divider variant="inset" component="li" />
                    )}
                </Box>
            ))}
        </List>
    );
}