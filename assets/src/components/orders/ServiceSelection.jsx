import { Autocomplete, TextField } from '@mui/material';

export default function ServiceSelection({ onNext }) {
    const services = [
        { label: 'Site Vitrine', price: 1500 },
        { label: 'Application Mobile', price: 5000 }
    ];

    return (
        <Autocomplete
            options={services}
            renderInput={(params) => <TextField {...params} label="Service" />}
            onChange={(e, value) => onNext(value)}
        />
    );
}