import { TextField, Select, MenuItem, InputLabel, Divider } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Webcam from "react-webcam";
import InitializeFormik from "./Patient.DAL";

export default function PatientForm(){
    const formik = InitializeFormik();
    
    return(
        <>
        <div className="d-flex flex-row flex-wrap">
                <div className="col-md-12 col-lg-6 my-2">
                    <TextField className="text-capitalize" variant="outlined" label="First Name" placeholder="Eg. Dela Cruz, Juan P." fullWidth={true}/>
                </div>
                <div className="col-md-12 col-lg-6 my-2">
                    <TextField className="text-capitalize" variant="outlined" label="Middle Name" placeholder="Eg. Dela Cruz, Juan P." fullWidth={true}/>
                </div>
                <div className="col-md-12 col-lg-6 my-2">
                    <TextField className="text-capitalize" variant="outlined" label="Last Name" placeholder="Eg. Dela Cruz, Juan P." fullWidth={true}/>
                </div>
                <div className="col-md-12 col-lg-6 my-2">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                        label="Birthday" 
                        sx={{
                            width: "100%",
                        }}
                        />
                    </LocalizationProvider>
                </div>
                <div className="col-12">
                    <TextField className="text-capitalize" variant="outlined" label="Address" fullWidth={true}/>
                </div>
                <div className="col-md-12 col-lg-6 my-2">
                    <InputLabel>Gender</InputLabel>
                    <Select value={'male'} fullWidth={true} label="Gender">
                        <MenuItem value="male">MALE</MenuItem>
                        <MenuItem value="female">FEMALE</MenuItem>
                    </Select>
                </div>
                <div className="col-md-12 col-lg-6 my-2">
                    <InputLabel>Civil Status</InputLabel>
                    <Select value={'single'} fullWidth={true} label="Gender">
                        <MenuItem value="single">SINGLE</MenuItem>
                        <MenuItem value="married">MARRIED</MenuItem>
                        <MenuItem value="widowed">WIDOWED</MenuItem>
                    </Select>
                </div>
                <div className="col-md-12 col-lg-6 my-2">
                    <TextField className="text-capitalize" variant="outlined" label="Religion" fullWidth={true}/>
                </div>
                <div className="col-md-12 col-lg-6 my-2">
                    <TextField className="text-capitalize" variant="outlined" label="Occupation" fullWidth={true}/>
                </div>
                <div className="col-md-12 col-lg-6 my-2">
                    <TextField className="text-capitalize" variant="outlined" label="Contact No." fullWidth={true}/>
                </div>
            </div>
            <Divider className="my-2"/>
            <div className="row">
                <h2 className="m-0 fw-bolder">Patient Photo</h2>
                <div style={{ height: '20px', width: '20px'}}>
                    <Webcam />
                </div>
            </div>
        </>
    )
            
};