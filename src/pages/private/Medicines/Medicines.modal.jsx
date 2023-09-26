import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import CreateIcon from '@mui/icons-material/Create';
import InitializeFormik from "./Medicines.DAL";
import { submittingLoading } from "../../../helpers/HelperFunctions";
import { CHButton } from "../../../components/CHButtons/CareHubButtons";
import axios from "axios";
import { useSelector } from "react-redux";

export default function MedicineModal({type = 'new', medicine = {}}){
    const [open, setOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedUnit, setSelectedUnit] = useState("");
    const {medicineBrands } = useSelector(state => state.medicineBrands);
    const { medicineUnits } = useSelector(state => state.medicineUnits);
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
                                <TextField style={{width: '80%'}} error={Boolean(formik.touched.generic_name && formik.errors.generic_name)} helperText={formik.touched.generic_name && formik.errors.generic_name} variant="outlined" label="Generic Name" {...formik.getFieldProps('generic_name')}/>
                            </div>
                            <div className="col-12 d-flex flex-row justify-content-center">
                                <TextField style={{width: '80%'}} error={Boolean(formik.touched.description && formik.errors.description)} helperText={formik.touched.description && formik.errors.description} variant="outlined" label="Description" {...formik.getFieldProps('description')}/>
                            </div>
                            <div className="col-12 d-flex flex-row justify-content-center">
                                    <Autocomplete
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue('unit_id', newValue.id);
                                        }}
                                        options={medicineUnits}
                                        inputValue={formik.values.unit_id}
                                        getOptionLabel={(option) => option.unit_name}
                                        size="medium"
                                        style={{width: '80%'}}
                                        renderInput={(params) => <TextField {...params} fullWidth label="Medicine Unit" />}
                                    />
                            </div>
                            <div className="col-12 d-flex flex-row justify-content-center">
                                    <Autocomplete
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue('brand_id', newValue.id);
                                        }}
                                        options={medicineBrands}
                                        inputValue={formik.values.brand_id}
                                        getOptionLabel={(option) => option.brand_name}
                                        size="medium"
                                        style={{width: '80%'}}
                                        renderInput={(params) => <TextField {...params} fullWidth label="Brand" />}
                                    />
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