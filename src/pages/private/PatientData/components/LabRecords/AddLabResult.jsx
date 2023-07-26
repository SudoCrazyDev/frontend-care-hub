import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";
import InitializeFormik from "./AddLabRequest.DAL";
import LabRequestForm from "../LabRequest/LabRequest.form";
import AddLabRequestForm from "./AddLabRequest.Form";
import { CHButton } from "../../../../../components/CHButtons/CareHubButtons";
import { submittingLoading } from "../../../../../helpers/HelperFunctions";

export default function AddLaboratoryResult({patientData, setLabResults}){
    const [open, setOpen] = useState(false);
    const formik = InitializeFormik(patientData, setLabResults);

    const handleOpenModal = () => {
        setOpen(!open);
    };

    useEffect(() => {
        if(!formik.isSubmitting){
            formik.resetForm();
            setOpen(false);
        }
    }, [formik.isSubmitting]);

    return(
        <>
            <CHButton variant="contained" className="fw-bold" onClick={handleOpenModal}>
                Add Lab Results
            </CHButton>
            <Dialog open={open} maxWidth="md" fullWidth>
                <form onSubmit={formik.handleSubmit}>
                    <DialogTitle className="fw-bolder">New Lab Results</DialogTitle>
                    <DialogContent dividers>
                        <AddLabRequestForm formik={formik} />
                    </DialogContent>
                    <DialogActions className="p-2">
                        <Button variant="contained" color="primary" type="submit" disabled={formik.isSubmitting}>
                            Save {submittingLoading(formik)}
                        </Button>
                        <Button variant="contained" color="error" onClick={() => handleOpenModal()}>
                            Cancel
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};