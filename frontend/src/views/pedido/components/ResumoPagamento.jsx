import { Grid, Typography } from '@mui/material'
import React from 'react'
import { priceMask } from '../../../utils/mask.utils'

function ResumoPagamento({ pedido }) {
    return (
        <Grid
            item
            sx={{ padding: 3 }}
            xs={12}>
            <Typography
                variant="h5"
                fontWeight={"bold"}>
                Dados do Pagamento
            </Typography>
            <Typography
                mt={2}
            >
                Previsão de Entrega: {pedido?.previsao_entrega ?? ''}
            </Typography>
            <Typography
                mt={2}
            >
                Valor do frete: {priceMask(pedido?.valor_frete) ?? ''}
            </Typography>
            <Typography
                mt={2}
            >
                Forma de pagamento: {pedido?.forma_pagamento ?? ''}
            </Typography>
            <Typography
                mt={2}
            >
                Valor Total: {priceMask(pedido?.valor_total) ?? ''}
            </Typography>
        </Grid>
    )
}

export default ResumoPagamento