import { Chip } from '@mui/material';

export default function InvoiceStatus({ status }) {
    const colorMap = {
        paid: 'success',
        pending: 'warning',
        overdue: 'error'
    };

    return <Chip label={status} color={colorMap[status] || 'default'} />;
}