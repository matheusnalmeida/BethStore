import { Container, Grid, MenuItem, Select, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ClienteService from '../../../services/cliente.service'

const ClientePedidoStep = ({
    pedido = {},
    handleFormChange = () => { return true } }) => {
    const [clientes, setClientes] = useState([])
    
    
  useEffect(() => {
    console.log(pedido)
  }, [pedido])
  
    useEffect(() => {
        ClienteService.GetAllClientes()
            .then((result) => {
                setClientes(result.data)
            })
    }, [])

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
                        value={pedido.cliente_codigo}
                        onChange={handleFormChange}
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