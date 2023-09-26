import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputLabel, Tooltip, Divider, TextField, InputAdornment  } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import InitializeFormik from "./Appointment.Update.DAL";
import { submittingLoading } from "../../../helpers/HelperFunctions";
import ViewLabRequest from "../PatientData/components/Appointments/ViewAppointment.LabRequest.Table";

export default function UpdateAppointment({appointment, setAppointments}){
    const [open, setOpen] = useState(false);
    const formik = InitializeFormik(appointment, setAppointments);

    const handleClickModal = () => {
        setOpen(!open);
    };

    useEffect(() => {
        if(!formik.isSubmitting){
            formik.resetForm();
            setTimeout(() => {setOpen(false)}, 1000);
        }
    },[formik.isSubmitting]);

    return(
        <>
        <Tooltip title="Update Appointment">
            <IconButton color="primary" onClick={handleClickModal}>
                <ModeEditIcon />
            </IconButton>
        </Tooltip>
        <Dialog open={open} maxWidth="md" fullWidth>
            <DialogTitle className="fw-bold">Update Appointment</DialogTitle>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-12 col-lg-6">
                                <InputLabel className='text-dark fw-bold'>Consultation Date</InputLabel>
                                <TextField
                                    fullWidth
                                    value={appointment.consultation_date}
                                />
                            </div>
                            <div className="col-md-12 col-lg-6">
                                <InputLabel className='text-dark fw-bold'>Patient Name</InputLabel>
                                <TextField 
                                    className="text-capitalize" 
                                    variant="outlined" 
                                    fullWidth={true}
                                    value={`${appointment.patient.firstname} ${appointment.patient.lastname}`}
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton>
                                                <SearchIcon />
                                            </IconButton>
                                        ),
                                        readOnly: true
                                    }}
                                />
                            </div>
                            <Divider className="my-2"/>
                            <div className="col-12">
                                <h2 className='fw-bold'>VITAL STATUS</h2>
                            </div>
                            <div className="col-md-12 col-lg-6">
                                <InputLabel className='text-dark fw-bold'>Blood Pressure</InputLabel>
                                <TextField 
                                    variant='outlined'
                                    fullWidth={true}
                                    {...formik.getFieldProps('blood_pressure')}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">
                                            mmhg
                                        </InputAdornment>
                                    }}
                                />
                            </div>
                            <div className="col-md-12 col-lg-6">
                                <InputLabel className='text-dark fw-bold'>Temperature</InputLabel>
                                <TextField 
                                    variant='outlined' 
                                    fullWidth={true}
                                    {...formik.getFieldProps('temperature')}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">
                                            °C
                                        </InputAdornment>
                                    }}
                                />
                            </div>
                            <div className="col-md-12 col-lg-6">
                                <InputLabel className='text-dark fw-bold'>Heart Rate</InputLabel>
                                <TextField 
                                    variant='outlined'
                                    fullWidth={true}
                                    {...formik.getFieldProps('heart_rate')}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">
                                            bpm
                                        </InputAdornment>
                                    }}
                                />
                            </div>
                            <div className="col-md-12 col-lg-6">
                                <InputLabel className='text-dark fw-bold'>Weight</InputLabel>
                                <TextField 
                                    variant='outlined'
                                    fullWidth={true}
                                    {...formik.getFieldProps('weight')}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">
                                            kg
                                        </InputAdornment>
                                    }}
                                />
                            </div>
                            <Divider className="my-2"/>
                            <div className="col-12">
                                <h2 className='fw-bold'>CHIEF COMPLAINT</h2>
                            </div>
                            <div className="col-12">
                                <TextField 
                                    variant='outlined'
                                    fullWidth={true}
                                    multiline 
                                    rows={5}
                                    {...formik.getFieldProps('chief_complaint')}
                                />
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button type="submit" variant="contained" color="primary" disabled={formik.isSubmitting}>Save {submittingLoading(formik)}</Button>
                    <Button variant="contained" color="error" onClick={handleClickModal}>Close</Button>
                </DialogActions>
            </form>
        </Dialog>
        </>
    );
};