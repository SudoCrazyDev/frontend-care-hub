import React, { useEffect } from "react";
import { setLinks, setLoading, setPatients, setInitialPatients } from "./slicers/patientsSlice";
import { useDispatch } from "react-redux";
import Axios  from 'axios';

export default function ReduxInitialize({children}){
    const dispatch = useDispatch();

    const handleFetchPatients = () => {
        dispatch(setLoading(true));
        Axios.get(`patients/get_patients`)
        .then(res => {
            dispatch(setPatients(res.data.data));
            dispatch(setInitialPatients(res.data.data));
            dispatch(setLinks(res.data.links))
        })
        .finally(()=>{
            dispatch(setLoading(false));
        })
    };

    useEffect(()=>{
        handleFetchPatients();
    },[]);

    return(
        <>
            {children}
        </>
    );
};