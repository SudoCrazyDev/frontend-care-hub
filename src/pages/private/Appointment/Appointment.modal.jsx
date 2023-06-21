import { Dialog, DialogTitle, Button, DialogContent, DialogActions, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import AppointmentForm from "./Appointment.form";
import { CHButton } from "../../../components/CHButtons/CareHubButtons";
import InitializeFormik from "./Appointment.DAL";
import { submittingLoading } from "../../../helpers/HelperFunctions";

export default function AppointmentModal({patientData, setAppointments}){
    const [open, setOpen] = useState(false);
    const formik = InitializeFormik(patientData, setAppointments);

    const handleOpenModal = () => {
        setOpen(true);
    };

    const handleCloseModal = () => {
        formik.resetForm();
        setOpen(false);
    };

    useEffect(()=>{
        if(!formik.isSubmitting){
            formik.resetForm();
            setTimeout(()=>{setOpen(false)}, 1500);
        }
    },[formik.isSubmitting]);

    return(
        <>
        <CHButton variant="contained" color="primary" className="fw-bold" onClick={handleOpenModal}>New Appointment</CHButton>
        <Dialog open={open} maxWidth="md" fullWidth={true} scroll="paper">
            <DialogTitle>New Appointment</DialogTitle>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent dividers={true}>
                    <AppointmentForm formik={formik} patient={patientData}/>
                </DialogContent>
                <DialogActions className="p-3">
                    <Button variant="contained" className="btn bg-primary" type="submit" disabled={!formik.isValid || formik.isSubmitting}>Save {submittingLoading(formik)}</Button>
                    <Button variant="contained" className="btn bg-danger" onClick={handleCloseModal}>Cancel</Button>
                </DialogActions>
            </form>
        </Dialog>
        </>
    );
};