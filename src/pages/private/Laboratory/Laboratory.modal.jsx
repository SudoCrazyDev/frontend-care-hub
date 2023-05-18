import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from "@mui/material";
import { useState } from "react";
import LaboratoryForm from "./Laboratory.form";
import { CHButton } from "../../../components/CHButtons/CareHubButtons";

export default function LaboratoryModal(){
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return(
    <>
    <CHButton variant="contained" color="primary" className="fw-bold" onClick={handleOpenModal}>
        NEW LABORATORY RESULT
    </CHButton>
    <Dialog open={showModal} fullScreen={true} onClose={handleCloseModal}>
        <DialogTitle className="fw-bolder">NEW LABORATORY RESULT</DialogTitle>
        <Divider />
        <DialogContent>
            <LaboratoryForm />
        </DialogContent>
        <Divider />
        <DialogActions>
            <div className="d-flex flex-row ml-auto" style={{ gap: '10px'}}>
                <Button variant="contained" color="primary" className="fw-bold">SAVE</Button>
                <Button variant="contained" color="error" className="fw-bold" onClick={handleCloseModal}>CANCEL</Button>
            </div>
        </DialogActions>
    </Dialog>
    </>
    );
}