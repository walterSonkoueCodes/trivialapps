import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import { Visibility, Download } from '@mui/icons-material';
import ApiService from '../../api/apiService';

const columns = [
    {
        field: 'title',
        headerName: 'Projet',
        width: 200,
        renderCell: (params) => (
            <Link to={`/projects/${params.row.id}`} style={{ color: 'inherit' }}>
                {params.value}
            </Link>
        )
    },
    { field: 'client', headerName: 'Client', width: 150 },
    {
        field: 'status',
        headerName: 'Statut',
        width: 130,
        renderCell: (params) => (
            <Chip
                label={params.value}
                color={
                    params.value === 'Terminé' ? 'success' :
                        params.value === 'En cours' ? 'primary' : 'warning'
                }
                size="small"
            />
        )
    },
    {
        field: 'progress',
        headerName: 'Progression',
        width: 150,
        renderCell: (params) => (
            <Box sx={{ width: '100%' }}>
                <Typography variant="body2">{params.value}%</Typography>
                <LinearProgress
                    variant="determinate"
                    value={params.value}
                    color={
                        params.value > 75 ? 'success' :
                            params.value > 25 ? 'primary' : 'warning'
                    }
                />
            </Box>
        )
    },
    {
        field: 'actions',
        type: 'actions',
        width: 100,
        getActions: (params) => [
            <GridActionsCellItem
                icon={<Visibility />}
                label="Voir"
                onClick={() => window.open(`/projects/${params.row.id}`, '_blank')}
            />,
            <GridActionsCellItem
                icon={<Download />}
                label="Télécharger"
                onClick={() => console.log('Download', params.row.id)}
            />
        ]
    }
];

export default function ExpertProjectsTable({ expertId }) {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await ApiService.get(`/experts/${expertId}/projects`);
                setProjects(response.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, [expertId]);

    return (
        <Box sx={{ height: 400 }}>
            <DataGrid
                rows={projects}
                columns={columns}
                loading={loading}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                sx={{
                    '& .MuiDataGrid-cell:hover': {
                        cursor: 'pointer'
                    }
                }}
            />
        </Box>
    );
}