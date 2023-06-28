import { useFormik } from "formik";
import React from "react";
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    significant_findings: yup.string().required('Significant Findings is required'),
});

export default function InitializeFormik(){
    
    const handleSubmit = (values) => {
        console.log(values);
    };

    const formik = useFormik({
        initialValues:{
            appointment_id: 0,
            has_lab_request: 0,
            significant_findings: '',
            professional_fee: 0,
            medicines: []
        },
        validationSchema: validationSchema,
        onSubmit: handleSubmit
    });

    return formik;
};