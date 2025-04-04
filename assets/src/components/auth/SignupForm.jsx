import { useState } from 'react';
import {
    TextField,
    Button,
    Grid
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    email: Yup.string().email('Email invalide').required('Champ requis'),
    password: Yup.string()
        .min(8, 'Minimum 8 caractères')
        .required('Champ requis'),
    fullName: Yup.string().required('Champ requis')
});

export default function SignupForm({ onSubmit }) {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            fullName: ''
        },
        validationSchema,
        onSubmit: values => onSubmit({
            ...values,
            role: 'ROLE_CLIENT'  // Rôle par défaut défini ici
        })
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Nom complet"
                        name="fullName"
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                        error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                        helperText={formik.touched.fullName && formik.errors.fullName}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Mot de passe"
                        name="password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={formik.isSubmitting}
                    >
                        S'inscrire
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}
