import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const CustomCircularProgress = () => {
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '250px'
        }}>
            <CircularProgress />
        </Box>
    )
}

export default CustomCircularProgress