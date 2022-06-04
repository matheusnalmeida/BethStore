import { TextField } from '@mui/material'
import React from 'react'
import NumberFormat from 'react-number-format'
import { numberFormatInputMask } from '../utils/mask.utils'

function CustomPriceInput({
    sx = {},
    value = '',
    InputProps = {},
    onValueChange = (evt, mask) => {return true}
}) {
    return (
        <NumberFormat
            thousandSeparator={true}
            decimalScale={2}
            prefix={'R$'}
            value={value}
            onValueChange={(_, source) => onValueChange(source.event, numberFormatInputMask)}
            customInput={TextField}
            InputProps={{
                ...InputProps,
                variant: "outlined",
                autoComplete: 'off'
            }}
            sx={sx}
        />
    )
}

export default CustomPriceInput