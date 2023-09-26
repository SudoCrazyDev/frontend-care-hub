import { Autocomplete, Divider, IconButton, InputAdornment, InputLabel, TextField } from "@mui/material";
import { useEffect, useState } from 'react';
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function AppointmentForm({patient, formik}){
    const [searching, setSearching] = useState(false);
    const [medications, setMedications] = useState([]);
    const [medicines, setMedicines] = useState([{id: 0, generic_name: 'Atleast 3 Characters', unit: {unit_name: ''}}]);
    const [selectedMedicine, setSelectedMedicine] = useState({unit:{}});
    const [selectedMedicineValue, setSelectedMedicineValue] = useState(0);
    const [selectedMedicineInstruction, setSelectedMedicineInstruction] = useState("");
    const [selectedMedicineUnit, setSelectedMedicineUnit] = useState("");
    const [lastMedications, setLastMedications] = useState([]);
    
    const handleFetchLastMedications = () => {
        
    };
    
    const handleLookUpMedicine = (event) => {
        
        if(String(event.target.value).length > 3){
        setSearching(true);
        axios.get(`medicines/lookup_medicine/${event.target.value}`)
        .then(res => {
            setMedicines(res.data);
        })
        .finally(() => {
            setSearching(false);
        });
        }
    };
    
    const handleAddMedicine = () => {
        setMedications([...medications, {
            id: selectedMedicine.id,
            generic_name: selectedMedicine.generic_name,
            description: selectedMedicine.description,
            unit: selectedMedicine.unit.unit_name,
            qty: selectedMedicineValue,
            instruction: selectedMedicineInstruction}]);
        setSelectedMedicine({unit:{}});
        setSelectedMedicineValue(0);
        setSelectedMedicineInstruction("");
        formik.setFieldValue('medications', JSON.stringify([...medications, {
        id: selectedMedicine.id,
        generic_name: selectedMedicine.generic_name,
        description: selectedMedicine.description,
        unit: selectedMedicine.unit.unit_name,
        qty: selectedMedicineValue,
        instruction: selectedMedicineInstruction}]));
        formik.setFieldValue('has_medications', true);
    };
    
    const handleRemoveMedicine = (value) => {
        setMedications(medications.filter((medication, index) => index !== value));
    };
    
    useEffect(() => {
        if(medications.length === 0 ){
            formik.setFieldValue('has_medications', false);
        }
    }, [medications]);
    
    return(
        <div className="form-group">
            <div className="row">
                <div className="col-md-12 col-lg-6">
                    <InputLabel className='text-dark fw-bold'>Consultation Date</InputLabel>
                    <TextField
                        className="text-capitalize"
                        variant="outlined"
                        fullWidth={true}
                        type="date"
                        {...formik.getFieldProps('consultation_date')}
                    />
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
                        {...formik.getFieldProps('blood_pressure')}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                mmhg
                            </InputAdornment>
                        }}
                    />
                </div>
                <div className="col-md-12 col-lg-6">
                    <InputLabel className='text-dark fw-bold'>Temperature</InputLabel>
                    <TextField 
                        variant='outlined' 
                        fullWidth={true} 
                        error={formik.errors && formik.errors.temperature}
                        helperText={formik.errors && formik.errors.temperature}
                        {...formik.getFieldProps('temperature')}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                °C
                            </InputAdornment>
                        }}    
                    />
                </div>
                <div className="col-md-12 col-lg-6">
                    <InputLabel className='text-dark fw-bold'>Heart Rate</InputLabel>
                    <TextField 
                        variant='outlined'
                        fullWidth={true}
                        error={formik.errors && formik.errors.heart_rate}
                        helperText={formik.errors && formik.errors.heart_rate}
                        {...formik.getFieldProps('heart_rate')}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                bpm
                            </InputAdornment>
                        }}    
                    />
                </div>
                <div className="col-md-12 col-lg-6">
                    <InputLabel className='text-dark fw-bold'>Weight</InputLabel>
                    <TextField 
                        variant='outlined'
                        fullWidth={true}
                        error={formik.errors && formik.errors.weight}
                        helperText={formik.errors && formik.errors.weight}
                        {...formik.getFieldProps('weight')}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                kg
                            </InputAdornment>
                        }}
                    />
                </div>
                <Divider className="my-2"/>
                <div className="col-12">
                    <h2 className='fw-bold'>CHIEF COMPLAINT</h2>
                </div>
                <div className="col-12">
                    <TextField variant='outlined' fullWidth={true} multiline rows={5} {...formik.getFieldProps('chief_complaint')}/>
                </div>
                <Divider className='my-2' />
                <div className="col-12 p-2">
                    <div className="d-flex flex-row mb-1 align-items-center">
                        <InputLabel className='text-dark fw-bold h2 text-uppercase m-0'>ADD LAST MEDICATIONS</InputLabel>
                    </div>
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th style={{ width: '5%'}}></th>
                            <th style={{ width: '35%'}}>Medicine</th>
                            <th style={{ width: '20%'}}>Unit</th>
                            <th style={{ width: '10%'}}>Qty</th>
                            <th>Instructions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td valign='middle' style={{ width: '5%'}}>
                            <IconButton size="small" onClick={handleAddMedicine}>
                                <AddIcon color='primary'/>
                            </IconButton>
                            </td>
                            <td valign='middle'>
                                <Autocomplete
                                disableClearable
                                options={medicines}
                                loading={searching}
                                getOptionLabel={(option) => `${option.generic_name} (${option.description}) - ${option.unit.unit_name}`}
                                getOptionDisabled={(option) => option.generic_name === 'Atleast 3 Characters'}
                                onChange={(event, newInputValue) => {
                                    setSelectedMedicine(newInputValue);
                                }}
                                renderInput={(params) => <TextField {...params} onChange={handleLookUpMedicine} label="Medicine" />}
                                />
                            </td>
                            <td valign='middle'>
                                <h5 className="fw-bolder">
                                {selectedMedicine.unit.unit_name}
                                </h5>
                            </td>
                            <td valign='middle'>
                            <TextField 
                                type='number'
                                value={selectedMedicineValue}
                                onChange={(e) => setSelectedMedicineValue(e.target.value)}
                            />
                            </td>
                            <td valign='middle'>
                            <TextField 
                                fullWidth
                                multiline
                                rows={2}
                                value={selectedMedicineInstruction}
                                onChange={(e) => setSelectedMedicineInstruction(e.target.value)}
                            />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <Divider className="my-2" />
                <div className="col-12 p-2">
                    <InputLabel className='text-dark fw-bold h2 text-uppercase'>MEDICATIONS</InputLabel>
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th style={{ width: '5%'}}></th>
                            <th style={{ width: '45%'}}>Medicine</th>
                            <th style={{ width: '10%'}}>Qty</th>
                            <th>Instructions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {medications.map((medication, index) => (
                            <tr key={index}>
                            <td valign='middle' style={{ width: '5%'}}>
                                <IconButton size="small" onClick={() => handleRemoveMedicine(index)}>
                                    <RemoveIcon color="error"/>
                                </IconButton>
                            </td>
                            <td valign='middle'>
                                {`${medication.generic_name} (${medication.description}) - ${medication.unit}`}
                            </td>
                            <td valign='middle'>
                                {medication.qty}
                            </td>
                            <td valign='middle'>
                                {medication.instruction}
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};