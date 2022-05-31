import React from 'react'
import '../../styles/homepage/homepage.css'
import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';

const Home = () => {

    return (
        <Grid
            container
            direction={'column'}
            alignContent={'center'}
            justifyContent={'center'}
            className="homepage"
            spacing={2}>
            <Box sx={{
                textAlign: "center"
            }}>
                <Typography variant="h4">Bem vindo a Beth Store!</Typography>
                <Typography variant="h6">O que deseja fazer?</Typography>
            </Box>
        </Grid>

    );
}

export default Home;