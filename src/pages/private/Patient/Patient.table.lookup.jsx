import React, { useState } from "react";
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setPatients } from "../../../redux/slicers/patientsSlice";

export default function PatientLookup(){
    const [keyword, setKeyword] = useState('');
    const [isError, setIsError] = useState(false);
    const [clearable, setClearable] = useState(false);
    const { initialPatients } = useSelector(state => state.patients);
    const dispatch = useDispatch();

    const handleChange = (event) => {
        if(clearable){
            setClearable(false);
        }

        if(isError){
            setIsError(false);
        }

        setKeyword(event.target.value);
    };

    const handleClear = () => {
        setClearable(false);
        setKeyword('');
        dispatch(setPatients(initialPatients))
    };

    const handleSearch = () => {
        setClearable(true);
        if(keyword === ''){
            setIsError(true);
            return
        }
        dispatch(setLoading(true));
        axios.get(`patients/lookup/${keyword}`)
        .then(res => {
            dispatch(setPatients(res.data))
        })
        .finally(()=>{
            dispatch(setLoading(false));
        })
    };

    return(
        <TextField
            error={isError}
            variant='outlined'
            className='my-2'
            fullWidth
            size="lg"
            type="text"
            label="Patient Name"
            value={keyword}
            onChange={handleChange}
            InputProps={{
                endAdornment: <InputAdornment position="end">
                    {clearable ? <ClearIcon onClick={handleClear}/> : <SearchIcon onClick={handleSearch}/>}
                </InputAdornment>,
            }}
        />
    )
}