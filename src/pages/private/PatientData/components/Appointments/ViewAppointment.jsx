import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputLabel, Tooltip, Divider, TextField, InputAdornment  } from "@mui/material";
import React, { useState } from "react";
import DescriptionIcon from '@mui/icons-material/Description';
import SearchIcon from '@mui/icons-material/Search';
import ViewLabRequestTable from "./ViewAppointment.LabRequest.Table";

export default function ViewAppointment({patientData, appointment}){
    const [open, setOpen] = useState(false);

    const handleClickModal = () => {
        setOpen(!open);
    };

    return(
        <>
        <Tooltip title="View Appointment">
            <IconButton color="primary" onClick={handleClickModal}>
                <DescriptionIcon />
            </IconButton>
        </Tooltip>
        <Dialog open={open} maxWidth="md" fullWidth>
            <DialogTitle className="fw-bold">Viewing Appointment</DialogTitle>
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
                                InputProps={{
                                    readOnly: true,
                                    endAdornment: <InputAdornment position="end">
                                        mmhg
                                    </InputAdornment>
                                }}
                                value={appointment.blood_pressure}
                            />
                        </div>
                        <div className="col-md-12 col-lg-6">
                            <InputLabel className='text-dark fw-bold'>Temperature</InputLabel>
                            <TextField 
                                variant='outlined' 
                                fullWidth={true}
                                InputProps={{
                                    readOnly: true,
                                    endAdornment: <InputAdornment position="end">
                                        °C
                                    </InputAdornment>
                                }}
                                value={appointment.temperature}
                            />
                        </div>
                        <div className="col-md-12 col-lg-6">
                            <InputLabel className='text-dark fw-bold'>Heart Rate</InputLabel>
                            <TextField 
                                variant='outlined'
                                fullWidth={true}
                                InputProps={{
                                    readOnly: true,
                                    endAdornment: <InputAdornment position="end">
                                        bpm
                                    </InputAdornment>
                                }}
                                value={appointment.heart_rate}
                            />
                        </div>
                        <div className="col-md-12 col-lg-6">
                            <InputLabel className='text-dark fw-bold'>Weight</InputLabel>
                            <TextField 
                                variant='outlined'
                                fullWidth={true}
                                InputProps={{
                                    readOnly: true,
                                    endAdornment: <InputAdornment position="end">
                                        kg
                                    </InputAdornment>
                                }}
                                value={appointment.weight}
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
                                multiline rows={5}
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={appointment.chief_complaint || ""}
                            />
                        </div>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="error" onClick={handleClickModal}>Close</Button>
            </DialogActions>
        </Dialog>
        </>
    );
};