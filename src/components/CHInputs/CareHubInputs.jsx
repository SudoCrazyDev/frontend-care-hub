import { TextField, InputAdornment } from '@mui/material';
import React from 'react';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import SearchIcon from '@mui/icons-material/Search';

export const FilterTextInput = ({...props}) => {
    return(
        <TextField 
        variant='outlined' 
        className='my-2' 
        fullWidth 
        {...props} 
        InputProps={{
            endAdornment: <InputAdornment position="end"><SearchIcon /></InputAdornment>,
        }}
        />
    );
};

export const CHDatePicker = ({label = 'Date Filter'}) => {
    return(
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                label={label}
                className="w-100 my-2"
                />
            </LocalizationProvider>
    );
};


