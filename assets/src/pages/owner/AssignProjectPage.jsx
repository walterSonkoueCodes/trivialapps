import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box, Button, Card, CardContent, MenuItem, Select, Typography, FormControl, InputLabel
} from '@mui/material';
import ApiService from '../../api/apiService';

export default function AssignProjectPage() {
    const { userId } = useParams();
    const navigate = useNavigate();

    const [availableProjects, setAvailableProjects] = useState([]);
    const [selectedProjectId, setSelectedProjectId] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [projectsResponse, userResponse] = await Promise.all([
                    ApiService.get(`/api/owner/unassigned-projects`),
                    ApiService.get(`/api/owner/user-details/${userId}`)
                ]);
                setAvailableProjects(projectsResponse.data);
                setUser(userResponse.data);
            } catch (error) {
                console.error('Error loading data:', error);
            }
        };

        fetchData();
    }, [userId]);

    const handleAssign = async () => {
        try {
            await ApiService.post(`/api/owner/assign-project`, {
                projectId: selectedProjectId,
                expertId: userId
            });
            navigate(`/dashboard/owner`);
        } catch (error) {
            console.error('Error assigning project:', error);
        }
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
                Assign Project
            </Typography>

            {user && (
                <Typography variant="h6" gutterBottom>
                    Assign a project to: <strong>{user.fullName}</strong>
                </Typography>
            )}

            <Card sx={{ maxWidth: 500 }}>
                <CardContent>
                    <FormControl fullWidth sx={{ mb: 3 }}>
                        <InputLabel>Select a Project</InputLabel>
                        <Select
                            value={selectedProjectId}
                            label="Select a Project"
                            onChange={(e) => setSelectedProjectId(e.target.value)}
                        >
                            {availableProjects.map((project) => (
                                <MenuItem key={project.id} value={project.id}>
                                    {project.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button
                        variant="contained"
                        color="primary"
                        disabled={!selectedProjectId}
                        onClick={handleAssign}
                    >
                        Assign Project
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
}
