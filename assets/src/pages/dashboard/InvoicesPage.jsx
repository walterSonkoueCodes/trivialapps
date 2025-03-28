import { DataGrid } from '@mui/x-data-grid';
import { Chip } from '@mui/material';
import useInvoices from '../../hooks/useInvoices';
import InvoiceStatus from '../../components/invoices/InvoiceStatus';

const columns = [
    { field: 'number', headerName: 'Numéro', width: 150 },
    { field: 'project', headerName: 'Projet', width: 200 },
    { field: 'amount', headerName: 'Montant', width: 120 },
    {
        field: 'status',
        headerName: 'Statut',
        width: 150,
        renderCell: (params) => <InvoiceStatus status={params.value} />
    },
    { field: 'dueDate', headerName: 'Échéance', width: 150 }
];

export default function InvoicesPage() {
    const { invoices, loading, error } = useInvoices();

    return (
        <div style={{ height: 600, width: '100%' }}>
            <Typography variant="h4" gutterBottom>
                Factures
            </Typography>

            <DataGrid
                rows={invoices}
                columns={columns}
                loading={loading}
                error={error}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
            />
        </div>
    );
}