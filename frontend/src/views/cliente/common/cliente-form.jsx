import { Button, Grid, InputLabel, TextField } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlocking } from '../../../hooks/useBlocking';
import Cliente from '../../../models/cliente';
import CEPService from '../../../services/cep.service';
import ClienteService from '../../../services/cliente.service';
import { cepMask, cpfMask, phoneMask } from '../../../utils/mask.utils';
import { showErrorMessage, showSuccessMessage } from '../../../utils/toast.utils';
import { cepExists, cepValid, cpfValid, emailValid, phoneValid } from '../../../utils/validator.utils';

const ClienteForm = ({
    isEdit = false,
    clienteProp = Cliente(),
    }) => {

    const navigate = useNavigate();
    const [cliente, setCliente] = useState(clienteProp)
    const { Blocking, Unblocking } = useBlocking();

    const updateState = (data) => {
        setCliente(prevCliente => {
            return {
                ...prevCliente,
                ...data,
            }
        })
    }

    const handleFormChange = (evt, mask) => {
        if (!evt){
            return;
        }
        let value = mask ? mask(evt.target.value) : evt.target.value;
        updateState({[evt.target.name]: value})
    }

    const handleFormCEPChange = (evt, mask) => {
        if (!evt){
            return;
        }
        let cep = evt.target.value;
        if(cepValid(cep)){
            Blocking()
            CEPService.GetCEPInfo(cep).then((result) => {
                if (result.erro){
                    showErrorMessage("O CEP informado não existe!")
                    updateState({endereco: ''})
                    return;
                }
                updateState({endereco: result.logradouro})
            }).finally(() => {
                Unblocking()
            })
        }else {
            updateState({endereco: ''})
        }
        handleFormChange(evt, mask)
    }

    const handleBack = () => {
        navigate('/cliente')
    }

    const CreateCliente = () => {
        Blocking()
        ClienteService.CreateCliente(cliente).then((result) => {
            if (result.success){
                showSuccessMessage(result.message)
                handleBack();
                return;
            }
            showErrorMessage(result.message)
        }).finally(() => {
            Unblocking()
        });
    }

    const UpdateCliente = () => {
        Blocking()
        ClienteService.UpdateCliente(cliente.id, cliente).then((result) => {
            if (result.success){
                showSuccessMessage(result.message)
                handleBack();
                return;
            }
            showErrorMessage(result.message)
        }).finally(() => {
            Unblocking()
        });
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        if (!(await isValid())){
            return;
        }
        if (isEdit){
            UpdateCliente();
        }else{
            CreateCliente();
        }
    }

    const isValid = async () => {
        if(!cpfValid(cliente.cpf)){
            showErrorMessage("CPF Inválido!")
            return false;
        }
        if(!cepValid(cliente.cep)){
            showErrorMessage("CEP Inválido!")
            return false;
        }
        if(!emailValid(cliente.email)){
            showErrorMessage("Email Inválido!")
            return false;
        }
        if(!phoneValid(cliente.telefone)){
            showErrorMessage("Telefone Inválido!")
            return false;
        }
        let cepNaoExiste = !(await cepExists(cliente.cep))
        if(cepNaoExiste){
            showErrorMessage("O CEP informado não existe!")
            return false;
        }
        return true;
    } 

    const formFilled = () => {
        return (
            !!cliente.cpf &&
            !!cliente.cep &&
            !!cliente.email &&
            !!cliente.nome &&
            !!cliente.telefone &&
            !!cliente.endereco
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
                        xs={3}
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
                            onChange={(evt) => handleFormChange(evt, cpfMask)} />
                    </Grid>
                    <Grid
                        item
                        sx={{
                            padding: 3
                        }}
                        xs={3}
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
                            onChange={(evt) => handleFormCEPChange(evt, cepMask)} />
                    </Grid>
                    <Grid
                        item
                        sx={{
                            padding: 3
                        }}
                        xs={3}
                    >
                        <InputLabel
                            sx={{
                                color: "black",
                                paddingBottom: 1,
                            }}
                        >
                            Endereço
                        </InputLabel>
                        <TextField
                            id="endereco"
                            name="endereco"
                            variant="outlined"
                            fullWidth
                            autoComplete='off'
                            value={cliente.endereco}
                            disabled
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
                            Email
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
                            onChange={(evt) => handleFormChange(evt, phoneMask)} />
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