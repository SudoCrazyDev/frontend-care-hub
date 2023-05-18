import React from "react";
import { useFormik } from "formik"; 
import * as yup from "yup";

const patientValidationSchema = yup.object({
    firstname: yup.string().required("Firstname is required"),
    middlename: yup.string().nullable(),
    lastname: yup.string().required("Lastname is required"),

});

const initialValues = {
    firstname: '',
    middlename: '',
    lastname: '',
    birthdate: new Date().toISOString(),
    address: '',
    gender: 'Male',
    civil_status: 'Single',
    religion: '',
    occupation: '',
    contact_number: '',
};
export default function InitializeFormik(){

    const handleNewSubmit = (values) => {
        console.log(values);
    };

    const formik = useFormik({
        initialValues:initialValues,
        validationSchema:patientValidationSchema,
        onSubmit: handleNewSubmit
    });

    return formik;
};