import React from "react";
import { useFormik } from "formik"; 
import * as yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addPatient, setPatients } from "../../../redux/slicers/patientsSlice";
import { useNotification } from "../../../helpers/CustomHooks";

const patientValidationSchema = yup.object().shape({
    firstname: yup.string().required("Firstname required"),
    middlename: yup.string().nullable(),
    lastname: yup.string().required("Lastname required"),
});

export default function InitializeFormik(type, patient){
    const dispatch = useDispatch();
    const { handleNotification } = useNotification();

    const initialValues = {
        firstname: type === 'update' ? patient.firstname : '',
        middlename: type === 'update' ? patient.middlename : '',
        lastname: type === 'update' ? patient.lastname : '',
        birthdate: type === 'update' ? patient.birthdate : new Date().toLocaleDateString('en-CA'),
        address: type === 'update' ? patient.address : '',
        gender: type === 'update' ? String(patient.gender).toLowerCase() : 'male',
        civil_status: type === 'update' ? String(patient.civil_status).toLowerCase() : 'single',
        religion: type === 'update' ? patient.religion : '',
        occupation: type === 'update' ? patient.occupation : '',
        contact_number: type === 'update' ? patient.contact_number : '',
        photo_url: type === 'update' ? patient.photo_url : ''
    };
    
    const handleUpdateSubmit = (values) => {
        axios.put(`patients/update_patient/${patient.id}`, values)
        .then(({data}) => {
            dispatch(setPatients(data.data));
            handleNotification("success", "Patient Updated successfully");
        })
        .catch(err => {
            console.log(err);
        })
        .finally(()=>{
            formik.setSubmitting(false);
        })
    };
    
    const handleNewSubmit = (values) => {
        axios.post('patients/insert_patient', values)
        .then(res => {
            dispatch(addPatient(res.data));
            handleNotification("success", "Patient saved successfully");
        })
        .catch(err => {
            console.log(err);
        })
        .finally(()=>{
            formik.setSubmitting(false);
        })
    };

    const formik = useFormik({
        initialValues:initialValues,
        validationSchema:patientValidationSchema,
        enableReinitialize: true,
        onSubmit: type === 'update' ? handleUpdateSubmit : handleNewSubmit
    });

    return formik;
};