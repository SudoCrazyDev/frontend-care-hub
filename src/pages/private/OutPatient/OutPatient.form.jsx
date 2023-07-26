import { Divider, TextField } from "@mui/material";
import React from "react";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import ScaleIcon from '@mui/icons-material/Scale';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import LabRequest from "../PatientData/components/LabRequest/LabRequest";
import OutPatientMedicines from "./OutPatient.Medicines";
import OutPatientLabRequest from "./OutPatient.LabRequest";

export default function OutPatientForm({appointment, formik}){

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
            <div className="col-6 d-flex flex-row flex-wrap">
                <div className="col-12">
                    <Divider className="fw-bold col-12 h2">LAB REQUEST</Divider>
                </div>
                <div className="col-12">
                    <div className="my-2 p-3 col-12 d-flex flex-row justify-content-end">
                        {!formik.values.has_lab_request && 
                            <LabRequest type="Add" formik={formik}/>
                        }
                    </div>
                    <div className="p-3">
                        <OutPatientLabRequest appointment={appointment} formik={formik}/>
                    </div>
                </div>
            </div>
            <div className="col-6 d-flex flex-row flex-wrap">
                <div className="col-12">
                    <Divider className="fw-bold col-12 h2">SIGNIFICANT FINDINGS/REMARKS</Divider>
                </div>
                <div className="col-12 d-flex flex-row justify-content-center gap-4">
                    <TextField variant='outlined' fullWidth={true} multiline rows={5} {...formik.getFieldProps("significant_findings")}/>
                </div>
            </div>
            <div className="col-6 d-flex flex-row flex-wrap">
                <div className="col-12">
                    <Divider className="fw-bold col-12 h2">MEDICINES</Divider>
                </div>
                <div className="col-12">
                    <OutPatientMedicines formik={formik}/>
                </div>
            </div>
            <div className="col-6 d-flex flex-row flex-wrap justify-content-start align-items-start">
                <div className="col-12">
                    <Divider className="fw-bold col-12 h2">Billing Info</Divider>
                </div>
                <div className="col-12 d-flex flex-row flex-wrap p-5 gap-2">
                    <div className="col-12">
                        <h5 className="m-0 fw-bold">
                            Professional Fee:
                        </h5>
                    </div>
                    <div className="col-12">
                        <TextField variant="outlined" fullWidth={true} placeholder="0.00" type="number" {...formik.getFieldProps("professional_fee")}/>
                    </div>
                </div>
            </div>
        </div>
    );
};