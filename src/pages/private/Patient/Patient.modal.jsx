import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from "@mui/material";
import { useState } from "react";
import PatientForm from "./Patient.form";
import { CHButton } from "../../../components/CHButtons/CareHubButtons";

export default function PatientModal(){
    const [open, setOpen] = useState(false);

    const handleOpenModal = () => {
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };
    
    return(
        <>
            <CHButton variant="contained" color="primary" size="medium" onClick={handleOpenModal}>
                New Patient
            </CHButton>
            <Dialog open={open} onClose={handleCloseModal} maxWidth={'md'} fullWidth={true}>
            <DialogTitle className="fw-bolder">New Patient</DialogTitle>
            <Divider />
            <form>
                <DialogContent>
                    <PatientForm />
                </DialogContent>
                <Divider />
                <DialogActions className="p-4 shadow">
                    <Button variant="contained" color="primary" size="medium" onClick={handleCloseModal}>Save</Button>
                    <Button variant="contained" color="error" size="medium" onClick={handleCloseModal}>Cancel</Button>
                </DialogActions>
            </form>
            </Dialog>
        </>
    );
};