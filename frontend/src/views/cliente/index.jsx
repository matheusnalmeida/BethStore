import { Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';
import ClienteService from '../../services/cliente.service'
import { showConfirmationDialog } from '../../utils/dialog.utils';
import { showErrorMessage, showSuccessMessage } from '../../utils/toast.utils';
import { useBlocking } from '../../hooks/useBlocking';

const ClienteHome = () => {
    const [clientes, setClientes] = useState([]);
    const navigate = useNavigate();
    const { Blocking, Unblocking } = useBlocking();

    useEffect(() => {
        fetchClientes();
    }, []);

    const fetchClientes = () => {
        Blocking();
        ClienteService.GetAllClientes().then((result) => {
            setClientes(result.data)
        }).finally(() => {
            Unblocking()
        });
    }

    const deleteCliente = (codigo) => {
        Blocking();
        ClienteService.DeleteCliente(codigo).then((result) => {
            if (result.success) {
                showSuccessMessage(result.message)
                fetchClientes()
                return;
            }
            showErrorMessage(result.message)
        }).finally(() => {
            Unblocking()
        });
    }

    const confirmClienteDelete = (codigo) => {
        showConfirmationDialog(
            "Deletar Cliente",
            "Deseja realmente deletar o cliente?",
            () => deleteCliente(codigo));
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
                <Box display="flex" justifyContent="flex-end">
                    <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => navigateTo("register")}
                        sx={{
                            color: 'white'
                        }}>
                        Adicionar
                    </Button>
                </Box>
            </Grid>
            <Grid
                item
                xs={12}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Nome</TableCell>
                                <TableCell align="center">Telefone</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">CPF</TableCell>
                                <TableCell align="center">CEP</TableCell>
                                <TableCell align="center">Endere??o</TableCell>
                                <TableCell align="center">A????es</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                clientes.map((cliente, index) => {
                                    return (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="center">{cliente.nome}</TableCell>
                                            <TableCell align="center">{cliente.telefone}</TableCell>
                                            <TableCell align="center">{cliente.email}</TableCell>
                                            <TableCell align="center">{cliente.cpf}</TableCell>
                                            <TableCell align="center">{cliente.cep}</TableCell>
                                            <TableCell align="center">{cliente.endereco}</TableCell>
                                            <TableCell align="center">
                                                <Tooltip title="Editar">
                                                    <IconButton
                                                        variant="contained"
                                                        sx={{
                                                            color: 'yellow'
                                                        }}
                                                        onClick={() => navigateTo(`update/${cliente.id}`)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Deletar">
                                                    <IconButton
                                                        sx={{
                                                            color: 'red'
                                                        }}
                                                        onClick={() => confirmClienteDelete(cliente.id)}>
                                                        <DeleteIcon />
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

export default ClienteHome;