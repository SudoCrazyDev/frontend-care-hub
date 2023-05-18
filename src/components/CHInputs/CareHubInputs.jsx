import { TextField } from '@mui/material';
import React from 'react';

export const FilterTextInput = ({...props}) => {
    return(
        <TextField variant='outlined' className='my-2' {...props} />
    );
};


