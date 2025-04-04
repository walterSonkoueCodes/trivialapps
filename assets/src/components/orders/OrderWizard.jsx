import { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Typography } from '@mui/material';
import { ApiService } from '../../api/apiService';

const steps = ['Service', 'Détails', 'Budget', 'Confirmation'];

export default function OrderWizard() {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        serviceType: '',
        details: '',
        budget: 0,
        deadline: ''
    });

    const handleSubmit = async () => {
        try {
            await ApiService.createOrder(formData);
            // Redirection après succès
        } catch (error) {
            console.error('Erreur de soumission:', error);
        }
    };

    return (
        <div>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {/* Contenu des étapes */}
            {activeStep === 0 && (
                <ServiceSelection
                    onNext={(service) => {
                        setFormData({...formData, serviceType: service});
                        setActiveStep(1);
                    }}
                />
            )}

            {activeStep === steps.length - 1 ? (
                <div>
                    <Typography>Confirmation</Typography>
                    <Button onClick={handleSubmit}>Soumettre</Button>
                </div>
            ) : null}
        </div>
    );
}