import { Button, Grid, InputLabel, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Container } from '@mui/system';
import SimularFrete from './components/SimularFrete';
import ProdutosList from './components/Produtos/ProdutosList';

const Carrinho = () => {


    return (
        <Container>
            <SimularFrete />
            <ProdutosList />
        </Container>
    );
}

export default Carrinho;