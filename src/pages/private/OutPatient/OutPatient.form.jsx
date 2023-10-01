import { InputAdornment, InputLabel, TextField } from "@mui/material";
import TabsPricingExample from "./components/Tabs";
import { calculateAgeWithMonths } from "../../../helpers/HelperFunctions";
import { useEffect, useState } from "react";
import axios from "axios";

export default function OutPatientContent({formik, appointment}){
    const [patientPhoto, setPatientPhoto] = useState("/assets/svg/maleUser.svg");
    
    const handleFetchPatientPhoto = () => {
        axios.get(`patients/get_patient_photo/${appointment.patient.id}`)
        .then(res => {
            let stringUrl = res.data;
            setPatientPhoto(stringUrl.replace('http://localhost:8000/', import.meta.env.VITE_STORAGE_URL));
        })
    };
    
    useEffect(() => {
        handleFetchPatientPhoto();
    },[]);
    return(
        <div className="d-flex flex-row flex-wrap">
            <div className="col-4 p-2">
                <div className="d-flex flex-row flex-wrap">
                    <div className="col-md-12 col-lg-6 p-2">
                        <InputLabel className='text-dark fw-bold'>Blood Pressure</InputLabel>
                        <TextField 
                            variant='outlined' 
                            fullWidth
                            value={appointment.blood_pressure}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    mmhg
                                </InputAdornment>
                            }}
                        />
                    </div>
                    <div className="col-md-12 col-lg-6 p-2">
                        <InputLabel className='text-dark fw-bold'>Temperature</InputLabel>
                        <TextField 
                            variant='outlined' 
                            fullWidth
                            value={appointment.temperature}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    °C
                                </InputAdornment>
                            }}
                        />
                    </div>
                    <div className="col-md-12 col-lg-6 p-2">
                        <InputLabel className='text-dark fw-bold'>Heart Rate</InputLabel>
                        <TextField 
                            variant='outlined' 
                            fullWidth
                            value={appointment.heart_rate}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    bpm
                                </InputAdornment>
                            }}
                        />
                    </div>
                    <div className="col-md-12 col-lg-6 p-2">
                        <InputLabel className='text-dark fw-bold'>Weight</InputLabel>
                        <TextField 
                            variant='outlined' 
                            fullWidth
                            value={appointment.weight}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    kg
                                </InputAdornment>
                            }}
                        />
                    </div>
                    <div className="col-12 p-2">
                        <InputLabel className='text-dark fw-bold'>Chief Complaint</InputLabel>
                        <TextField 
                            variant='outlined' 
                            fullWidth
                            multiline
                            value={appointment.chief_complaint === null ? '' : appointment.chief_complaint}
                            rows={4.5}
                        />
                    </div>
                </div>
            </div>
            <div className="col-8 p-2">
                <div className="d-flex flex-row flex-wrap">
                    <div className="col-8 d-flex flex-row flex-wrap">
                        <div className="col-6 p-2">
                            <InputLabel className='text-dark fw-bold'>Patient Name</InputLabel>
                            <TextField 
                                variant='outlined' 
                                fullWidth
                                InputProps={{
                                    className: 'fw-bolder'
                                }}
                                value={`${appointment.patient.lastname}, ${appointment.patient.firstname}`}
                            />
                        </div>
                        <div className="col-6 p-2">
                            <InputLabel className='text-dark fw-bold'>Occupation</InputLabel>
                            <TextField 
                                variant='outlined' 
                                fullWidth
                                InputProps={{
                                    className: 'fw-bolder'
                                }}
                                value={`${appointment.patient.occupation}`}
                            />
                        </div>
                        <div className="col-md-12 col-lg-6 p-2">
                            <InputLabel className='text-dark fw-bold'>Age</InputLabel>
                            <TextField 
                                variant='outlined' 
                                fullWidth
                                InputProps={{
                                    className: 'fw-bolder'
                                }}
                                value={`${calculateAgeWithMonths(appointment.patient.birthdate).age} YRS OLD`}
                            />
                        </div>
                        <div className="col-md-12 col-lg-6 p-2">
                            <InputLabel className='text-dark fw-bold'>Gender</InputLabel>
                            <TextField 
                                variant='outlined'
                                fullWidth
                                value={`${String(appointment.patient.gender).toLocaleUpperCase()}`}
                                InputProps={{
                                    className: 'fw-bolder'
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-4 shadow-lg">
                    {patientPhoto === "/assets/svg/maleUser.svg" ? (
                        <div className="col-4 ms-auto border rounded border-dark" style={{ height: '100%', width: '100%', background: `url('/assets/svg/maleUser.svg')`, backgroundSize: `contain`, borderRadius: '10px'}}>                        </div>
                    )
                    : (
                        <div className="col-4 ms-auto border rounded border-dark" style={{ height: '100%', width: '100%', background: `url('${patientPhoto}')`, backgroundSize: `cover`, borderRadius: '10px'}}></div>
                    )
                    }
                    </div>
                    <div className="col-6 p-2 d-flex flex-column">
                        <div className="col-12">
                            <InputLabel className='text-dark fw-bold'>RELIGION</InputLabel>
                            <TextField 
                                variant='outlined' 
                                fullWidth
                                InputProps={{
                                    className: 'fw-bolder'
                                }}
                                value={`${appointment.patient.religion}`}
                            />
                        </div>
                        <div className="col-12">
                            <InputLabel className='text-dark fw-bold'>CIVIL STATUS</InputLabel>
                            <TextField 
                                variant='outlined' 
                                fullWidth
                                InputProps={{
                                    className: 'fw-bolder'
                                }}
                                value={`${appointment.patient.civil_status}`}
                            />
                        </div>
                    </div>
                    <div className="col-6 p-2">
                        <InputLabel className='text-dark fw-bold'>Address</InputLabel>
                        <TextField 
                            variant='outlined' 
                            fullWidth
                            multiline
                            value={appointment.patient.address}
                            rows={4.5}
                        />
                    </div>
                </div>
            </div>
            <div className="col-12 p-2">
                <TabsPricingExample formik={formik} appointment={appointment}/>
            </div>
        </div>
    );
}