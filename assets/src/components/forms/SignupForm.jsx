import { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { ApiService } from '../../api/apiService';

export default function SignupForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        userType: 'client' // 'client', 'expert' ou 'admin'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await ApiService.post('/register', formData);
            // Redirection après succès
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Champs du formulaire... */}
        </form>
    );
}