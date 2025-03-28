import { Stepper, Step, StepLabel } from '@mui/material';
import { useState } from 'react';

const steps = ['Service', 'Détails', 'Budget', 'Confirmation'];

export default function OrderWizardForm() {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <div>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
}