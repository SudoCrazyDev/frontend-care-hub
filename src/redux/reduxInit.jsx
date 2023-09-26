import React, { useEffect, useState } from "react";
import { setLinks, setLoading, setPatients, setInitialPatients } from "./slicers/patientsSlice";
import { useDispatch } from "react-redux";
import Axios  from 'axios';
import { setInitialMedicines, setMedicines, setLoadingMedicine } from "./slicers/medicinesSlice";
import { setLoadingMedicineBrands, setMedicineBrands, setMedicineBrandsLinks } from "./slicers/medicineBrandsSlice";
import { setMedicineUnits, setMedicineUnitsLinks } from "./slicers/medicineUnitsSlice";
import SplashScreen from "../pages/SplashScreen";

export default function ReduxInitialize({children}){
    const [open, setOpen] = useState(true);
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
            dispatch(setInitialMedicines(res.data.data));
        })
        .finally(() => {
            dispatch(setLoadingMedicine(false));
        });
    };

    const handleFetchMedicineBrands = () => {
        dispatch(setLoadingMedicineBrands(true));
        Axios.get('medicines/get_medicine_brands')
        .then(res => {
            dispatch(setMedicineBrands(res.data));
        })
        .finally(() => {
            dispatch(setLoadingMedicineBrands(false));
        });
    };
    
    const handleFetchMedicineUnits = () => {
        Axios.get('medicines/get_medicine_units')
        .then(res => {
            dispatch(setMedicineUnits(res.data));
        })
        .finally(() => {
            setOpen(false);
        });
    };
    
    useEffect(()=>{
        handleFetchPatients();
        handleFetchMedicines();
        handleFetchMedicineBrands();
        handleFetchMedicineUnits();
    },[]);

    return(
        <>
            <SplashScreen open={open} />
            {children}
        </>
    );
};