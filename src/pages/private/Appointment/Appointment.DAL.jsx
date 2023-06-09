import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNotification } from "../../../helpers/CustomHooks";
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    blood_pressure: yup.string().required("Required"),
    weight: yup.string().required("Required"),
    heart_rate: yup.string().required("Required"),
    temperature: yup.string().required("Required"),
});

export default function InitializeFormik(patient, setAppointments){
    const { handleNotification } = useNotification();

    const handleFormikSubmit = (values) => {

        if(values.has_lab_request){
            values['lab_request'].blood_chemistry = JSON.stringify(values["lab_request"].blood_chemistry)
            values['lab_request'].xray = JSON.stringify(values["lab_request"].xray);
        }
        
        axios.post('appointments/insert_appointment', values)
        .then(res => {
            handleNotification("success", 'Appointment created successfully');
            setAppointments(res.data.appointments);
        })
        .catch(err => {
            handleNotification("success", 'An Error Occured');
        })
        .finally(() =>{
            formik.setSubmitting(false);
        });
    };

    const formik = useFormik({
        initialErrors:{
            consultation_date: ""
        },
        initialValues:{
            consultation_date: new Date(),
            patient_id: patient?.id ? patient.id : 0,
            patient_name: patient ? `${patient.firstname} ${patient.lastname}` : "",
            blood_pressure : "",
            weight: "",
            heart_rate: "",
            temperature: "",
            chief_complaint: "",
            has_lab_request: 0,
            lab_request_id: 0,
            status: "pending",
        },
        validationSchema: validationSchema,
        onSubmit: handleFormikSubmit,
    });

    return formik;
};