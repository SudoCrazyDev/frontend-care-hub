import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, InputLabel, TextField } from "@mui/material";
import { CHButton } from "../../../components/CHButtons/CareHubButtons";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {useFormik} from "formik";
import axios from "axios";
import PrintRx from "./components/Appointments/PrintRx";

export default function SingleMedicinePrint({patientData, setMedicationsMain}){
    const [modalState, setModalState] = useState(false);
    const [searching, setSearching] = useState(false);
    const [medications, setMedications] = useState([]);
    const [medicines, setMedicines] = useState([{id: 0, generic_name: 'Atleast 3 Characters', unit: {unit_name: ''}}]);
    const [selectedMedicine, setSelectedMedicine] = useState({unit:{}});
    const [selectedMedicineValue, setSelectedMedicineValue] = useState(0);
    const [selectedMedicineInstruction, setSelectedMedicineInstruction] = useState("");
    const [selectedMedicineClear, setSelectedMedicineClear] = useState(false);
    const [selectedMedicineUnit, setSelectedMedicineUnit] = useState("-");
    const [lastMedications, setLastMedications] = useState([]);
    
    const handleSetSelectedMedicineUnit = (value) => {
        setSelectedMedicineUnit(value);
    };
    
    const handleFetchLastMedications = () => {
        axios.get(`patients/get_patient_last_medications/${patientData.id}`)
        .then((res) => {
            if(res.data.medicines !== '' && res.data.medicines !== null){
            setLastMedications(JSON.parse(res.data.medicines)); 
            }
        });
    };
      
    const handleModalState = () => {
        setModalState(!modalState);
        setMedicines([{id: 0, generic_name: 'Atleast 3 Characters', unit: {unit_name: ''}}]);
        setSelectedMedicineClear(!selectedMedicineClear);
        setSelectedMedicineUnit("-");
        setMedications([]);
        setSelectedMedicine({unit:{}});
        setSelectedMedicineValue(0);
        setSelectedMedicineInstruction("");
        formik.resetForm();
    };
    
    const handleLookUpMedicine = (event) => {
        
        if(String(event.target.value).length > 3){
        setSearching(true);
        axios.get(`medicines/lookup_medicine/${event.target.value}`)
        .then(res => {
            if(res.data.length === 0){
                setMedicines([
                    {
                        id: 0, 
                        generic_name: event.target.value,
                        description: '',
                        unit: {
                            unit_name: '-'
                        }}
                ]);
            }else{
                setMedicines(res.data);   
            }
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
            unit: selectedMedicineUnit,
            qty: selectedMedicineValue,
            instruction: selectedMedicineInstruction}]);
        setSelectedMedicine({unit:{}});
        setSelectedMedicineValue(0);
        setSelectedMedicineInstruction("");
        formik.setFieldValue('medications', [...medications, {
            id: selectedMedicine.id,
            generic_name: selectedMedicine.generic_name,
            description: selectedMedicine.description,
            unit: selectedMedicineUnit,
            qty: selectedMedicineValue,
            instruction: selectedMedicineInstruction}]);
        formik.setFieldValue('has_medications', true);
        setMedicines([{id: 0, generic_name: 'Atleast 3 Characters', unit: {unit_name: ''}}]);
        setSelectedMedicineClear(!selectedMedicineClear);
        setSelectedMedicineUnit("-");
    };
    
    const handleRemoveMedicine = (value) => {
        setMedications(medications.filter((medication, index) => index !== value));
    };
    
    const handleSaveMedicine = (values) => {
        axios.post(`patients/insert_medicine/`, values)
        .then((res) => {
            formik.setSubmitting(false);
            setMedicationsMain(res.data);
            setTimeout(() => {
                setModalState(false);
            }, 1500);
        })
    };
    
    const handleSameMeds = () => {
        setMedications([...medications, ...lastMedications]);
        formik.setFieldValue('medications', JSON.stringify([...medications, ...lastMedications]));
    };
      
    useEffect(() => {
        if(medications.length === 0 ){
            formik.setFieldValue('has_medications', false);
        }
    }, [medications]);
    
    const handleChangeMedicationValues = (baseIndex, newValue) => {
        medications[baseIndex] = newValue;
        setMedications(medications);
        formik.setFieldValue('medications', JSON.stringify(medications));
      };
      
    const formik = useFormik({
        initialValues:{
            patient_id: patientData.id,
            has_medications: false,
            medications: [],
            appointment: {
                patient:{
                    firstname: patientData.firstname,
                    lastname: patientData.lastname,
                    address: patientData.address,
                    birthdate: patientData.birthdate,
                    gender: patientData.gender
                }
            }
        },
        onSubmit: handleSaveMedicine
    });
    
    useEffect(() => {
        handleFetchLastMedications()
    }, []);
    
    useEffect(() => {
        
    }, [patientData]);
    return (
        <>
            <CHButton variant="contained" color="primary" className="fw-bolder" onClick={() => handleModalState()}>
                1/4 Print Rx
            </CHButton>
            <Dialog maxWidth='md' fullWidth open={modalState}>
                <DialogTitle className="fw-bolder text-capitalize">Medicine Prescription</DialogTitle>
                <form>
                    <DialogContent dividers>
                        <div className="col-12 p-2">
                            <div className="d-flex flex-row mb-1 align-items-center">
                                <InputLabel className='text-dark fw-bold h2 text-uppercase m-0'>ADD MEDICATIONS</InputLabel>
                                <Button variant="contained" size="small" className='ms-auto' disabled={lastMedications.length === 0} onClick={handleSameMeds}>
                                    Same Meds as Last Visit
                                </Button>
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
                                            <IconButton size="small" onClick={() => handleAddMedicine()}>
                                                <AddIcon color='primary'/>
                                            </IconButton>
                                        </td>
                                        <td valign='middle'>
                                            <Autocomplete
                                            key={selectedMedicineClear}
                                            disableClearable
                                            options={medicines}
                                            loading={searching}
                                            getOptionLabel={(option) => `${option.generic_name} (${option.description}) - ${option.unit.unit_name}`}
                                            getOptionDisabled={(option) => option.generic_name === 'Atleast 3 Characters'}
                                            onChange={(event, newInputValue) => {
                                                setSelectedMedicine(newInputValue);
                                                setSelectedMedicineUnit(newInputValue.unit.unit_name);
                                            }}
                                            renderInput={(params) => <TextField {...params} onChange={handleLookUpMedicine} label="Medicine" />}
                                            />
                                        </td>
                                        <td valign='middle'>
                                            <TextField 
                                                type='text'
                                                value={selectedMedicineUnit}
                                                onChange={(e) => handleSetSelectedMedicineUnit(e.target.value)}
                                            />
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
                                        <th style={{ width: '3%'}}></th>
                                        <th style={{ width: '45%'}}>Medicine</th>
                                        <th style={{ width: '10%'}}>Qty</th>
                                        <th>Instructions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {medications.map((medication, index) => (
                                    <tr key={index}>
                                        <td valign='middle' style={{ width: '3%'}}>
                                            <IconButton size="small" onClick={() => handleRemoveMedicine(index)}>
                                                <RemoveIcon color="error"/>
                                            </IconButton>
                                        </td>
                                        <td valign='middle'>
                                            {`${medication.generic_name} (${medication.description}) - ${medication.unit}`}
                                        </td>
                                        <td valign='middle'>
                                            <TextField
                                                type='number'
                                                variant='outlined'
                                                onChange={(e) => handleChangeMedicationValues(index, {id: medication.id, generic_name: medication.generic_name, description: medication.description, unit: medication.unit, qty: e.target.value, instruction: medication.instruction})}
                                                value={medication.qty}
                                            />
                                        </td>
                                        <td valign='middle'>
                                            <TextField
                                                className="w-100"
                                                variant='outlined'
                                                onChange={(e) => handleChangeMedicationValues(index, {id: medication.id, generic_name: medication.generic_name, description: medication.description, unit: medication.unit, qty: medication.qty, instruction: e.target.value})}
                                                value={medication.instruction}
                                            />
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </DialogContent>
                    <DialogActions className="p-3">
                        {formik.values.medications.length !== 0 && <PrintRx appointment={formik.values.appointment} medicines={formik.values.medications}/> }
                        <Button variant="contained" color="error" onClick={() => handleModalState()}>Cancel</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};