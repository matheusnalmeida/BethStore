import { Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import FreteService from '../../../services/frete.service';
import { cepMask } from '../../../utils/mask.utils';
import { showErrorMessage } from '../../../utils/toast.utils';
import { cepExists, cepValid } from '../../../utils/validator.utils';

function SimularFrete() {

    const [cepSimular, setCepSimular] = useState('')

    const simularCep = async () => {
        if (!(await isValid())) {
            return;
        }

        FreteService.CalcularFrete(cepSimular);
        console.log(cepSimular)
    }

    const isValid = async () => {
        if (!cepValid(cepSimular)) {
            showErrorMessage("CEP Inválido!")
            return false;
        }

        let cepNaoExiste = !(await cepExists(cepSimular))
        if(cepNaoExiste){
            showErrorMessage("O CEP informado não existe!")
            return false;
        }

        return true;
    }

    const formFilled = () => {
        return (
            !!cepSimular
        );
    }

    return (
        <Grid
            mt={5}
            sx={{
                padding: 3
            }}
            container>
            <Grid
                item
                sx={{
                    marginBottom: 3
                }}
                xs={12}>
                <Typography
                    variant="h5"
                    fontWeight={"bold"}>
                    Selecione o endereço
                </Typography>            
            </Grid>
            <Grid
                item
                xs={4}>
                <TextField
                    id="cpf"
                    name="cpf"
                    variant="outlined"
                    fullWidth
                    autoComplete='off'
                    label="CEP"
                    value={cepSimular}
                    size='small'
                    onChange={(evt) => setCepSimular(cepMask(evt.target.value))} />
            </Grid>
            <Grid
                item
                sx={{
                    marginLeft: 3
                }}
                xs={2}>
                <Button
                    id="btn-simular"
                    type="button"
                    variant="contained"
                    color="success"
                    disabled={!formFilled()}
                    onClick={simularCep}
                >
                    {"Simular"}
                </Button>
            </Grid>
            <Grid
                item
                sx={{
                    marginTop: 3
                }}
                xs={12}>
                <Typography>O valor do frete é de: </Typography>
            </Grid>
        </Grid>)
}

export default SimularFrete