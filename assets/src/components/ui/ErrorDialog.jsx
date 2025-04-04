// src/components/ui/ErrorDialog.jsx
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

export default function ErrorDialog({ open, message, details, onClose }) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Erreur</DialogTitle>
            <DialogContent>
                <Typography variant="body1">{message}</Typography>
                {details && (
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                        Détails : {details}
                    </Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Fermer
                </Button>
            </DialogActions>
        </Dialog>
    );
}