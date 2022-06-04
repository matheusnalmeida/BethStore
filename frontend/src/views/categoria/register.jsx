import { Button, Grid, TextField } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/categoria/categoria.css';

const CategoriaRegister = () => {
    const navigate = useNavigate();
    const [categoria, setCategoria] = useState({
        descricao: '',
        setor: ''
    })

    const handleFormChange = (evt) => {
        setCategoria(prevCategoria => {
            return {
                ...prevCategoria,
                [evt.target.name]: evt.target.value,
            }
        })
        console.log(categoria)
    }

    const handleBack = () => {
        navigate('/categoria')
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
    }

    return (
        <Container>
            <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{
                    mt: 20,
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
                        <TextField
                            id="descricao"
                            name="descricao"
                            label="Descrição"
                            variant="outlined"
                            fullWidth
                            onChange={handleFormChange} />
                    </Grid>
                    <Grid
                        item
                        sx={{
                            padding: 3
                        }}
                        xs={6}
                    >
                        <TextField
                            id="setor"
                            name="setor"
                            label="Setor"
                            variant="outlined"
                            fullWidth
                            onChange={handleFormChange} />
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
                            }}>
                            Cadastrar
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

export default CategoriaRegister;