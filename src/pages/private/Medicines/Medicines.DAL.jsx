import { useFormik } from 'formik';
import React from "react";
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { setMedicines } from '../../../redux/slicers/medicinesSlice';
import { useNotification } from '../../../helpers/CustomHooks';
import axios from 'axios';

const validationSchema = Yup.object().shape({
    unit: Yup.string().required('Required'),
    name: Yup.string().required('Required'),
});

export default function InitializeFormik(type, medicine){
    const dispatch = useDispatch();
    const { handleNotification } = useNotification();

    const handleSubmitNew = (values) => {
        axios.post('medicines/insert_medicine', values)
        .then((res) => {
            dispatch(setMedicines(res.data));
            handleNotification('success', 'Medicine added successfully');
        })
        .catch((err) => {
            handleNotification('error', 'Error Saving Medicine');
        })
        .finally(() => {
            formik.setSubmitting(false)
        });
    };

    const handleSubmitUpdate = (values) => {
        axios.put(`medicines/update_medicine/${medicine.id}`, values)
        .then((res) => {
            dispatch(res.data);
            handleNotification('success', 'Medicine updated successfully');
        })
        .catch(err => {
            handleNotification('error', 'Error Updating Medicine');
        })
        .finally(() => {
            formik.setSubmitting(false)
        });
    };

    const formik = useFormik({
        initialErrors:{
            name: 'Required'
        },
        initialValues:{
            name: type === 'new' ? '' : medicine.name,
            unit: type === 'new' ? '' : medicine.unit,
        },
        validationSchema: validationSchema,
        onSubmit: type === 'new' ? handleSubmitNew : handleSubmitUpdate
    });

    return formik;
};