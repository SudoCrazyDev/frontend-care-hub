import { Dialog, DialogTitle, Button, DialogContent } from "@mui/material";
import { useState } from "react";
import AppointmentForm from "./Appointment.form";
import { CHButton } from "../../../components/CHButtons/CareHubButtons";
export default function AppointmentModal(){
    const [open, setOpen] = useState(false);

    const handleOpenModal = () => {
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    return(
        <>
        <CHButton variant="contained" color="primary" className="fw-bold" onClick={handleOpenModal}>New Appointment</CHButton>
        <Dialog open={open} onClose={handleCloseModal} maxWidth="md" fullWidth={true}>
            <DialogTitle>New Appointment</DialogTitle>
            <DialogContent>
                <AppointmentForm />
            </DialogContent>
        </Dialog>
        </>
    );
};