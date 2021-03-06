import { Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';
import ProdutoService from '../../services/produto.service';
import { showErrorMessage, showSuccessMessage } from '../../utils/toast.utils';
import { showConfirmationDialog } from '../../utils/dialog.utils';
import { priceMask } from '../../utils/mask.utils';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCarrinho } from '../../hooks/useCarrinho';
import { useBlocking } from '../../hooks/useBlocking';

const ProdutoHome = () => {
    const [produtos, setProdutos] = useState([]);
    const navigate = useNavigate();
    const { addProduct, isInCart } = useCarrinho();
    const { Blocking, Unblocking } = useBlocking();

    useEffect(() => {
        fetchProdutos();
    }, []);

    const fetchProdutos = () => {
        Blocking();
        ProdutoService.GetAllProdutos().then((result) => {
            setProdutos(result.data)
        }).finally(() => {
            Unblocking();
        });
    }

    const deleteProduto = (codigo) => {
        Blocking()
        ProdutoService.DeleteProduto(codigo).then((result) => {
            if (result.success) {
                showSuccessMessage(result.message)
                fetchProdutos()
                return;
            }
            showErrorMessage(result.message)
        }).finally(() => {
            Unblocking()
        });
    }

    const confirmProdutoDelete = (codigo) => {
        showConfirmationDialog(
            "Deletar Produto",
            "Deseja realmente deletar o produto?",
            () => deleteProduto(codigo));
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
                                <TableCell align="center">Marca</TableCell>
                                <TableCell align="center">Modelo</TableCell>
                                <TableCell align="center">Pre??o</TableCell>
                                <TableCell align="center">Estoque</TableCell>
                                <TableCell align="center">Tamanho</TableCell>
                                <TableCell align="center">Descri????o</TableCell>
                                <TableCell align="center">Categoria</TableCell>
                                <TableCell align="center">A????es</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                produtos.map((produto, index) => {
                                    return (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="center">{produto.marca}</TableCell>
                                            <TableCell align="center">{produto.modelo}</TableCell>
                                            <TableCell align="center">{priceMask(produto.preco)}</TableCell>
                                            <TableCell align="center">{produto.estoque}</TableCell>
                                            <TableCell align="center">{produto.tamanho}</TableCell>
                                            <TableCell align="center">{produto.descricao}</TableCell>
                                            <TableCell align="center">{produto.categoria.descricao}</TableCell>
                                            <TableCell align="center">
                                                <Tooltip title="Editar">
                                                    <IconButton
                                                        variant="contained"
                                                        sx={{
                                                            color: 'yellow'
                                                        }}
                                                        onClick={() => navigateTo(`update/${produto.codigo}`)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Deletar">
                                                    <IconButton
                                                        sx={{
                                                            color: 'red'
                                                        }}
                                                        onClick={() => confirmProdutoDelete(produto.codigo)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                {
                                                    <Tooltip title="Comprar">
                                                        <span>
                                                            <IconButton
                                                                sx={{
                                                                    color: isInCart(produto) || produto.estoque === 0 ? 'gray' : 'orange'
                                                                }}
                                                                disabled={isInCart(produto) || produto.estoque === 0}
                                                                onClick={() => addProduct(produto)}>
                                                                <ShoppingCartIcon />
                                                            </IconButton>
                                                        </span>
                                                    </Tooltip>
                                                }
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

export default ProdutoHome;