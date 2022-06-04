import { Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';
import ClienteService from '../../services/cliente.service'

const Carrinho = () => {
    const navigate = useNavigate();

    const navigateTo = (path) => {
        navigate(path)
    }

    return (
        <Grid container>
            <Grid 
            item xs={8}>
                
            </Grid>
        </Grid>
    );
}

export default Carrinho;