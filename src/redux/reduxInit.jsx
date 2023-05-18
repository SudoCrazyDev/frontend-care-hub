import React, { useEffect } from "react";
import { setPatients } from "./slicers/patientsSlice";
import { useDispatch, useSelector } from "react-redux";
import { GenerateFakePatients } from "../helpers/models/Patient.Model";

export default function ReduxInitialize({children}){
    const dispatch = useDispatch();
    const { patients } = useSelector(state => state.patients);

    const handleFetchPatients = () => {
        const patients = GenerateFakePatients(20);
        dispatch(setPatients(patients));
    };

    useEffect(()=>{
        if(patients.length === 0){
            handleFetchPatients();
        }
    },[]);

    return(
        <>
            {children}
        </>
    );
};