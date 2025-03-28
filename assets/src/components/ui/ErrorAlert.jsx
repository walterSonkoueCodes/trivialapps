import { Alert, Snackbar } from '@mui/material';
import { useState } from 'react';

export default function ErrorAlert({ message }) {
    const [open, setOpen] = useState(true);

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
            <Alert severity="error" variant="filled">
                {message || 'Erreur de chargement des données'}
            </Alert>
        </Snackbar>
    );
}