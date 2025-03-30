import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box, Grid, Typography, Avatar, Chip, Divider,
    Paper, Stack, Rating, Tabs, Tab, List, ListItem,
    ListItemIcon, ListItemText, CircularProgress, Alert
} from '@mui/material';
import {
    Email, Phone, Work, Star, Code,
    SportsEsports, School, AssignmentTurnedIn,
    Circle, Business, CalendarToday, Description
} from '@mui/icons-material';
import ApiService from '../../api/apiService';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ProjectCarousel from '../../components/expert/ProjectCarousel';

// Nouveau composant ExperienceList
const ExperienceList = ({ experiences }) => {
    return (
        <List sx={{ width: '100%' }}>
            {experiences?.map((exp, index) => (
                <Box key={exp.id} component="li" sx={{ listStyle: 'none' }}>
                    <ListItem alignItems="flex-start" component="div">
                        <ListItemIcon sx={{ minWidth: 40 }}>
                            <Business color="primary" />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Box component="span">
                                    <Typography variant="h6" component="span">
                                        {exp.title}
                                    </Typography>
                                    <Typography variant="subtitle2" color="text.secondary" component="span" display="block">
                                        {exp.company}
                                    </Typography>
                                </Box>
                            }
                            secondary={
                                <Box component="span">
                                    <Stack direction="row" spacing={1} alignItems="center" component="span">
                                        <CalendarToday fontSize="small" color="action" />
                                        <Typography variant="body2" color="text.secondary" component="span">
                                            {exp.period}
                                        </Typography>
                                    </Stack>
                                    <Typography variant="body2" mt={1} component="span" display="block">
                                        {exp.description}
                                    </Typography>
                                </Box>
                            }
                        />
                    </ListItem>
                    {index < experiences.length - 1 && (
                        <Divider
                            variant="inset"
                            component="div"
                            sx={{
                                my: 2,
                                marginLeft: '56px'
                            }}
                        />
                    )}
                </Box>
            ))}
        </List>
    );
};

const EducationList = ({ educations }) => {
    return (
        <List sx={{ width: '100%' }}>
            {educations?.map((edu, index) => (
                <Box key={edu.id} component="li" sx={{ listStyle: 'none' }}>
                    <ListItem alignItems="flex-start" component="div">
                        <ListItemIcon sx={{ minWidth: 40 }}>
                            <School color="primary" />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Box component="span">
                                    <Typography variant="h6" component="span">
                                        {edu.degree}
                                    </Typography>
                                    <Typography variant="subtitle2" color="text.secondary" component="span" display="block">
                                        {edu.institution}
                                    </Typography>
                                </Box>
                            }
                            secondary={
                                <Box component="span">
                                    <Typography variant="body2" color="text.secondary" component="span" display="block">
                                        {edu.year}
                                    </Typography>
                                    <Typography variant="body2" mt={1} component="span" display="block">
                                        {edu.description}
                                    </Typography>
                                </Box>
                            }
                        />
                    </ListItem>
                    {index < educations.length - 1 && (
                        <Divider
                            variant="inset"
                            component="div"
                            sx={{
                                my: 2,
                                marginLeft: '56px'
                            }}
                        />
                    )}
                </Box>
            ))}
        </List>
    );
};

