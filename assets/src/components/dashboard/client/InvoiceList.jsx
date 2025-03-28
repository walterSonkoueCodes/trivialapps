import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Download, Email } from '@mui/icons-material';
import { Typography } from '@mui/material';

const columns = [
    {
        field: 'number',
        headerName: 'N° Facture',
        width: 150
    },
    {
        field: 'date',
        headerName: 'Date',
        width: 120,
        valueGetter: (params) => new Date(params.value).toLocaleDateString()
    },
    {
        field: 'amount',
        headerName: 'Montant',
        width: 120,
        renderCell: (params) => `€${params.value.toFixed(2)}`
    },
    {
        field: 'status',
        headerName: 'Statut',
        width: 130,
        renderCell: (params) => (
            <Typography
                color={params.value === 'paid' ? 'success.main' : 'warning.main'}
                fontWeight="bold"
            >
                {params.value === 'paid' ? 'Payé' : 'En attente'}
            </Typography>
        )
    },
    {
        field: 'actions',
        type: 'actions',
        width: 100,
        getActions: (params) => [
            <GridActionsCellItem
                icon={<Download />}
                label="Télécharger"
                onClick={() => handleDownload(params.row.id)}
            />,
            <GridActionsCellItem
                icon={<Email />}
                label="Envoyer"
                onClick={() => handleSendEmail(params.row.id)}
            />,
        ],
    },
];

export default function InvoiceList({ invoices }) {
    const handleDownload = (invoiceId) => {
        console.log('Download invoice', invoiceId);
        // Implémentez la logique de téléchargement
    };

    const handleSendEmail = (invoiceId) => {
        console.log('Send invoice', invoiceId);
        // Implémentez l'envoi par email
    };

    return (
        <div style={{ height: 400, width: '100%' }}>
            <Typography variant="h6" gutterBottom>
                Mes Factures
            </Typography>
            <DataGrid
                rows={invoices || []}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
            />
        </div>
    );
}