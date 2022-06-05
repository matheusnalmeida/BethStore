import { Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';
import CategoriaService from '../../services/categoria.service';
import { showConfirmationDialog } from '../../utils/dialog.utils'
import { showErrorMessage, showSuccessMessage } from '../../utils/toast.utils';

const CategoriaHome = () => {
    const [categorias, setCategorias] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategorias();
    }, []);

    const fetchCategorias = () => {
        CategoriaService.GetAllCategorias().then((result) => {
            setCategorias(result.data)
        });
    }

    const deleteCategoria = (codigo) => {
        CategoriaService.DeleteCategoria(codigo).then((result) => {
            if (result.success) {
                showSuccessMessage(result.message)
                fetchCategorias()
                return;
            }
            showErrorMessage(result.message)
        });
    }

    const confirmCategoriaDelete = (codigo) => {
        showConfirmationDialog(
            "Deletar Categoria",
            "Deseja realmente deletar a categoria?",
            () => deleteCategoria(codigo));
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
                                <TableCell align="center">Código</TableCell>
                                <TableCell align="center">Descrição</TableCell>
                                <TableCell align="center">Setor</TableCell>
                                <TableCell align="center">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                categorias.map((categoria, index) => {
                                    return (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="center">{categoria.codigo}</TableCell>
                                            <TableCell align="center">{categoria.descricao}</TableCell>
                                            <TableCell align="center">{categoria.setor}</TableCell>
                                            <TableCell align="center">
                                                <Tooltip title="Editar">
                                                    <IconButton
                                                        variant="contained"
                                                        sx={{
                                                            color: 'yellow'
                                                        }}
                                                        onClick={() => navigateTo(`update/${categoria.codigo}`)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Deletar">
                                                    <IconButton
                                                        sx={{
                                                            color: 'red'
                                                        }}
                                                        onClick={() => confirmCategoriaDelete(categoria.codigo)}>
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

export default CategoriaHome;