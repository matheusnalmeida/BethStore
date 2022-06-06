import { Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useCarrinho } from '../../../hooks/useCarrinho';
import FreteService from '../../../services/frete.service';
import { cepMask, priceMask } from '../../../utils/mask.utils';
import { showErrorMessage } from '../../../utils/toast.utils';
import { cepExists, cepValid } from '../../../utils/validator.utils';

function SimularFrete() {
    const { cartItems } = useCarrinho();
    const [cepSimular, setCepSimular] = useState('')
    const [freteSimulacaoValor, setFreteSimulacaoValor] = useState(null)

    const simularCep = async () => {
        if (!(await isValid())) {
            setFreteSimulacaoValor(null)
            return;
        }

        FreteService.CalcularFrete(cepSimular, cartItems)
        .then((result) => {
            if (result.success){
                setFreteSimulacaoValor(result.data)
            }else{
                setFreteSimulacaoValor(null)
            }
        });
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
            !!cepSimular &&
            cartItems.length > 0
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
                xs={8}>
                <TextField
                    id="cep"
                    name="cep"
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
                    {
                        freteSimulacaoValor && 
                        <Typography>O valor do frete é de: {priceMask(freteSimulacaoValor)}</Typography>
                    }
            </Grid>
        </Grid>)
}

export default SimularFrete