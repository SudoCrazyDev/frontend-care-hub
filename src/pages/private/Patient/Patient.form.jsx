import { TextField, Select, MenuItem, InputLabel, Divider } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Webcam from "react-webcam";

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
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                        label="birthdate" 
                        sx={{
                            width: "100%",
                        }}
                        id="birthdate"
                        onChange={(date)=>formik.setFieldValue('birthdate', new Date(date.$d).toISOString().slice(0, 19).replace('T', ' '))}
                        renderInput={(params) => (
                            <TextField 
                                fullWidth={true}
                                label="birthdate"
                            />
                        )}
                        />
                    </LocalizationProvider>
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
                    <Select fullWidth={true} label="Gender" {...formik.getFieldProps('gender')}>
                        <MenuItem value="male">MALE</MenuItem>
                        <MenuItem value="female">FEMALE</MenuItem>
                    </Select>
                </div>
                <div className="col-md-12 col-lg-6 my-2">
                    <InputLabel>Civil Status</InputLabel>
                    <Select fullWidth={true} label="Civil Status" {...formik.getFieldProps('civil_status')}>
                        <MenuItem value="single">SINGLE</MenuItem>
                        <MenuItem value="married">MARRIED</MenuItem>
                        <MenuItem value="widowed">WIDOWED</MenuItem>
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
            {/* <div className="row">
                <h2 className="m-0 fw-bolder">Patient Photo</h2>
                <div style={{ height: '20px', width: '20px'}}>
                    <Webcam />
                </div>
            </div> */}
        </>
    )
            
};