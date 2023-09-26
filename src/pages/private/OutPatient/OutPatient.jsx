import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip } from "@mui/material";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import { useEffect, useState } from "react";
import OutPatientContent from "./OutPatient.form";
import InitializeFormik from "./components/OutPatient.DAL";

export default function OutPatient({appointment, setAppointments}){
    const [open, setOpen] = useState(false);
    const formik = InitializeFormik(appointment, setAppointments);
    
    const handleClickModal = () => {
        setOpen(!open);
    };
    
    useEffect(() => {
        if(!formik.isSubmitting){
            formik.resetForm();
            setTimeout(() => {
                setOpen(false);
            }, 1500);
        }
    },[formik.isSubmitting]);
    
    return(
        <>
        <Tooltip title="Cater Out-Patient">
            <IconButton color="primary" onClick={handleClickModal}>
                <MonitorHeartIcon />
            </IconButton>
        </Tooltip>
        <Dialog open={open} fullScreen>
            <DialogTitle className="fw-bolder text-uppercase">Appointment - {appointment.patient.lastname}, {appointment.patient.firstname}</DialogTitle>
            <form className="h-100" onSubmit={(e) => {e.preventDefault(); formik.handleSubmit();}}>
                <DialogContent dividers className="h-100">
                    <OutPatientContent formik={formik} appointment={appointment} />
                </DialogContent>
                <DialogActions className="p-3">
                    <Button disabled={formik.isSubmitting} variant="contained" type="submit">Save</Button>
                    <Button variant="contained" color="error" onClick={handleClickModal}>Cancel</Button>
                </DialogActions>
            </form>
        </Dialog>
        </>
    );
};