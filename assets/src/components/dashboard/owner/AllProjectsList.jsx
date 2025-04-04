import {
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Box
} from '@mui/material';
import { useState } from 'react';

const statusColors = {
    completed: 'success.main',
    in_progress: 'info.main',
    backlog: 'warning.main',
    delayed: 'error.main'
};

export default function AllProjectsList({ projects = [] }) {
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredProjects = statusFilter === 'all'
        ? projects
        : projects.filter(p => p.status === statusFilter);

    return (
        <Card>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6">
                        All Projects
                    </Typography>

                    <FormControl size="small" sx={{ minWidth: 150 }}>
                        <InputLabel>Status Filter</InputLabel>
                        <Select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            label="Status Filter"
                        >
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="completed">Completed</MenuItem>
                            <MenuItem value="in_progress">In Progress</MenuItem>
                            <MenuItem value="backlog">Backlog</MenuItem>
                            <MenuItem value="delayed">Delayed</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Client</TableCell>
                                <TableCell>Expert</TableCell>
                                <TableCell>Deadline</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredProjects.map(project => (
                                <TableRow key={project.id}>
                                    <TableCell>{project.title}</TableCell>
                                    <TableCell>
                                        <Typography fontWeight="bold" color={statusColors[project.status] || 'text.primary'}>
                                            {project.status}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>{project.client?.fullName || 'N/A'}</TableCell>
                                    <TableCell>{project.expert?.user?.fullName || 'Unassigned'}</TableCell>
                                    <TableCell>
                                        {project.deadline ? new Date(project.deadline).toLocaleDateString() : '—'}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
}
