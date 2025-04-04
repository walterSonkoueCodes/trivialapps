import { TextField } from '@mui/material';

export default function ProjectDetails({ values, handleChange }) {
    return (
        <div>
            <TextField
                label="Description du projet"
                name="description"
                value={values.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                sx={{ mb: 3 }}
            />
        </div>
    );
}