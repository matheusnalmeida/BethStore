import { Grid, IconButton, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { priceMask } from '../../../../utils/mask.utils'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useCarrinho } from '../../../../hooks/useCarrinho';
import DeleteIcon from '@mui/icons-material/Delete';

function ProdutoItem({
    produto,
    isDetails = false
}) {
    const { decrease, increase, removeProduct } = useCarrinho();
    console.log(produto)
    return (
        <Grid
            borderTop={"3px solid rgb(222, 224, 228)"}
            borderBottom={"3px solid rgb(222, 224, 228)"}
            paddingTop={"30px"}
            container>
            <Grid
                item
                alignItems={"center"}
                justifyContent={"center"}
                textAlign={"center"}
                xs={4}>
                {
                    isDetails &&
                    <Grid
                        item
                        sx={{
                            marginBottom: 3,
                            color: 'rgb(127, 133, 141)'
                        }}
                        xs={12}>
                        <Typography>Codigo: {produto.codigo}</Typography>
                    </Grid>
                }
                <Grid
                    item
                    sx={{
                        marginBottom: 3,
                        color: 'rgb(127, 133, 141)'
                    }}
                    xs={12}>
                    <Typography>Marca: {produto.marca}</Typography>
                </Grid>
                <Grid
                    item
                    sx={{
                        marginBottom: 3
                    }}
                    xs={12}>
                    <Typography
                        fontSize={18}
                        fontWeight={"bold"}>
                        Descrição: {produto.descricao}
                    </Typography>
                </Grid>
                <Grid
                    item
                    sx={{
                        marginBottom: 3,
                        color: 'rgb(127, 133, 141)'
                    }}
                    xs={12}>
                    <Typography>Modelo: {produto.modelo}</Typography>
                </Grid>
                {
                    isDetails &&
                    <Grid
                        item
                        sx={{
                            marginBottom: 3,
                            color: 'rgb(127, 133, 141)'
                        }}
                        xs={12}>
                        <Typography>Tamanho: {produto.tamanho} cm³</Typography>
                    </Grid>
                }
            </Grid>
            <Grid
                item
                textAlign={'center'}
                xs={4}>
                <Grid
                    item
                    xs={12}>
                    <Typography>Quantidade:</Typography>
                </Grid>
                <Grid
                    item
                    mt={2}
                    xs={12}>

                    <IconButton
                        sx={{
                            color: (
                                produto.quantidade > 1 ? 'orange' : 'gray'
                            )
                        }}
                        disabled={produto.quantidade === 1 || isDetails}
                        onClick={() => decrease(produto)}
                    >
                        <ChevronLeftIcon />
                    </IconButton>
                    <Typography
                        display={'inline-block'}
                    >{produto.quantidade}
                    </Typography>
                    <IconButton
                        sx={{
                            color: (produto.quantidade !== produto.estoque ? 'orange' : 'gray')
                        }}
                        disabled={produto.quantidade === produto.estoque || isDetails}
                        onClick={() => increase(produto)}
                    >
                        <ChevronRightIcon />
                    </IconButton>
                </Grid>
                {!isDetails && <Grid
                    item
                    xs={12}>
                    <IconButton
                        sx={{
                            color: 'red'
                        }}
                        onClick={() => removeProduct(produto)}
                    >
                        <Tooltip
                            title="Remover"
                        >
                            <DeleteIcon />
                        </Tooltip>
                    </IconButton>
                </Grid>}

            </Grid>
            <Grid
                item
                textAlign={'center'}
                xs={4}>
                <Grid
                    item
                    xs={12}>
                    <Typography>Preço:</Typography>
                </Grid>
                <Grid
                    item
                    mt={4}
                    xs={12}>
                    <Typography
                        variant='h6'
                        color={'green'}
                    >
                        {priceMask(produto.preco * produto.quantidade)}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ProdutoItem