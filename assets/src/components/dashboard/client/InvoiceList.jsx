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
    Chip,
    Snackbar,
    Alert
} from '@mui/material';
import { useState } from 'react';

export default function InvoiceList({ invoices }) {
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const handleDownload = async (invoiceId) => {
        try {
            const response = await fetch(`/api/me/invoices/${invoiceId}/download`);

            if (!response.ok) throw new Error('Download failed');

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = `invoice_project_${invoiceId}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            setSnackbar({
                open: true,
                message: 'Invoice downloaded successfully',
                severity: 'success'
            });
        } catch (error) {
            console.error('Download error:', error);
            setSnackbar({
                open: true,
                message: 'Failed to download invoice',
                severity: 'error'
            });
        }
    };

    const handleSendEmail = async (invoiceId) => {
        try {
            const response = await fetch(`/api/me/invoices/${invoiceId}/email`, {
                method: 'POST',
            });

            if (!response.ok) throw new Error();

            setSnackbar({
                open: true,
                message: 'Invoice sent by email!',
                severity: 'success'
            });
        } catch (error) {
            setSnackbar({
                open: true,
                message: 'Failed to send invoice email',
                severity: 'error'
            });
        }
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
            field: 'issuedAt',
            headerName: 'Issued Date',
            flex: 1,
            minWidth: 120,
            valueGetter: (params) => {
                if (!params || !params.row || !params.row.issued_at) return 'N/A';
                return new Date(params.row.issuedAt).toLocaleDateString();
            }
        },,
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
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
            >
                <Alert
                    onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}
