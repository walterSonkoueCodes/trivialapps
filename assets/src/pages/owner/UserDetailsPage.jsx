// assets/src/pages/owner/UserDetailsPage.jsx

import {
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
    Divider,
    Chip
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ApiService from '../../api/apiService';

export default function UserDetailsPage() {
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await ApiService.get(`/api/owner/user-details/${userId}`);
                setUserData(response.data);
            } catch (err) {
                console.error('Error loading user data:', err);
            }
        };
        fetchUser();
    }, [userId]);

    if (!userData) return null;

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
                User Details
            </Typography>

            <Card sx={{ mb: 4 }}>
                <CardContent>
                    <Typography variant="h6">Personal Info</Typography>
                    <Divider sx={{ my: 2 }} />
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography>Email: {userData.email}</Typography>
                            <Typography>Phone: {userData.phone || 'N/A'}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Full Name: {userData.fullName}</Typography>
                            <Typography>Role: <Chip label={userData.roles[0]} /></Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <Typography variant="h6">Assigned Projects</Typography>
                    <Divider sx={{ my: 2 }} />
                    {(userData.userProjects || []).length > 0 ? (
                        <Grid container spacing={2}>
                            {userData.userProjects.map(project => (
                                <Grid item xs={12} key={project.id}>
                                    <Box>
                                        <Typography variant="subtitle1">{project.title}</Typography>
                                        <Typography variant="body2">Status: {project.status}</Typography>
                                        <Typography variant="body2">Deadline: {project.deadline}</Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Typography variant="body2">No projects assigned.</Typography>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}
