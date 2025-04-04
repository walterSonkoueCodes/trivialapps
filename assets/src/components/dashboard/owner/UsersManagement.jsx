import { useNavigate } from 'react-router-dom';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Chip, IconButton, Tooltip } from '@mui/material';
import { Info, AssignmentInd } from '@mui/icons-material';

const roleColors = {
    ROLE_CLIENT: 'primary',
    ROLE_EXPERT: 'secondary',
    ROLE_ADMIN: 'warning',
    ROLE_OWNER: 'success'
};

export default function UsersManagement({ users = [] }) {
    const navigate = useNavigate();

    const columns = [
        {
            field: 'fullName',
            headerName: 'Name',
            width: 200
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 250
        },
        {
            field: 'role',
            headerName: 'Role',
            width: 150,
            renderCell: (params) => (
                <Chip
                    label={params.value.replace('ROLE_', '')}
                    color={roleColors[params.value] || 'default'}
                    size="small"
                />
            )
        },
        {
            field: 'actions',
            type: 'actions',
            width: 150,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={
                        <Tooltip title="View Details">
                            <IconButton size="small" color="info">
                                <Info />
                            </IconButton>
                        </Tooltip>
                    }
                    label="Details"
                    onClick={() => navigate(`/owner/user-details/${params.row.id}`)}
                />,
                <GridActionsCellItem
                    icon={
                        <Tooltip title="Assign Project">
                            <IconButton size="small" color="success">
                                <AssignmentInd />
                            </IconButton>
                        </Tooltip>
                    }
                    label="Assign Project"
                    onClick={() => navigate(`/owner/assign-project/${params.row.id}`)}
                />
            ]
        }
    ];

    return (
        <div style={{ height: 460, width: '100%' }}>
            <DataGrid
                rows={users}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                getRowId={(row) => row.id}
                disableSelectionOnClick
            />
        </div>
    );
}
