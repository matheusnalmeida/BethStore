import { Container, Grid, MenuItem, Select, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useBlocking } from '../../../hooks/useBlocking'
import Pedido from '../../../models/pedido'
import ClienteService from '../../../services/cliente.service'
import FreteService from '../../../services/frete.service'

const ClientePedidoStep = ({
    pedido = Pedido(),
    handleFormChange = () => { return true } }) => {
    const [clientes, setClientes] = useState([])
    const { Blocking, Unblocking } = useBlocking();

    useEffect(() => {
        Blocking()
        ClienteService.GetAllClientes()
            .then((result) => {
                setClientes(result.data)
            }).finally(() => {
                Unblocking()
            })
    }, [])

    const onClienteChange = (evt) => {
        let clienteSelecionado = clientes.find(cliente => cliente.id === evt.target.value)
        Blocking()
        calcularValorFrete(clienteSelecionado.cep).then(result =>
            handleFormChange(
                evt,
                null,
                { valor_frete: result.data }
            )
        ).finally(() => {
            Unblocking();
        })
    }

    const calcularValorFrete = (cep) => {
        return FreteService.CalcularFrete(cep, pedido.produtos)
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
                        Selecione o Cliente
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={8}>
                    <Select
                        id="cliente_codigo"
                        name="cliente_codigo"
                        value={clientes.length > 0 ?
                            pedido.cliente_codigo
                            : ''}
                        onChange={onClienteChange}
                        defaultValue={''}
                        fullWidth>
                        <MenuItem value={''} disabled></MenuItem>
                        {clientes.map(cliente => {
                            return (
                                <MenuItem
                                    key={cliente.id}
                                    value={cliente.id}>
                                    {cliente.nome}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </Grid>
            </Grid>
        </Container>
    )
}

export default ClientePedidoStep