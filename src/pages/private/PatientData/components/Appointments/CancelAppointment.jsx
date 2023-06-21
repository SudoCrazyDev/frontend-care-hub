import { Button, Dialog, DialogActions, DialogTitle, Divider, IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import { submittingLoading } from "../../../../../helpers/HelperFunctions";
import axios from "axios";
import { useNotification } from '../../../../../helpers/CustomHooks';

export default function CancelAppointment({appointment, setAppointments}){
    const [open, setOpen] = useState(false);
    const [formik, setFormik] = useState({isSubmitting: false});
    const { handleNotification } = useNotification();

    const handleClickModal = () => {
        setOpen(!open);
    };

    const handleSubmit = () => {
        setFormik({isSubmitting: true});
        console.log(appointment);
        axios.put(`appointments/cancel_appointment/${appointment.id}`, {patient_id: appointment.patient_id})
        .then(res => {
            handleNotification('success', 'Appointment Cancelled');
            setAppointments(res.data.appointments);
            setTimeout(()=>{
                setOpen(!open)
            },1500);
        })
        .catch(err => {
            handleNotification('error', 'An Error Occured');
        })
        .finally(() => {
            setFormik({isSubmitting: false});
        });
    };

    const handleCancel = () => {
        setFormik({isSubmitting: false});
        setOpen(!open);
    };

    return(
        <>
        <Tooltip title="Cancel Appointment">
            <IconButton color="error" onClick={handleClickModal}>
                <CancelIcon />
            </IconButton>
        </Tooltip>
        <Dialog open={open} maxWidth="md" fullWidth>
        <DialogTitle>Are you sure you want to cancel this appointment?</DialogTitle>
        <Divider />
        <DialogActions className="p-3">
            <Button variant="contained" color="primary" onClick={handleSubmit} disabled={formik.isSubmitting}>Save {submittingLoading(formik)}</Button>
            <Button variant="contained" color="error" onClick={handleCancel}>Cancel</Button>
        </DialogActions>
        </Dialog>
        </>
    );
};