import { Box, Typography } from '@mui/material';
import { React, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/categoria/categoria.css';

const CategoriaUpdate = (props) => {
    const params = useParams();

    useEffect(() => {
    }, []);

    return (
        <Box sx={{
            textAlign: "center"
        }}>
            <Typography mt={15} variant="h4">EDIT CATEGORIA {params.id}!</Typography>
        </Box>
    );
}

export default CategoriaUpdate;