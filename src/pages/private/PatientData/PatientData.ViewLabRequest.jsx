import React, { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Dialog, DialogActions, DialogContent, DialogTitle, Tooltip } from "@mui/material";
import { CHTableIconButton } from "../../../components/CHButtons/CareHubButtons";
import LabRequestForm from "./components/LabRequest/LabRequest.form";

export default function ViewLabRequest(){
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(!showModal);
    };

    return(
        <>
        <Tooltip title="View Request">
            <CHTableIconButton size="small" color="primary" onClick={handleShowModal}>
                <VisibilityIcon />
            </CHTableIconButton>
        </Tooltip>
        <Dialog open={showModal} onClose={handleShowModal} fullWidth maxWidth="md">
            <DialogTitle>View Lab Request</DialogTitle>
            <DialogContent>
                <LabRequestForm />
            </DialogContent>
            <DialogActions>

            </DialogActions>
        </Dialog>
        </>
    );
};