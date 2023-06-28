import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from "@mui/material";
import LabRequestForm from "./LabRequest.form";


export default function LabRequest({formik, type}){
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(!showModal);
    };
    
    const handleSave = () => {
        formik.setFieldValue('has_lab_request', 1);
        setShowModal(false);
    };

    return(
        <>
        <Button variant="contained" color="primary" onClick={handleShowModal} hidden={Boolean(formik.values.has_lab_request)}>{type} Lab Request</Button>
        <Dialog open={showModal} onClose={handleShowModal} maxWidth="md" fullWidth>
            <DialogTitle className="fw-bolder">Request Laboratory</DialogTitle>
            <Divider />
            <DialogContent>
                <LabRequestForm formik={formik}/>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={handleSave}>Submit</Button>
                <Button variant="contained" className="bg-secondary" onClick={handleShowModal}>Cancel</Button>
            </DialogActions>
        </Dialog>
        </>
    );
};