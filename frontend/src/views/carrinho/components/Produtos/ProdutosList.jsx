import { Grid, Typography } from '@mui/material'
import React from 'react'
import { useCarrinho } from '../../../../hooks/useCarrinho';
import ProdutoItem from './ProdutoItem';

function ProdutosList({ isDetails = false }) {

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
                    marginBottom: 3,
                }}
                xs={12}>
                <Typography
                    sx={{
                        marginBottom: 3,
                    }}
                    variant="h5"
                    fontWeight={"bold"}>
                    Produtos
                </Typography>
                {
                    cartItems.map(produto => {
                        return (<ProdutoItem
                            key={produto.codigo}
                            produto={produto}
                            isDetails={isDetails}
                        />)
                    })
                }
            </Grid>
        </Grid>)
}

export default ProdutosList