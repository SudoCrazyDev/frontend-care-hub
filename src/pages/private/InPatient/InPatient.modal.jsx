import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { CHButton } from "../../../components/CHButtons/CareHubButtons";
import { useState } from "react";
import InPatientForm from "./InPatient.form";

export default function InPatientModal(){
    const [open, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(!open);
    };
    return(
        <div className="ms-auto">
            <CHButton variant="contained" color="primary" size="medium" onClick={handleShowModal}>New In-Patient</CHButton>
            <Dialog open={open} maxWidth="md" fullWidth={true} onClose={handleShowModal}>
                <DialogTitle>New In-Patient</DialogTitle>
                <DialogContent>
                    <InPatientForm />
                </DialogContent>
                <DialogActions>
                    <CHButton variant="contained" color="primary" size="medium">Save</CHButton>
                    <CHButton variant="contained" color="error" size="medium">Cancel</CHButton>
                </DialogActions>
            </Dialog>
        </div>
    );
};