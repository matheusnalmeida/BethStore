import { Grid, Typography } from '@mui/material'
import React from 'react'

function ProdutosList() {
    return (
        <Grid
            sx={{
                padding: 3
            }}
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
                    Produtos
                </Typography>
            </Grid>
            <Grid
                borderTop={"3px solid rgb(222, 224, 228)"}
                paddingTop={"30px"}
                container>
                <Grid
                    container
                    alignItems={"center"}
                    justifyContent={"center"}
                    textAlign={"center"}
                    xs={4}>
                    <Grid
                        item
                        sx={{
                            marginBottom: 1,
                            color: 'rgb(127, 133, 141)'
                        }}
                        xs={12}>
                        <Typography>Marca</Typography>
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
                            Descrição
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        sx={{
                            color: 'rgb(127, 133, 141)'
                        }}
                        xs={12}>
                        <Typography>Modelo</Typography>
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={4}>
                    <Typography>Quantidade:</Typography>
                </Grid>
                <Grid
                    item
                    xs={4}>
                    <Typography>Preço:</Typography>
                </Grid>
            </Grid>
        </Grid>)
}

export default ProdutosList