import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from "@mui/material";
import LabRequestForm from "./LabRequest.form";

export default function LabRequest(){
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(!showModal);
    };

    return(
        <>
        <Button variant="contained" color="primary" onClick={handleShowModal}>Request Laboratory</Button>
        <Dialog open={showModal} onClose={handleShowModal} maxWidth="md" fullWidth>
            <DialogTitle className="fw-bolder">Request Laboratory</DialogTitle>
            <Divider />
            <DialogContent>
                <LabRequestForm />
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={handleShowModal}>Submit</Button>
                <Button variant="contained" className="bg-secondary" onClick={handleShowModal}>Cancel</Button>
            </DialogActions>
        </Dialog>
        </>
    );
};