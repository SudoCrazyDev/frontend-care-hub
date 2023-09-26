import { InputAdornment, InputLabel, TextField } from "@mui/material";
import TabsPricingExample from "./components/Tabs";
import { calculateAgeWithMonths } from "../../../helpers/HelperFunctions";

export default function OutPatientContent({formik, appointment}){
    
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
                </div>
            </div>
            <div className="col-3 p-2">
                <div className="d-flex flex-row flex-wrap">
                    <div className="col-12 p-2">
                        <InputLabel className='text-dark fw-bold'>Chief Complaint</InputLabel>
                        <TextField 
                            variant='outlined' 
                            fullWidth
                            multiline
                            value={appointment.chief_complaint === null ? '' : appointment.chief_complaint}
                            rows={5}
                        />
                    </div>
                </div>
            </div>
            <div className="col-5 p-2">
                <div className="d-flex flex-row flex-wrap">
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
            </div>
            <div className="col-12 p-2">
                <TabsPricingExample formik={formik} appointment={appointment}/>
            </div>
        </div>
    );
}