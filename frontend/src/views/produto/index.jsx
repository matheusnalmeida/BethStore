import { Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/categoria/categoria.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';

const ProdutoHome = () => {
    const navigate = useNavigate();

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
                                <TableCell align="center">Marca</TableCell>
                                <TableCell align="center">Modelo</TableCell>
                                <TableCell align="center">Preço</TableCell>
                                <TableCell align="center">Quantidade</TableCell>
                                <TableCell align="center">Tamanho</TableCell>
                                <TableCell align="center">Descrição</TableCell>
                                <TableCell align="center">Categoria</TableCell>
                                <TableCell align="center">Ações</TableCell>                            
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                                key={"row"}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{"TODO"}</TableCell>
                                <TableCell align="center">{"TODO"}</TableCell>
                                <TableCell align="center">{"TODO"}</TableCell>
                                <TableCell align="center">{"TODO"}</TableCell>
                                <TableCell align="center">{"TODO"}</TableCell>
                                <TableCell align="center">{"TODO"}</TableCell>                                
                                <TableCell align="center">{"TODO"}</TableCell>                                                                
                                <TableCell align="center">
                                    <IconButton
                                        variant="contained"
                                        sx={{
                                            color: 'yellow'
                                        }}
                                        onClick={() => navigateTo('update')}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        sx={{
                                            color: 'red'
                                        }}
                                        onClick={() => console.log('TODO DELETE')}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}

export default ProdutoHome;