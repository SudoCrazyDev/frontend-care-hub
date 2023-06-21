import React, { useState } from "react";
import OutputIcon from '@mui/icons-material/Output';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip } from "@mui/material";
import OutPatientForm from "./OutPatient.form";

export default function OutPatientModal({appointment}){
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
            <DialogContent dividers>
                <OutPatientForm appointment={appointment}/>
            </DialogContent>
            <DialogActions className="p-3">
                <Button variant="contained" color="primary">Bill-Out</Button>
                <Button variant="contained" color="error" onClick={handleModalOpen}>Cancel</Button>
            </DialogActions>
        </Dialog>
        </>
    );
};