import {
    DataGrid,
    GridActionsCellItem
} from '@mui/x-data-grid';
import {
    Download,
    Email
} from '@mui/icons-material';
import {
    Typography,
    Box,
    Chip
} from '@mui/material';

export default function InvoiceList({ invoices }) {
    const handleDownload = (invoiceId) => {
        console.log('Download invoice', invoiceId);
        // TODO: implement actual download logic
    };

    const handleSendEmail = (invoiceId) => {
        console.log('Send invoice', invoiceId);
        // TODO: implement actual email logic
    };

    const getStatusChip = (status) => {
        const lower = status?.toLowerCase();

        switch (lower) {
            case 'paid':
                return <Chip label="Paid" color="success" size="small" />;
            case 'overdue':
                return <Chip label="Overdue" color="error" size="small" />;
            case 'pending':
            default:
                return <Chip label="Pending" color="warning" size="small" />;
        }
    };

    const columns = [
        {
            field: 'number',
            headerName: 'Invoice #',
            flex: 1,
            minWidth: 120
        },
        {
            field: 'issued_at',
            headerName: 'Issued Date',
            flex: 1,
            minWidth: 120,
            valueGetter: (params) =>
                params.value ? new Date(params.value).toLocaleDateString() : 'N/A'
        },
        {
            field: 'amount',
            headerName: 'Amount',
            flex: 1,
            minWidth: 100,
            renderCell: (params) =>
                `€${Number(params.value || 0).toFixed(2)}`
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            minWidth: 130,
            renderCell: (params) => getStatusChip(params.value)
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<Download />}
                    label="Download"
                    onClick={() => handleDownload(params.row.id)}
                />,
                <GridActionsCellItem
                    icon={<Email />}
                    label="Send"
                    onClick={() => handleSendEmail(params.row.id)}
                />,
            ]
        }
    ];

    return (
        <Box sx={{ height: 420, width: '100%' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                My Invoices
            </Typography>
            <DataGrid
                rows={invoices || []}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                getRowId={(row) => row.id}
                sx={{
                    borderRadius: 2,
                    border: '1px solid #e0e0e0',
                    backgroundColor: 'background.paper',
                    '& .MuiDataGrid-cell': {
                        fontSize: '0.95rem'
                    }
                }}
            />
        </Box>
    );
}
