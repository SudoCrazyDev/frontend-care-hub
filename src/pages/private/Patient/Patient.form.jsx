import { TextField, Select, MenuItem, InputLabel, Divider, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Webcam from "react-webcam";
import { useEffect, useState } from "react";

export default function PatientForm({formik}){
    const [capturedPhoto, setCapturedPhoto] = useState("");

    useEffect(() => {
        formik.setFieldValue('photo_url', capturedPhoto);
    }, [capturedPhoto]);
    
    return(
        <>
            <div className="d-flex flex-row flex-wrap">
                <div className="col-md-12 col-lg-6 my-2">
                    <TextField
                    error={Boolean(formik.errors.firstname)}
                    helperText={formik.errors.firstname}
                    className="text-capitalize"
                    variant="outlined"
                    label="First Name"
                    placeholder="Eg. Dela Cruz, Juan P."
                    fullWidth={true}
                    {...formik.getFieldProps('firstname')}/>
                </div>
                <div className="col-md-12 col-lg-6 my-2">
                    <TextField
                    className="text-capitalize"
                    variant="outlined"
                    label="Middle Name"
                    placeholder="Eg. Dela Cruz, Juan P."
                    fullWidth={true}
                    {...formik.getFieldProps('middlename')}/>
                </div>
                <div className="col-md-12 col-lg-6 my-2">
                    <TextField
                    className="text-capitalize"
                    variant="outlined"
                    label="Last Name"
                    placeholder="Eg. Dela Cruz, Juan P."
                    fullWidth={true}
                    {...formik.getFieldProps('lastname')}/>
                </div>
                <div className="col-md-12 col-lg-6 my-2">
                    <TextField
                    className="text-capitalize"
                    variant="outlined"
                    label="Birthday"
                    fullWidth={true}
                    type="date"
                    InputLabelProps={{shrink: true}}
                    {...formik.getFieldProps('birthdate')}/>
                </div>
                <div className="col-12">
                    <TextField
                        className="text-capitalize"
                        variant="outlined"
                        label="Address"
                        fullWidth={true}
                        {...formik.getFieldProps('address')}/>
                </div>
                <div className="col-md-12 col-lg-6 my-2">
                    <InputLabel>Gender</InputLabel>
                    <Select fullWidth={true} {...formik.getFieldProps('gender')}>
                        <MenuItem value="male">MALE</MenuItem>
                        <MenuItem value="female">FEMALE</MenuItem>
                    </Select>
                </div>
                <div className="col-md-12 col-lg-6 my-2">
                    <InputLabel>Civil Status</InputLabel>
                    <Select fullWidth={true} {...formik.getFieldProps('civil_status')}>
                        <MenuItem value="single">SINGLE</MenuItem>
                        <MenuItem value="married">MARRIED</MenuItem>
                        <MenuItem value="widowed">WIDOW/WIDOWER</MenuItem>
                    </Select>
                </div>
                <div className="col-md-12 col-lg-6 my-2">
                    <TextField className="text-capitalize" variant="outlined" label="Religion" fullWidth={true} {...formik.getFieldProps('religion')}/>
                </div>
                <div className="col-md-12 col-lg-6 my-2">
                    <TextField className="text-capitalize" variant="outlined" label="Occupation" fullWidth={true} {...formik.getFieldProps('occupation')}/>
                </div>
                <div className="col-md-12 col-lg-6 my-2">
                    <TextField className="text-capitalize" variant="outlined" label="Contact No." fullWidth={true} {...formik.getFieldProps('contact_number')}/>
                </div>
            </div>
            <Divider className="my-2"/>
            <div className="row">
                <h2 className="m-0 fw-bolder">Patient Photo</h2>
                <Divider className="my-2"/>
                <div style={{ height: '20px', width: '20px'}}>
                    {capturedPhoto === "" ?
                    <Webcam
                    audio={false}
                    screenshotFormat="image/jpeg"
                    className="shadow-lg border border-dark rounded"
                    >
                        {({getScreenshot}) => (
                            <Button variant="contained" onClick={() => setCapturedPhoto(getScreenshot())}>
                                Capture
                            </Button>
                        )}
                    </Webcam>
                    :
                    <div className="row">
                        <div className="col-12">
                            <img src={capturedPhoto} className="shadow-lg border border-dark rounded"/>
                        </div>
                        <div className="col-12">
                            <Button variant="contained" color="error" onClick={() => setCapturedPhoto("")}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </>
    )
            
};