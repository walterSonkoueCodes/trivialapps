import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { School } from '@mui/icons-material';

export default function EducationList() {
    const education = [
        {
            id: 1,
            degree: "Master en Informatique",
            institution: "Université Paris-Saclay",
            year: "2017"
        },
        // ... autres formations
    ];

    return (
        <List>
            {education.map(edu => (
                <ListItem key={edu.id}>
                    <ListItemIcon>
                        <School color="primary" />
                    </ListItemIcon>
                    <ListItemText
                        primary={edu.degree}
                        secondary={
                            <>
                                <Typography component="span" variant="body2">
                                    {edu.institution}
                                </Typography>
                                <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                    ({edu.year})
                                </Typography>
                            </>
                        }
                    />
                </ListItem>
            ))}
        </List>
    );
}