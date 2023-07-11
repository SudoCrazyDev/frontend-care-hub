import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import CreateIcon from '@mui/icons-material/Create';
import InitializeFormik from "./Medicines.DAL";
import { submittingLoading } from "../../../helpers/HelperFunctions";
import { CHButton } from "../../../components/CHButtons/CareHubButtons";

export default function MedicineModal({type = 'new', medicine = {}}){
    const [open, setOpen] = useState(false);
    const formik = InitializeFormik(type, medicine);

    const handleOpenModal = () => {
        formik.resetForm();
        setOpen(!open);
    };

    useEffect(()=>{
        if(!formik.isSubmitting){
            formik.resetForm();
            setTimeout(()=>{setOpen(false)}, 1500);
        }
    },[formik.isSubmitting]);

    return(
        <>
        {type === 'new' ?
        <CHButton variant="contained" className="fw-bold" onClick={handleOpenModal}>
            Add New Medicine
        </CHButton>
        :
        <Tooltip title="Edit Medicine">
            <IconButton color="primary" size="small" onClick={handleOpenModal}>
                <CreateIcon />
            </IconButton>
        </Tooltip>
        }
        <Dialog open={open} maxWidth="sm" fullWidth>
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle className="fw-bold">New Medicine</DialogTitle>
                <DialogContent dividers>
                    
                        <div className="form-group d-flex flex-row flex-wrap justify-content-center gap-3">
                            <div className="col-12 d-flex flex-row justify-content-center">
                                <TextField error={Boolean(formik.touched.name && formik.errors.name)} helperText={formik.touched.name && formik.errors.name} variant="outlined" label="Name" {...formik.getFieldProps('name')}/>
                            </div>
                            <div className="col-12 d-flex flex-row justify-content-center">
                                <TextField error={Boolean(formik.touched.unit && formik.errors.unit)} helperText={formik.touched.unit && formik.errors.unit} variant="outlined" label="Unit" {...formik.getFieldProps('unit')}/>
                            </div>
                        </div>
                </DialogContent>
                <DialogActions className="p-3">
                    <Button type="submit" variant="contained" color="primary" disabled={!formik.isValid || formik.isSubmitting}>Save {submittingLoading(formik)}</Button>
                    <Button variant="contained" color="error" onClick={handleOpenModal}>Cancel</Button>
                </DialogActions>
            </form>
        </Dialog>
        </>
    );
}