import { Button, Grid } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useCarrinho } from '../../../hooks/useCarrinho';

function PedidoRequest() {
    const navigate = useNavigate();
    const { cartItems } = useCarrinho();

    return (
        <Grid
            mt={15}
            container>
            <Grid
                item
                xs={8}>
                <Button
                    variant="contained"
                    onClick={() => navigate('/pedido/pagamento')}
                    disabled={cartItems.length === 0}
                >Seguir para o pagamento
                </Button>
            </Grid>
        </Grid>
    );
}

export default PedidoRequest