import { TextField, Select, MenuItem, InputLabel, Divider, Button } from "@mui/material";
import Webcam from "react-webcam";
import { useEffect, useState } from "react";

function getBase64(file){
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default function PatientForm({formik}){
    
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
                <div className="p-3">
                    <img src={formik.values.photo_url} height={250} width={250} />
                </div>
                <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">Upload photo</label>
                    <input className="form-control" type="file" id="formFile" onChange={(e) => getBase64(e.target.files[0]).then((data) => formik.setFieldValue('photo_url', data))}/>
                </div>
            </div>
        </>
    )
            
};