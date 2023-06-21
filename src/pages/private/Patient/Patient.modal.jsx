import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import PatientForm from "./Patient.form";
import { CHButton } from "../../../components/CHButtons/CareHubButtons";
import InitializeFormik from "./Patient.DAL";
import { submittingLoading } from "../../../helpers/HelperFunctions";

export default function PatientModal(){
    const [open, setOpen] = useState(false);
    const formik = InitializeFormik();

    const handleOpenModal = () => {
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };
    
    useEffect(()=>{
        if(!formik.isSubmitting){
            formik.resetForm();
            handleCloseModal();
        }
    },[formik.isSubmitting]);
    return(
        <>
            <CHButton variant="contained" color="primary" size="medium" onClick={handleOpenModal} className="fw-bold">
                New Patient
            </CHButton>
            <Dialog open={open} onClose={handleCloseModal} maxWidth={'md'} fullWidth={true}>
            <DialogTitle className="fw-bolder">New Patient</DialogTitle>
            <Divider />
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                    <PatientForm formik={formik}/>
                </DialogContent>
                <Divider />
                <DialogActions className="p-4 shadow">
                    <Button variant="contained" color="primary" size="medium" type="submit" disabled={formik.isSubmitting || !formik.isValid}>Save {submittingLoading(formik)}</Button>
                    <Button variant="contained" color="error" size="medium" onClick={handleCloseModal}>Cancel</Button>
                </DialogActions>
            </form>
            </Dialog>
        </>
    );
};