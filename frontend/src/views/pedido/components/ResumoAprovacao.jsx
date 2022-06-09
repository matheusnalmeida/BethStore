import { Grid, Typography } from '@mui/material'
import React from 'react'

function PedidoFinal() {
    return (
        <Grid
            container
            direction={'column'}
            spacing={2}
            sx={{
                padding: 3
            }}>
            <Grid
                item                
                sx={{  }}
                xs={12}>
                <Typography
                    variant="h4">
                    Dados da aprovação
                </Typography>
                <Typography
                    mt={2}
                >
                    {`${'Número do pedido'}: dasdasdasdas-adasdasd-dasdsadasd-asdasdsad`}
                </Typography>
                <Typography
                    mt={2}
                >
                    {`${'Status'}: Aprovado`}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default PedidoFinal