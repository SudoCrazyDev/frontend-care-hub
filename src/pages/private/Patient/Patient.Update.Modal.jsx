import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import PatientForm from "./Patient.form";
import { CHButton, CHTableIconButton } from "../../../components/CHButtons/CareHubButtons";
import InitializeFormik from "./Patient.DAL";
import { submittingLoading } from "../../../helpers/HelperFunctions";
import CreateIcon from '@mui/icons-material/Create';

export default function PatientUpdateModal({patient}){
    const [open, setOpen] = useState(false);
    const formik = InitializeFormik('update', patient);

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
            <Tooltip title="Update Patient Information" onClick={handleOpenModal}>
                <CHTableIconButton size="small">
                    <CreateIcon className="ch-primary"/>
                </CHTableIconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleCloseModal} maxWidth={'md'} fullWidth={true}>
            <DialogTitle className="fw-bolder">Update Patient Data</DialogTitle>
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