import { Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react'
import Pedido from '../../../models/pedido';
import ClienteService from '../../../services/cliente.service';
import ProdutosList from '../../carrinho/components/Produtos/ProdutosList';
import ResumoCliente from '../components/ResumoCliente';
import ResumoPagamento from '../components/ResumoPagamento';

const ResumoPedidoStep = ({
  produtos,
  pedido = Pedido(),
}) => {

  const [cliente, setCliente] = useState()

  useEffect(() => {
    ClienteService.GetCliente(pedido.cliente_codigo).then(
      (result) => {
        setCliente(result.data)
      }
    )
  }, [pedido.cliente_codigo])

  return (
    <Container>
      <Grid
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
            Resumo do Pedido
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}>
          <ResumoCliente
            cliente={cliente}
          />
        </Grid>
        <Grid
          item
          xs={12}>
          <ProdutosList
            produtos={produtos}
            isDetails={true} />
        </Grid>
        <Grid
          item
          xs={12}>
            <ResumoPagamento pedido={pedido}/>
        </Grid>
      </Grid>
    </Container>)
}

export default ResumoPedidoStep