import { Container, Box } from '@mui/material';
import SignupForm from '../../components/forms/SignupForm';
import { useAuth } from '../../context/AuthContext';

export default function SignupPage() {
    const { user } = useAuth();

    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 8 }}>
                <SignupForm />
            </Box>
        </Container>
    );
}