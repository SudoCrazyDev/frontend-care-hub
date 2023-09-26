import { useFormik } from 'formik';
import React from "react";
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { setMedicines } from '../../../redux/slicers/medicinesSlice';
import { useNotification } from '../../../helpers/CustomHooks';
import axios from 'axios';

const validationSchema = Yup.object().shape({
    generic_name: Yup.string().required('Required'),
    brand_id: Yup.string().required('Required'),
    unit_id: Yup.string().required('Required'),
});

export default function InitializeFormik(type, medicine){
    const dispatch = useDispatch();
    const { handleNotification } = useNotification();

    const handleSubmitNew = (values) => {
        axios.post('medicines/insert_medicine', values)
        .then((res) => {
            dispatch(setMedicines(res.data.data));
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
            dispatch(setMedicines(res.data.data));
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
        initialValues:{
            generic_name: type === 'new' ? '' : medicine.generic_name,
            description: type === 'new'? '' : medicine.description,
            unit_id: type === 'new' ? '' : medicine.unit.unit_name,
            brand_id: type === 'new' ? '' : medicine.brand.brand_name
        },
        validationSchema: validationSchema,
        onSubmit: type === 'new' ? handleSubmitNew : handleSubmitUpdate
    });

    return formik;
};