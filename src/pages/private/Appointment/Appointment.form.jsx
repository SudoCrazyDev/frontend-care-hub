import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Divider, IconButton, InputLabel, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SearchIcon from '@mui/icons-material/Search';

export default function AppointmentForm(){
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
                            endAdornment: (
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            )
                        }}
                    />
                </div>
                <Divider className="my-2"/>
                <div className="col-12">
                    <h2 className='fw-bold'>VITAL STATUS</h2>
                </div>
                <div className="col-md-12 col-lg-6">
                    <InputLabel className='text-dark fw-bold'>Blood Pressure</InputLabel>
                    <TextField variant='outlined' fullWidth={true}/>
                </div>
                <div className="col-md-12 col-lg-6">
                    <InputLabel className='text-dark fw-bold'>Temperature</InputLabel>
                    <TextField variant='outlined' fullWidth={true}/>
                </div>
                <div className="col-md-12 col-lg-6">
                    <InputLabel className='text-dark fw-bold'>Heart Rate</InputLabel>
                    <TextField variant='outlined' fullWidth={true}/>
                </div>
                <div className="col-md-12 col-lg-6">
                    <InputLabel className='text-dark fw-bold'>Weight</InputLabel>
                    <TextField variant='outlined' fullWidth={true}/>
                </div>
                <Divider className="my-2"/>
                <div className="col-12">
                    <h2 className='fw-bold'>CHIEF COMPLAINT</h2>
                </div>
                <div className="col-12">
                    <TextField variant='outlined' fullWidth={true} multiline rows={5}/>
                </div>
                <Divider className="my-2"/>
            </div>
        </div>
    );
};