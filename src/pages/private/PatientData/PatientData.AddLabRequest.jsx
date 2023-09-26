import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from "@mui/material";
import { useFormik } from "formik";
import LabRequestForm from "./components/LabRequest/LabRequest.form";
import { CHButton } from "../../../components/CHButtons/CareHubButtons";
import { useNotification } from "../../../helpers/CustomHooks";
import axios from "axios";


export default function PatientDataAddLabRequest({patientData, setLabResults}){
    const [showModal, setShowModal] = useState(false);
    const { handleNotification } = useNotification();
    
    const handleShowModal = () => {
        setShowModal(!showModal);
    };
    
    const handleSave = () => {
        setShowModal(false);
    };
    
    const handleSubmit = (values) => {
        values['lab_request'] = JSON.stringify(values["lab_request"]);
        axios.post(`patients/insert_laboratory_request`, values)
        .then(res => {
            setLabResults(res.data);
            handleNotification('success', 'Laboratory Request Added');
            setTimeout(() => {
                formik.resetForm();
                setShowModal(false);
            }, 1500);
        });
    };
    
    const formik = useFormik({
        initialValues:{
            lab_request: [],
            patient_id: patientData.id
        },
        onSubmit: handleSubmit,
    });

    return(
        <>
        <CHButton variant="contained" className="fw-bolder" onClick={handleShowModal}>
            Add Lab Request
        </CHButton>
        <Dialog open={showModal} onClose={handleShowModal} maxWidth="md" fullWidth>
            <DialogTitle className="fw-bolder">Request Laboratory</DialogTitle>
            <Divider />
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                    <LabRequestForm formik={formik}/>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" type="submit" disabled={formik.isSubmitting}>Submit</Button>
                    <Button variant="contained" className="bg-secondary" onClick={handleShowModal}>Cancel</Button>
                </DialogActions>
            </form>
        </Dialog>
        </>
    );
};