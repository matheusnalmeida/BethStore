import { Button, Grid, InputLabel, TextField } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cliente from '../../../models/cliente';
import ClienteService from '../../../services/cliente.service';
import { showErrorMessage, showSuccessMessage } from '../../../utils/toast.utils';

const ClienteForm = ({
    isEdit = false,
    clienteProp = Cliente(),
    }) => {

    const navigate = useNavigate();
    const [cliente, setCliente] = useState(clienteProp)

    const handleFormChange = (evt) => {
        setCliente(prevCliente => {
            return {
                ...prevCliente,
                [evt.target.name]: evt.target.value,
            }
        })
    }

    const handleBack = () => {
        navigate('/cliente')
    }

    const CreateCliente = () => {
        ClienteService.CreateCliente(cliente).then((result) => {
            if (result.success){
                showSuccessMessage(result.message)
                handleBack();
                return;
            }
            showErrorMessage(result.message)
        });
    }

    const UpdateCliente = () => {
        ClienteService.UpdateCliente(cliente.id, cliente).then((result) => {
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
            UpdateCliente();
        }else{
            CreateCliente();
        }
    }

    const formFilled = () => {
        return (
            !!cliente.cpf &&
            !!cliente.cep &&
            !!cliente.email &&
            !!cliente.nome &&
            !!cliente.telefone
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
                            CPF
                        </InputLabel>
                        <TextField
                            id="cpf"
                            name="cpf"
                            variant="outlined"
                            fullWidth
                            autoComplete='off'
                            value={cliente.cpf}
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
                            CEP
                        </InputLabel>
                        <TextField
                            id="cep"
                            name="cep"
                            variant="outlined"
                            fullWidth
                            autoComplete='off'
                            value={cliente.cep}
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
                        xs={4}
                    >
                        <InputLabel
                            sx={{
                                color: "black",
                                paddingBottom: 1,
                            }}
                        >
                            EMAIL
                        </InputLabel>
                        <TextField
                            id="email"
                            name="email"
                            variant="outlined"
                            fullWidth
                            autoComplete='off'
                            value={cliente.email}
                            onChange={handleFormChange} />
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
                            Nome
                        </InputLabel>
                        <TextField
                            id="nome"
                            name="nome"
                            variant="outlined"
                            fullWidth
                            autoComplete='off'
                            value={cliente.nome}
                            onChange={handleFormChange} />
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
                            Telefone
                        </InputLabel>
                        <TextField
                            id="telefone"
                            name="telefone"
                            variant="outlined"
                            fullWidth
                            autoComplete='off'
                            value={cliente.telefone}
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

export default ClienteForm;