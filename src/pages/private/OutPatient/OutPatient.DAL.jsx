import { useFormik } from "formik";
import React from "react";
import * as yup from 'yup';
import axios from "axios";
import { useNotification } from "../../../helpers/CustomHooks";

const validationSchema = yup.object().shape({
    significant_findings: yup.string().required('Significant Findings is required'),
});

export default function InitializeFormik(appointment, setAppointments){
    const { handleNotification } = useNotification();

    const handleSubmit = (values) => {
        values['parsed_medicines'] = JSON.stringify(values['medicines']);
        axios.post('out_patients/insert_outpatient', values)
        .then(res => {
            handleNotification('success', 'Out Patient Created Successfull');
            setAppointments(res.data);
        })
        .finally(()=>{
            formik.setSubmitting(false);
        });
    };

    const formik = useFormik({
        initialValues:{
            appointment_id: appointment.id,
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