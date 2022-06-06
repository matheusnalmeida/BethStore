import React from 'react';
import { Container } from '@mui/system';
import SimularFrete from './components/SimularFrete';
import ProdutosList from './components/Produtos/ProdutosList';
import { Grid } from '@mui/material';
import PedidoRequest from './components/PedidoRequest';

const Carrinho = () => {

    return (
        <Container>
            <Grid
                container
            >
                <Grid
                    item
                    xs={8}
                >
                    <SimularFrete />
                </Grid>
                <Grid
                    item
                    xs={4}
                >
                    <PedidoRequest />
                </Grid>
            </Grid>
            <ProdutosList />
        </Container>
    );
}

export default Carrinho;