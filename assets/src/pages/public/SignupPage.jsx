import { Container, Box } from '@mui/material';
import SignupForm from '../../components/forms/SignupForm';

export default function SignupPage() {
    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 8 }}>
                <SignupForm />
            </Box>
        </Container>
    );
}