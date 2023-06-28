import React, { useEffect } from "react";
import { setLinks, setLoading, setPatients, setInitialPatients } from "./slicers/patientsSlice";
import { useDispatch } from "react-redux";
import Axios  from 'axios';
import { setInitialMedicines, setMedicines, setLoadingMedicine } from "./slicers/medicinesSlice";

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

    const handleFetchMedicines = () => {
        dispatch(setLoadingMedicine(true));
        Axios.get('medicines/get_all_medicines')
        .then(res => {
            dispatch(setMedicines(res.data));
            dispatch(setInitialMedicines(res.data));
        })
        .finally(() => {
            dispatch(setLoadingMedicine(false));
        });
    };

    useEffect(()=>{
        handleFetchPatients();
        handleFetchMedicines();
    },[]);

    return(
        <>
            {children}
        </>
    );
};