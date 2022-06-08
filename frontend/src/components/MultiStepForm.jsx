import { Button, Card, CardContent, Grid, Stack, Step, StepLabel, Stepper } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState } from 'react'

const MultiStepForm = ({ children, onSubmit }) => {
    const [step, setStep] = useState(0);
    const currentChild = children[step];
    const [completed, setCompleted] = useState(false);

    const nextStep = () => {
        if (isLastStep()) {
            onSubmit();
            setCompleted(true);
        } else {
            setStep((s) => s + 1);
        }
    }

    const backStep = () => {
        setStep((s) => s - 1)
    }

    const isFirstStep = () => {
        return step === 0;
    }

    const isLastStep = () => {
        return step === children.length - 1;
    }

    const currentChildValid = () => {
        if (currentChild &&
            currentChild.props.validator){
                return currentChild.props.validator();
            }
        return true;
    }

    return (
        <Container>
            <>
                <Stack
                    mt={5}
                    sx={{
                        padding: 3
                    }}
                >
                    <Stepper alternativeLabel activeStep={step}>
                        {children.map((child, index) => (
                            <Step key={child.props.label} completed={step > index || completed}>
                                <StepLabel>{child.props.label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Stack>
                <Card>
                    <CardContent>
                        {currentChild}
                    </CardContent>
                </Card>
                <Grid
                    mt={3}
                    pb={3}
                    container
                    spacing={2}>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={backStep}
                            disabled={isFirstStep()}
                        >
                            Voltar
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={nextStep}
                            disabled={!currentChildValid()}
                        >
                            {isLastStep() ? 'Enviar' : 'Próximo'}
                        </Button>
                    </Grid>
                </Grid>
            </>
        </Container>
    );
}

export default MultiStepForm