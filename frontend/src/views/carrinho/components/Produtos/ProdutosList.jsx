import { Grid, Typography } from '@mui/material'
import React from 'react'
import { useCarrinho } from '../../../../hooks/useCarrinho';
import ProdutoItem from './ProdutoItem';

function ProdutosList() {

    const { cartItems } = useCarrinho();

    return (
        <Grid
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
                    Produtos
                </Typography>
                {
                    cartItems.map(produto => {
                        return (<ProdutoItem
                            key={produto.codigo}
                            produto={produto}
                        />)
                    })
                }
            </Grid>
        </Grid>)
}

export default ProdutosList