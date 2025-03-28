import { DataGrid } from '@mui/x-data-grid';
import { Chip } from '@mui/material';

const roleColors = {
    ROLE_CLIENT: 'primary',
    ROLE_EXPERT: 'secondary',
    ROLE_ADMIN: 'warning',
    ROLE_OWNER: 'success'
};

const columns = [
    {
        field: 'fullName',
        headerName: 'Nom',
        width: 200
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 250
    },
    {
        field: 'role',
        headerName: 'Rôle',
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
        field: 'lastLogin',
        headerName: 'Dernière connexion',
        width: 200,
        valueGetter: (params) =>
            params.value ? new Date(params.value).toLocaleString() : 'Jamais'
    },
];

export default function UsersManagement({ users }) {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={users || []}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    );
}