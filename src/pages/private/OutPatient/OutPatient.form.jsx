import { Divider, IconButton, TextField } from "@mui/material";
import React from "react";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import ScaleIcon from '@mui/icons-material/Scale';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import { GetStatusBadge } from "../../../helpers/HelperFunctions";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function OutPatientForm({appointment}){
    return(
        <div className="form-group d-flex flex-row flex-wrap">
            <div className="col-6 my-2 d-flex flex-row flex-wrap">
                <div className="col-12">
                    <Divider className="fw-bold h2">VITAL STATS</Divider>
                </div>
                <div className="d-flex flex-row flex-wrap w-100 justify-content-center align-items-center">
                    <div className="col-12 d-flex flex-row justify-content-center gap-5">
                        <TextField variant="outlined" label="Heart Rate" value={appointment.heart_rate} InputLabelProps={{ shrink: true}} InputProps={{ endAdornment:(<MonitorHeartIcon />), readOnly: true}}/>
                        <TextField variant="outlined" label="Temperature" value={appointment.temperature} InputLabelProps={{ shrink: true}} InputProps={{endAdornment:(<ThermostatIcon />), readOnly: true}}/>
                    </div>
                    <div className="col-12 d-flex flex-row justify-content-center gap-5">
                        <TextField variant="outlined" label="Weight" value={appointment.weight} InputLabelProps={{ shrink: true}} InputProps={{endAdornment:(<ScaleIcon />), readOnly: true}}/>
                        <TextField variant="outlined" label="Blood Pressure" value={appointment.blood_pressure} InputLabelProps={{ shrink: true}} InputProps={{endAdornment:(<BloodtypeIcon />), readOnly: true}}/>
                    </div>
                </div>
            </div>
            <div className="col-6 my-2 d-flex flex-row flex-wrap">
                <div className="col-12">
                    <Divider className="fw-bold col-12 h2">CHIEF COMPLAINT</Divider>
                </div>
                <div className="col-12 d-flex flex-row justify-content-center gap-4">
                    <TextField variant='outlined' fullWidth={true} multiline rows={5} value={appointment.chief_complaint || ""} InputProps={{readOnly: true}}/>
                </div>
            </div>
            <div className="col-12">
                <Divider className="fw-bold col-12 h2">LAB REQUEST</Divider>
            </div>
            <div className="col-12">
                <table className="table table-hover table-bordered">
                    <tbody>
                        <tr>
                            <td>asdxasdxasdxasd</td>
                            <td>{GetStatusBadge('confirmed')}</td>
                            <td>asdxasdxasdxasd</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="col-6 d-flex flex-row flex-wrap">
                <div className="col-12">
                    <Divider className="fw-bold col-12 h2">MEDICINES</Divider>
                </div>
                <div className="col-12">
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th></th>
                                <th width="20%">Medicine</th>
                                <th width="20%">Unit</th>
                                <th width="1%">Qty</th>
                                <th width="59%">Instructions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <IconButton size="small" color="primary">
                                        <RemoveIcon />
                                    </IconButton>
                                </td>
                                <td>asdxasdxasdxasd</td>
                                <td>{GetStatusBadge('confirmed')}</td>
                                <td>asdxasdxasdxasd</td>
                                <td>asdxasdxasdxasd</td>
                            </tr>
                            <tr>
                                <td>
                                    <IconButton size="small" color="primary">
                                        <AddIcon />
                                    </IconButton>
                                </td>
                                <td>
                                    <TextField 
                                        variant="outlined"
                                        size="small"
                                    />
                                </td>
                                <td></td>
                                <td>
                                    <TextField 
                                        variant="outlined"
                                        size="small"
                                        type="number"
                                    />
                                </td>
                                <td>
                                    <TextField 
                                        variant="outlined"
                                        size="small"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="col-6 d-flex flex-row flex-wrap">

            </div>
        </div>
    );
};