export default function ExpertDetailPage() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tabValue, setTabValue] = useState(0);
    const [expert, setExpert] = useState(null);

    useEffect(() => {
        const fetchExpert = async () => {
            try {
                const response = await ApiService.get(`api/experts/${id}`);
                // console.log("expert datas: ", response.data);
                // console.log("user-expert datas: ", response.data.user);
                setExpert({
                    ...response.data,
                    experiences: Array.isArray(response.data.experiences)
                        ? response.data.experiences
                        : [],
                    education: Array.isArray(response.data.education)
                        ? response.data.education
                        : []
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchExpert();
    }, [id]);

    if (loading) return (
        <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
        </Box>
    );

    if (error) return (
        <Alert severity="error" sx={{ m: 2 }}>
            Error loading data : {error}
        </Alert>
    );

    if (!expert) return null;

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
            {/* Header Section */}
            <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={3}>
                        <Avatar
                            src={expert.photo_url || '/images/experts/default-expert.png'}
                            sx={{
                                width: 200,
                                height: 200,
                                mx: 'auto',
                                border: '4px solid',
                                borderColor: 'primary.main',
                                objectFit: 'cover', // <-- Ajoutez ceci
                                aspectRatio: '1/1'  // <-- Pour forcer le carré
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={9}>
                        <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
                            {expert.user.full_name}
                        </Typography>

                        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                            <Work color="primary" />
                            <Typography variant="h6" color="text.secondary">
                                Expert TrivialApps
                            </Typography>
                        </Stack>

                        <Stack direction="row" spacing={2} alignItems="center" mb={3}>
                            <Rating
                                value={parseFloat(expert.score)}
                                precision={0.5}
                                readOnly
                                size="large"
                                emptyIcon={<Star style={{ opacity: 0.5 }} />}
                            />
                            <Typography variant="h6">
                                {parseFloat(expert.score).toFixed(1)}/5
                            </Typography>
                            <Chip
                                icon={<AssignmentTurnedIn />}
                                label={`${expert.projects_completed} projets`}
                                color="success"
                                variant="outlined"
                            />
                        </Stack>

                        <Typography variant="body1" paragraph>
                            {expert.bio}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>

            {/* Main Content */}
            <Grid container spacing={4}>
                {/* Left Column */}
                <Grid item xs={12} md={4}>
                    {/* Contact Card */}
                    <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                            Contact
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        <Stack spacing={2}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Email color="primary" />
                                <Typography>{expert.user.email}</Typography>
                            </Stack>

                            <Stack direction="row" spacing={2} alignItems="center">
                                <Phone color="primary" />
                                <Typography>{expert.phone || "+33 6 12 34 56 78"}</Typography>
                            </Stack>

                            <Stack direction="row" spacing={2} alignItems="center">
                                <Code color="primary" />
                                <Typography>
                                    {expert.availability || 'Disponible pour nouveaux projets'}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Paper>

                    {/* Skills Card */}
                    <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                            Expertises
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {expert.expertises.map((skill, index) => (
                                <Chip
                                    key={index}
                                    label={skill}
                                    color="primary"
                                    sx={{
                                        borderRadius: 1,
                                        fontWeight: 500
                                    }}
                                />
                            ))}
                        </Box>
                    </Paper>

                    {/* Hobbies Card */}
                    {expert.hobbies && (
                        <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                                Interests
                            </Typography>
                            <Divider sx={{ mb: 2 }} />

                            <Stack spacing={1}>
                                {expert.hobbies.map((hobby, index) => (
                                    <Stack key={index} direction="row" spacing={1} alignItems="center">
                                        <SportsEsports color="secondary" />
                                        <Typography>{hobby}</Typography>
                                    </Stack>
                                ))}
                            </Stack>
                        </Paper>
                    )}
                </Grid>

                {/* Right Column */}
                <Grid item xs={12} md={8}>
                    <Paper elevation={2} sx={{ p: 2, borderRadius: 3 }}>
                        <Tabs
                            value={tabValue}
                            onChange={handleTabChange}
                            variant="fullWidth"
                            sx={{ mb: 3 }}
                        >
                            <Tab label="Expérience" icon={<Work />} />
                            <Tab label="Projets" icon={<Code />} />
                            <Tab label="Formation" icon={<School />} />
                        </Tabs>

                        <Divider sx={{ mb: 3 }} />

                        {tabValue === 0 && (
                            <ExperienceList experiences={expert?.experiences} />
                        )}

                        {tabValue === 1 && (
                            <ProjectCarousel projects={expert?.projects} />
                        )}

                        {tabValue === 2 && (
                            <EducationList educations={expert?.education} />
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}