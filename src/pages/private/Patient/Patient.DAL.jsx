import React from "react";
import { useFormik } from "formik"; 
import * as yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addPatient } from "../../../redux/slicers/patientsSlice";
import { useNotification } from "../../../helpers/CustomHooks";

const patientValidationSchema = yup.object().shape({
    firstname: yup.string().required("Firstname required"),
    middlename: yup.string().nullable(),
    lastname: yup.string().required("Lastname required"),
});

const initialValues = {
    firstname: '',
    middlename: '',
    lastname: '',
    birthdate: "",
    address: '',
    gender: 'male',
    civil_status: 'single',
    religion: '',
    occupation: '',
    contact_number: '',
};
export default function InitializeFormik(){
    const dispatch = useDispatch();
    const { handleNotification } = useNotification();

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
        onSubmit: handleNewSubmit
    });

    return formik;
};