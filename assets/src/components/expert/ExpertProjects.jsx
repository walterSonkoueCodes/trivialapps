import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';

const columns = [
    { field: 'title', headerName: 'Projet', width: 200 },
    { field: 'client', headerName: 'Client', width: 150 },
    { field: 'status', headerName: 'Statut', width: 130 },
    { field: 'progress', headerName: 'Progression', width: 130 },
    { field: 'dueDate', headerName: 'Échéance', width: 130 }
];

export default function ExpertProjects({ expertId }) {
    // Ici vous devriez faire un appel API pour récupérer les projets
    const projects = [
        { id: 1, title: 'Site e-commerce', client: 'Client A', status: 'En cours', progress: '75%', dueDate: '15/06/2023' },
        // ... autres projets
    ];

    return (
        <Box sx={{ height: 400 }}>
            <Typography variant="h5" gutterBottom>
                Projets en cours
            </Typography>
            <DataGrid
                rows={projects}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
            />
        </Box>
    );
}