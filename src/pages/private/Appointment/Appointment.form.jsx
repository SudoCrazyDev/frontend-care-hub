import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Divider, IconButton, InputLabel, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SearchIcon from '@mui/icons-material/Search';
import LabRequest from '../PatientData/components/LabRequest/LabRequest';
import LabRequestTable from './Appointment.LabReq.Table';

export default function AppointmentForm({patient, formik}){

    return(
        <div className="form-group">
            <div className="row">
                <div className="col-md-12 col-lg-6">
                    <InputLabel className='text-dark fw-bold'>Consultation Date</InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                        sx={{
                            width: "100%",
                        }}
                        onChange={(date) => formik.setFieldValue('consultation_date', new Date(date.$d).toLocaleDateString('en-CA'))}
                        textField={(params) => (
                            <TextField
                                fullWidth={true}
                            />
                        )}
                        />
                    </LocalizationProvider>
                </div>
                <div className="col-md-12 col-lg-6">
                    <InputLabel className='text-dark fw-bold'>Patient Name</InputLabel>
                    <TextField 
                        className="text-capitalize" 
                        variant="outlined" 
                        fullWidth={true}
                        InputProps={{
                            readOnly: true
                        }}
                        value={`${patient.firstname} ${patient.lastname}`}
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
                        error={formik.errors && formik.errors.blood_pressure}
                        helperText={formik.errors && formik.errors.blood_pressure}
                        {...formik.getFieldProps('blood_pressure')}/>
                </div>
                <div className="col-md-12 col-lg-6">
                    <InputLabel className='text-dark fw-bold'>Temperature</InputLabel>
                    <TextField 
                        variant='outlined' 
                        fullWidth={true} 
                        error={formik.errors && formik.errors.weight}
                        helperText={formik.errors && formik.errors.weight}
                        {...formik.getFieldProps('weight')}/>
                </div>
                <div className="col-md-12 col-lg-6">
                    <InputLabel className='text-dark fw-bold'>Heart Rate</InputLabel>
                    <TextField 
                        variant='outlined'
                        fullWidth={true}
                        error={formik.errors && formik.errors.heart_rate}
                        helperText={formik.errors && formik.errors.heart_rate}
                        {...formik.getFieldProps('heart_rate')}/>
                </div>
                <div className="col-md-12 col-lg-6">
                    <InputLabel className='text-dark fw-bold'>Weight</InputLabel>
                    <TextField 
                        variant='outlined'
                        fullWidth={true}
                        error={formik.errors && formik.errors.temperature}
                        helperText={formik.errors && formik.errors.temperature}
                        {...formik.getFieldProps('temperature')}/>
                </div>
                <Divider className="my-2"/>
                <div className="col-12">
                    <h2 className='fw-bold'>CHIEF COMPLAINT</h2>
                </div>
                <div className="col-12">
                    <TextField variant='outlined' fullWidth={true} multiline rows={5} {...formik.getFieldProps('chief_complaint')}/>
                </div>
                <Divider className="my-2"/>
                <div className="col-12 d-flex flex-row my-2">
                    <h2 className="fw-bold m-0">LAB REQUEST</h2>
                    <div className="ms-auto">
                        <LabRequest patient={patient} formik={formik} type={'Add'}/>
                    </div>
                </div>
                <div className="col-12 my-2">
                        <LabRequestTable formik={formik}/>
                </div>
            </div>
        </div>
    );
};