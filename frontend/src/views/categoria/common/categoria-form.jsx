import { Button, Grid, InputLabel, TextField } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Categoria from '../../../models/categoria';
import CategoriaService from '../../../services/categoria.service';
import { showErrorMessage, showSuccessMessage } from '../../../utils/toast.utils';

const CategoriaForm = ({
    isEdit = false,
    categoriaProp = Categoria(),
    }) => {

    const navigate = useNavigate();
    const [categoria, setCategoria] = useState(categoriaProp)

    const handleFormChange = (evt) => {
        setCategoria(prevCategoria => {
            return {
                ...prevCategoria,
                [evt.target.name]: evt.target.value,
            }
        })
    }

    const handleBack = () => {
        navigate('/categoria')
    }

    const CreateCategoria = () => {
        CategoriaService.CreateCategoria(categoria).then((result) => {
            if (result.success){
                showSuccessMessage(result.message)
                handleBack();
                return;
            }
            showErrorMessage(result.message)
        });
    }

    const UpdateCategoria = () => {
        CategoriaService.UpdateCategoria(categoria.codigo, categoria).then((result) => {
            if (result.success){
                showSuccessMessage(result.message)
                handleBack();
                return;
            }
            showErrorMessage(result.message)
        });
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (isEdit){
            UpdateCategoria();
        }else{
            CreateCategoria();
        }
    }

    const formFilled = () => {
        return (
            !!categoria.setor &&
            !!categoria.descricao
        );
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
                            value={categoria.descricao}
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
                            Setor
                        </InputLabel>
                        <TextField
                            id="setor"
                            name="setor"
                            variant="outlined"
                            fullWidth
                            autoComplete='off'
                            value={categoria.setor}
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

export default CategoriaForm;