import { Container, Grid, MenuItem, Select, Typography } from '@mui/material';
import React from 'react'
import { BOLETO, CARTAO_CREDITO, PIX } from '../../../constants/forma-pagamento';
import { useBlocking } from '../../../hooks/useBlocking';
import Pedido from '../../../models/pedido';
import PrazoEntregaService from '../../../services/prazo-entrega.service';
import { brasilianDateMask } from '../../../utils/mask.utils'

const FormaPagamentoStep = ({
  pedido = Pedido(),
  handleFormChange = () => { return true } }) => {
  const { Blocking, Unblocking } = useBlocking();

  const onFormaPagamentoChange = (evt) => {    
    Blocking()
    let previsaoEntrega = 
      brasilianDateMask(
        PrazoEntregaService.CalcularPrazoEntrega(evt.target.value)
      )
    Unblocking()
    
    handleFormChange(
      evt,
      null,
      {
        previsao_entrega: previsaoEntrega,
        valor_total: calcularValorTotal()
      }
    )
  }

  const calcularValorTotal = () => {
    let valorTotal = 0
    pedido.produtos.forEach(produto => {
      valorTotal += (produto.preco * produto.quantidade)
    })
    valorTotal += pedido.valor_frete
    return valorTotal
  }

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
            Selecione a Forma de Pagamento
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            marginBottom: 3
          }}
          xs={8}>
          <Select
            id="forma_pagamento"
            name="forma_pagamento"
            value={pedido.forma_pagamento}
            onChange={onFormaPagamentoChange}
            defaultValue={''}
            fullWidth>
            <MenuItem value={''} disabled></MenuItem>
            <MenuItem
              value={PIX}>
              {PIX}
            </MenuItem>
            <MenuItem
              value={BOLETO}>
              {BOLETO}
            </MenuItem>
            <MenuItem
              value={CARTAO_CREDITO}>
              {CARTAO_CREDITO}
            </MenuItem>
          </Select>
        </Grid>
        <Grid
          item
          xs={12}>
          <Typography
            variant="h6">
            Prazos de entrega de acordo com a forma de pagamento:
          </Typography>
          <Typography
            mt={2}
          >            
            {`${PIX}: ${brasilianDateMask(PrazoEntregaService.CalcularPrazoEntrega(PIX))}`}
          </Typography>
          <Typography
            mt={2}
          >            
            {`${CARTAO_CREDITO}: 
            ${brasilianDateMask(PrazoEntregaService.CalcularPrazoEntrega(CARTAO_CREDITO))}`}
          </Typography>
          <Typography
            mt={2}
          >            
            {`${BOLETO}: 
            ${brasilianDateMask(PrazoEntregaService.CalcularPrazoEntrega(BOLETO))}`}
          </Typography>
        </Grid>
      </Grid>
    </Container>)
}

export default FormaPagamentoStep