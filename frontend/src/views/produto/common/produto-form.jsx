import { Button, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Produto from '../../../models/produto';
import CategoriaService from '../../../services/categoria.service';
import ProdutoService from '../../../services/produto.service';
import { onlyNumberMask } from '../../../utils/mask.utils';
import { showErrorMessage, showSuccessMessage } from '../../../utils/toast.utils';
import CustomPriceInput from '../../../components/CustomPriceInput';
import { useCarrinho } from '../../../hooks/useCarrinho';

const ProdutoForm = ({
    isEdit = false,
    produtoProp = Produto(),
}) => {

    const navigate = useNavigate();
    const [categorias, setCategorias] = useState([])
    const [produto, setProduto] = useState(produtoProp)
    const { cartItems, updateProduct } = useCarrinho();

    useEffect(() => {
        CategoriaService.GetAllCategorias().then((result) => {
            setCategorias(result.data)
        });
    }, [])

    const handleFormChange = (evt, mask) => {
        if (!evt){
            return;
        }
        let value = mask 
        && typeof(mask) === "function" ? mask(evt.target.value): evt.target.value;
        setProduto(prevProduto => {
            return {
                ...prevProduto,
                [evt.target.name]: value,
            }
        })
    }

    const handleBack = () => {
        navigate('/produto')
    }

    const CreateProduto = () => {
        ProdutoService.CreateProduto(produto).then((result) => {
            if (result.success) {
                showSuccessMessage(result.message)
                handleBack();
                return;
            }
            showErrorMessage(result.message)
        });
    }

    const UpdateProduto = () => {
        ProdutoService.UpdateProduto(produto.codigo, produto).then((result) => {
            if (result.success) {
                showSuccessMessage(result.message)
                updateProduct(result.data)
                handleBack();
                return;
            }
            showErrorMessage(result.message)
        });
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (!isValid()){
            return;
        }
        if (isEdit) {
            UpdateProduto();
        } else {
            CreateProduto();
        }
    }

    const isValid = () => {
        if (produto.tamanho < 16){
            showErrorMessage("O tamanho minimo para o produto é 16cm!")
            return false;
        }
        if(isEdit){
            let productCart = 
                cartItems.find(produtoCart => produtoCart.codigo === produto.codigo)
            if (productCart 
                && (productCart.quantidade > produto.estoque)){
                showErrorMessage("O produto ja está no carrinho e a sua quantidade em estoque não pode ser reduzida!")
                return false;
            }
        }
        return true;
    } 

    const formFilled = () => {
        return (
            !!produto.categoria_codigo &&
            !!produto.descricao &&
            !!produto.marca &&
            !!produto.modelo &&
            !!Boolean(produto.preco) &&
            !!produto.estoque &&
            !!produto.tamanho
        );
    }

    return (
        <Container>
            <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{
                    mt: 15,
                }}
            >
                <Grid
                    container
                    spacing={0}
                    sx={{
                        width: "100%",
                        height: "100%",
                    }}>
                    <Grid
                        item
                        sx={{
                            padding: 3
                        }}
                        xs={6}
                    >
                        <InputLabel
                            sx={{
                                color: "black",
                                paddingBottom: 1,
                            }}
                        >
                            Descrição
                        </InputLabel>
                        <TextField
                            id="descricao"
                            name="descricao"
                            variant="outlined"
                            fullWidth
                            autoComplete='off'
                            value={produto.descricao}
                            onChange={handleFormChange} />
                    </Grid>
                    <Grid
                        item
                        sx={{
                            padding: 3
                        }}
                        xs={6}
                    >
                        <InputLabel
                            sx={{
                                color: "black",
                                paddingBottom: 1,
                            }}
                        >
                            Marca
                        </InputLabel>
                        <TextField
                            id="marca"
                            name="marca"
                            variant="outlined"
                            fullWidth
                            autoComplete='off'
                            value={produto.marca}
                            onChange={handleFormChange} />
                    </Grid>
                </Grid>
                <Grid
                    container
                    spacing={0}
                    sx={{
                        width: "100%",
                        height: "100%",
                    }}>
                    <Grid
                        item
                        sx={{
                            padding: 3
                        }}
                        xs={6}
                    >
                        <InputLabel
                            sx={{
                                color: "black",
                                paddingBottom: 1,
                            }}
                        >
                            Modelo
                        </InputLabel>
                        <TextField
                            id="modelo"
                            name="modelo"
                            variant="outlined"
                            fullWidth
                            autoComplete='off'
                            value={produto.modelo}
                            onChange={handleFormChange} />
                    </Grid>
                    <Grid
                        item
                        sx={{
                            padding: 3
                        }}
                        xs={6}
                    >
                        <InputLabel
                            sx={{
                                color: "black",
                                paddingBottom: 1,
                            }}
                        >
                            Categoria
                        </InputLabel>
                        <Select
                            id="categoria_codigo"
                            name="categoria_codigo"
                            value={categorias.length > 0 ? produto.categoria_codigo : ''}
                            onChange={handleFormChange}
                            defaultValue={''}
                            fullWidth
                        >
                            <MenuItem value={''} disabled></MenuItem>
                            {categorias.map(categoria => {
                                return (
                                    <MenuItem 
                                        key={categoria.codigo}
                                        value={categoria.codigo}>
                                        {categoria.descricao}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </Grid>
                </Grid>
                <Grid
                    container
                    spacing={0}
                    sx={{
                        width: "100%",
                        height: "100%",
                    }}>
                    <Grid
                        item
                        sx={{
                            padding: 3
                        }}
                        xs={4}
                    >
                        <InputLabel
                            sx={{
                                color: "black",
                                paddingBottom: 1,
                            }}
                        >
                            Preço
                        </InputLabel>
                        <CustomPriceInput 
                            value={produto.preco}
                            onValueChange={handleFormChange}
                            InputProps={{
                                id: "preco",
                                name: "preco"
                            }}
                            sx={{
                                width: '100%'
                            }}
                             />
                    </Grid>
                    <Grid
                        item
                        sx={{
                            padding: 3
                        }}
                        xs={4}
                    >
                        <InputLabel
                            sx={{
                                color: "black",
                                paddingBottom: 1,
                            }}
                        >
                            Estoque
                        </InputLabel>
                        <TextField
                            id="estoque"
                            name="estoque"
                            variant="outlined"
                            fullWidth
                            autoComplete='off'
                            value={produto.estoque}
                            onChange={(evt) => handleFormChange(evt, onlyNumberMask)}
                            type="number" />
                    </Grid>
                    <Grid
                        item
                        sx={{
                            padding: 3
                        }}
                        xs={4}
                    >
                        <InputLabel
                            sx={{
                                color: "black",
                                paddingBottom: 1,
                            }}
                        >
                            Tamanho (cm³)
                        </InputLabel>
                        <TextField
                            id="tamanho"
                            name="tamanho"
                            variant="outlined"
                            fullWidth
                            autoComplete='off'
                            placeholder='Minimo: 16 cm³'
                            value={produto.tamanho}
                            onChange={handleFormChange}
                            type="number" />
                    </Grid>
                </Grid>
                <Grid
                    container
                    spacing={0}
                    sx={{
                        width: "100%",
                        height: "100%",
                    }}
                    justifyContent="end">
                    <Grid
                        item
                        sx={{
                            padding: 3,
                        }}
                        xs={12}
                    >
                        <Button
                            id="btn-cadastrar"
                            type="submit"
                            variant="contained"
                            color="success"
                            sx={{
                                float: 'right',
                                marginLeft: '15px'
                            }}
                            disabled={!formFilled()}
                        >
                            {isEdit ? "Editar" : "Cadastrar"}
                        </Button>
                        <Button
                            id="btn-voltar"
                            type="button"
                            variant="contained"
                            sx={{
                                float: 'right',
                                backgroundColor: 'gray',
                                "&.MuiButtonBase-root:hover": {
                                    bgcolor: "gray"
                                }
                            }}
                            onClick={(_) => handleBack()}>
                            Voltar
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default ProdutoForm;