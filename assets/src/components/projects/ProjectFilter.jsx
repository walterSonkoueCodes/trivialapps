import { TextField } from '@mui/material';

export default function ProjectFilter({ onFilterChange }) {
    return (
        <TextField
            label="Filtrer les projets"
            variant="outlined"
            fullWidth
            onChange={(e) => onFilterChange(e.target.value)}
            sx={{ mb: 3 }}
        />
    );
}