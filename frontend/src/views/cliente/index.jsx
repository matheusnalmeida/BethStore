import { Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';
import ClienteService from '../../services/cliente.service'
import { showConfirmationDialog } from '../../utils/dialog.utils';
import { showErrorMessage, showSuccessMessage } from '../../utils/toast.utils';

const ClienteHome = () => {
    const [clientes, setClientes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchClientes();
    }, []);

    const fetchClientes = () => {
        ClienteService.GetAllClientes().then((result) => {
            setClientes(result.data)
        });
    }

    const deleteCliente = (codigo) => {
        ClienteService.DeleteCliente(codigo).then((result) => {
            if (result.success) {
                showSuccessMessage(result.message)
                fetchClientes()
                return;
            }
            showErrorMessage(result.message)
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
                                <TableCell align="center">Ações</TableCell>
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
                                            <TableCell align="center">
                                                <IconButton
                                                    variant="contained"
                                                    sx={{
                                                        color: 'yellow'
                                                    }}
                                                    onClick={() => navigateTo(`update/${cliente.id}`)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    sx={{
                                                        color: 'red'
                                                    }}
                                                    onClick={() => confirmClienteDelete(cliente.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
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