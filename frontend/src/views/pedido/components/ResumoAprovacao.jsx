import { Grid, Typography } from '@mui/material'
import React from 'react'
import Aprovacao from '../../../models/aprovacao'

function ResumoAprovacao({ aprovacao = Aprovacao()}) {
    return (
        <Grid
            item
            sx={{ padding: 5, paddingTop: 3 }}
            xs={12}>
            <Typography
                variant="h5"
                fontWeight={"bold"}>
                Dados da Aprovação
            </Typography>
            <Typography
                mt={2}
            >
                Código do Pedido: {aprovacao.codigo_aprovacao}
            </Typography>
            <Typography
                mt={2}
            >
                Status: {aprovacao.status}
            </Typography>
        </Grid>
    )
}

export default ResumoAprovacao