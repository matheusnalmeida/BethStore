import { Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PedidoService from '../../services/pedido.service'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { brasilianDateMaskFromUTCString, priceMask } from '../../utils/mask.utils';
import { useBlocking } from '../../hooks/useBlocking';

const PedidoHome = () => {
    const [pedidos, setPedidos] = useState([]);
    const navigate = useNavigate();
    const { Blocking, Unblocking } = useBlocking();

    useEffect(() => {
        fetchPedidos();
    }, []);

    const fetchPedidos = () => {
        Blocking()
        PedidoService.GetAllPedidos().then((result) => {
            setPedidos(result.data)
        }).finally(() => {
            Unblocking()
        });
    }

    const navigateTo = (path) => {
        navigate(path)
    }

    return (
        <Grid
            container
            direction={'column'}
            alignContent={'center'}
            justifyContent={'center'}
            spacing={2}
            sx={{
                paddingTop: '70px'
            }}>
            <Grid
                item
                xs={12}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Codigo</TableCell>
                                <TableCell align="center">Cliente</TableCell>
                                <TableCell align="center">Forma de Pagamento</TableCell>
                                <TableCell align="center">Previsao de Entrega</TableCell>
                                <TableCell align="center">Valor Frete</TableCell>
                                <TableCell align="center">Valor Total</TableCell>
                                <TableCell align="center">Status Aprovação</TableCell>
                                <TableCell align="center">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                pedidos.map((pedido, index) => {
                                    return (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="center">{pedido.codigo}</TableCell>
                                            <TableCell align="center">{pedido.cliente.email}</TableCell>
                                            <TableCell align="center">{pedido.forma_pagamento}</TableCell>
                                            <TableCell align="center">{brasilianDateMaskFromUTCString(pedido.previsao_entrega)}</TableCell>
                                            <TableCell align="center">{priceMask(pedido.valor_frete)}</TableCell>
                                            <TableCell align="center">{priceMask(pedido.valor_total)}</TableCell>
                                            <TableCell align="center">{pedido.aprovacao.status}</TableCell>
                                            <TableCell align="center">
                                                <Tooltip title="Detalhes">
                                                    <IconButton
                                                        variant="contained"
                                                        sx={{
                                                            color: 'black'
                                                        }}
                                                        onClick={() => navigateTo(`details/${pedido.codigo}`)}>
                                                        <VisibilityIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}

export default PedidoHome;