import React, { useState } from "react";
import OutputIcon from '@mui/icons-material/Output';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip } from "@mui/material";
import OutPatientForm from "./OutPatient.form";
import InitializeFormik from "./OutPatient.DAL";
import { submittingLoading } from "../../../helpers/HelperFunctions";

export default function OutPatientModal({appointment}){
    const formik = InitializeFormik();
    const [open, setOpen] = useState(false);

    const handleModalOpen = () => {
        setOpen(!open);
    };

    return(
        <>
        <Tooltip title="Out Patient">
            <IconButton color="primary" onClick={handleModalOpen}>
                <OutputIcon/>
            </IconButton>
        </Tooltip>
        <Dialog open={open} fullScreen scroll="paper">
            <DialogTitle className="fw-bold text-uppercase">OUT PATIENT - {`${appointment.patient.firstname} ${appointment.patient.lastname}`}</DialogTitle>
            <form onSubmit={formik.handleSubmit}>
            <DialogContent dividers>
                <OutPatientForm appointment={appointment} formik={formik}/>
            </DialogContent>
            <DialogActions className="p-3">
                <Button type="submit" variant="contained" color="primary" disabled={!formik.isValid || formik.isSubmitting}>Bill-Out {submittingLoading(formik)}</Button>
                <Button variant="contained" color="error" onClick={handleModalOpen}>Cancel</Button>
            </DialogActions>
            </form>
        </Dialog>
        </>
    );
};