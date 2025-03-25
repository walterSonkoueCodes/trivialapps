import { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Typography } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import ServiceSelection from '../../components/orders/ServiceSelection';
import ProjectDetails from '../../components/orders/ProjectDetails';
import BudgetPlanning from '../../components/orders/BudgetPlanning';

const validationSchema = Yup.object().shape({
    service: Yup.string().required('Champ requis'),
    description: Yup.string().required('Description requise'),
    budget: Yup.number().min(100, 'Budget minimum: 100€').required(),
    deadline: Yup.date().min(new Date(), 'Date invalide').required()
});

export default function OrderWizardPage() {
    const [activeStep, setActiveStep] = useState(0);
    const steps = ['Service', 'Détails', 'Budget'];

    const handleSubmit = async (values) => {
        try {
            await ApiService.post('/orders', values);
            // Redirection après succès
        } catch (error) {
            console.error('Erreur de soumission:', error);
        }
    };

    return (
        <div>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Formik
                initialValues={{
                    service: '',
                    description: '',
                    budget: 0,
                    deadline: ''
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors }) => (
                    <Form>
                        {activeStep === 0 && <ServiceSelection />}
                        {activeStep === 1 && <ProjectDetails />}
                        {activeStep === 2 && <BudgetPlanning />}

                        <div style={{ marginTop: '2rem' }}>
                            {activeStep > 0 && (
                                <Button onClick={() => setActiveStep(prev => prev - 1)}>
                                    Retour
                                </Button>
                            )}

                            {activeStep < steps.length - 1 ? (
                                <Button
                                    variant="contained"
                                    onClick={() => setActiveStep(prev => prev + 1)}
                                    disabled={Object.keys(errors).length > 0}
                                >
                                    Suivant
                                </Button>
                            ) : (
                                <Button type="submit" variant="contained">
                                    Soumettre
                                </Button>
                            )}
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}