import { Grid, Typography } from '@mui/material'
import React from 'react'

function ResumoCliente({ cliente }) {
    return (
        <Grid
            item
            sx={{ padding: 3 }}
            xs={12}>
            <Typography
                variant="h5"
                fontWeight={"bold"}>
                Dados do Cliente
            </Typography>
            <Typography
                mt={2}
            >
                Nome: {cliente?.nome ?? ''}
            </Typography>
            <Typography
                mt={2}
            >
                Telefone: {cliente?.telefone ?? ''}
            </Typography>
            <Typography
                mt={2}
            >
                Email: {cliente?.email ?? ''}
            </Typography>
            <Typography
                mt={2}
            >
                CPF: {cliente?.cpf ?? ''}
            </Typography>
            <Typography
                mt={2}
            >
                CEP: {cliente?.cep ?? ''}
            </Typography>
            <Typography
                mt={2}
            >
                Endereço: {cliente?.endereco ?? ''}
            </Typography>
        </Grid>
    );
}

export default ResumoCliente