import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import { useEffect, useReducer, useState } from 'react';
import axios from "axios"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputLabel, TextField, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import LabRequest from '../../PatientData/components/LabRequest/LabRequest';
import CancelIcon from '@mui/icons-material/Cancel';
import LaboRatoryRequestPrintForm from '../../../../components/LaboratoryRequestPrintForm';
import { GetStatusBadge } from '../../../../helpers/HelperFunctions';

const NewAdmissionModal = ({formik, setAdmissions}) => {
    const [open, setOpen] = useState(false);
    const [admissionContent, setAdmissionContent] = useState("");
    
    const handleModalState = () => {
      setOpen(!open);
    };
    
    const handleAddAdmission = () => {
      formik.setValues({...formik.values, has_admission: 1, admission_content: admissionContent});
      setOpen(false);
      setAdmissionContent("");
      setAdmissions([{content: admissionContent}]);
    };
    
    return(
      <>
      <Button variant="contained" size='small' className='p-2 font-weight-bold ms-auto' onClick={handleModalState}>
        Add Admission
      </Button>
      <Dialog open={open} maxWidth="md" fullWidth>
        <DialogTitle className='fw-bolder text-uppercase'>New Admission</DialogTitle>
        <DialogContent dividers>
          <div className="d-flex flex-row">
            <div className="col-12">
              <TextField 
                fullWidth
                multiline
                rows={5}
                value={admissionContent}
                onChange={(event) => setAdmissionContent(event.target.value)}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions className='p-3'>
          <Button variant="contained" color='primary' onClick={() => handleAddAdmission()}>
            Save
          </Button>
          <Button variant='contained' color='error' onClick={handleModalState}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      </>
    );
};
export default function TabsPricingExample({formik, appointment}) {
  
  const selectedMedicineInit = {
    generic_name: '',
    unit: '',
    description: "",
    qty: 0,
    instruction: "",
  };

  const medicineError = {
    generic_name: false,
    unit: false,
    description: false,
    qty: false,
    instruction: false,
  };
  
  const selectedMedicineReducer = (state, action) => {
    switch (action.type) {
      case 'SET_SELECTED_MEDICINE':
        return {
          ...state,
          generic_name: action.payload.generic_name,
          unit: action.payload.unit.unit_name,
          description: action.payload.description
        };
      case 'SET_CUSTOM_BRAND':
        return{
          ...state,
          description: action.payload.description
        };
      case 'SET_CUSTOM_UNIT':
        return{
          ...state,
          unit: action.payload.unit,
        }
      case 'SET_QTY':
        return{
          ...state,
          qty: action.payload.qty,
        };
      case 'SET_INSTRUCTIONS':
        return{
          ...state,
          instruction: action.payload.instruction,
        }
      case 'CLEAR_SELECTED_MEDICINE':
          return selectedMedicineInit;
      default:
        return selectedMedicineInit;
  }};

  const AddMedicineErrorHandler = (state, action) => {
      switch (action.type){
        case 'ERROR_GENERIC_NAME':
          return {...state, generic_name: true};
        case 'ERROR_UNIT':
          return {...state, unit: true};
        case 'ERROR_QTY':
            return {...state, qty: true};
        case 'ERROR_INSTRUCTION':
            return {...state, instruction: true};
        case 'ERROR_BRAND':
            return {...state, description: true};
        case 'CLEAR_ERROR_GENERIC_NAME':
              return {...state, generic_name: false};
        case 'CLEAR_ERROR_UNIT':
              return {...state, unit: false};
        case 'CLEAR_ERROR_QTY':
              return {...state, qty: false};
        case 'CLEAR_ERROR_INSTRUCTION':
                return {...state, instruction: false};
        case 'CLEAR_ERROR_BRAND':
            return {...state, description: false};
        case 'CLEAR_ERRORS':
            return medicineError;
        default:
            return medicineError;
      }
  };
  const [appointments, setAppointments] = useState([]);
  const [laboratories, setLaboratories] = useState([]);
  const [searching, setSearching] = useState(false);
  const [medications, setMedications] = useState([]);
  const [medicines, setMedicines] = useState([{id: 0, generic_name: 'Atleast 3 Characters', unit: {unit_name: ''}}]);
  const [lastMedications, setLastMedications] = useState([]);
  const [admissions, setAdmissions] = useState([]);
  const [pdfAppointment, setPdfAppointment] = useState({});
  const [medicinesInput, setMedicinesInput] = useState("");
  const [selectedMedicineClear, setSelectedMedicineClear] = useState(false);
  const [state, dispatch] = useReducer(selectedMedicineReducer, selectedMedicineInit);
  const [errorState, errorDispatch] = useReducer(AddMedicineErrorHandler, medicineError);
  
  const handleFetchAppointments = () => {
        axios.get(`appointments/get_appointment_by_patient/${appointment.patient.id}`)
        .then(res => {
          let filteredComplaints = res.data.appointments.filter((appointment) => appointment.chief_complaint !== null && appointment.chief_complaint !== "");
          let sortByDate = filteredComplaints.sort((a ,b) => new Date(b.consultation_date) - new Date(a.consultation_date));
          setAppointments(sortByDate)
        })
  };
  
  const handleFetchLaboratories = () => {
    axios.get(`patients/get_patient_laboratories/${appointment.patient.id}`)
    .then(res => {
        let sortByDate = res.data.sort((a ,b) => new Date(b.created_at) - new Date(a.created_at));
        setLaboratories(sortByDate);
    });
  };
  
  const handleFetchAdmissions = () => {
    axios.get(`patients/get_patient_admissions/${appointment.patient.id}`)
    .then(res => {
      setAdmissions(res.data);
    });
  };
  
  const handleFetchLastMedications = () => {
    axios.get(`patients/get_patient_last_medications/${appointment.patient.id}`)
    .then((res) => {
      if(res.data.medicines !== '' && res.data.medicines !== null){
        setLastMedications(JSON.parse(res.data.medicines)); 
      }
    });
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
    if(state.generic_name === ''){
      errorDispatch({type: 'ERROR_GENERIC_NAME'});
      return ;
    }
    if(state.unit === ''){
      errorDispatch({type: 'ERROR_UNIT'});
      return;
    }
    if(state.description === ''){
      errorDispatch({type: 'ERROR_BRAND'});
      return;
    }
    if(state.qty === 0){
      errorDispatch({type: 'ERROR_QTY'});
      return;
    }
    if(state.instruction === ''){
      errorDispatch({type: 'ERROR_INSTRUCTION'});
      return;
    }
    setMedications([...medications, state]);
    dispatch({type: 'CLEAR_SELECTED_MEDICINE'});
    errorDispatch({type: 'CLEAR_ERROR'});
    formik.setFieldValue('medications', JSON.stringify([...medications, state]));
    setMedicines([{generic_name: 'Atleast 3 Characters', unit: {unit_name: ''}}]);
    setSelectedMedicineClear(!selectedMedicineClear);
  };
  
  const handleRemoveMedicine = (value) => {
    setMedications(medications.filter((medication, index) => index !== value));
  };

  const handleSameMeds = () => {
    setMedications([...medications, ...lastMedications]);
    formik.setFieldValue('medications', JSON.stringify([...medications, ...lastMedications]));
  };
  
  const handleChangeMedicationValues = (baseIndex, newValue) => {
      medications[baseIndex] = newValue;
      setMedications(medications);
      formik.setFieldValue('medications', JSON.stringify(medications));
  };
  
  useEffect(() => {
    handleFetchAppointments()
    handleFetchLaboratories()
    handleFetchAdmissions()
    handleFetchLastMedications()
  },[]);
  
  useEffect(() => {
    if(formik.values.has_lab_request && appointment.has_lab_request === 0){
        setPdfAppointment({
            patient:{
                firstname: formik.values.patient.firstname,
                lastname: formik.values.patient.lastname,
                address: formik.values.patient.address,
                birthdate: formik.values.patient.birthdate,
                gender: formik.values.patient.gender
            },
            lab_request: formik.values.lab_request,
        })
    }
}, [formik.values]);

//FOR UPDATING THE OUT PATIENT FORM
  const handleOutPatientFormForUpdate = () => {
    if(appointment.status !== 'Waiting for Billing') return
    axios.get(`appointments/get_appointment_out_patient/${appointment.id}`)
    .then(res => {
        let out_patient_meds = res.data[0].medicines;
        if(out_patient_meds !== null || out_patient_meds !== undefined){
          setMedications(JSON.parse(out_patient_meds))
          formik.setFieldValue('medications', out_patient_meds);
        }
        formik.setFieldValue('significant_findings', res.data[0].significant_findings);
        formik.setFieldValue('professional_fee', res.data[0].professional_fee);
        formik.setFieldValue('remarks', res.data[0].remarks);
        formik.setFieldValue('outpatient_id', res.data[0].id);
    });
    
  };
  
  useEffect(() => {
    handleOutPatientFormForUpdate();
  },[appointment]);
  
  return (
    <Tabs
      variant="outlined"
      aria-label="Pricing plan"
      defaultValue={0}
      sx={{
        width: '100%',
        borderRadius: 'lg',
        boxShadow: 'md',
        overflow: 'auto',
      }}
    >
      <TabList
        sx={{
          [`& .${tabClasses.root}`]: {
            fontSize: 'sm',
            fontWeight: 'lg',
            [`&[aria-selected="true"]`]: {
              color: 'primary.500',
              bgcolor: 'background.surface',
            },
            [`&.${tabClasses.focusVisible}`]: {
              outlineOffset: '-4px',
            },
          },
        }}
      >
        <Tab variant="soft" sx={{ flexGrow: 1 }} className="fw-bolder text-uppercase">
          History & Visits
        </Tab>
        <Tab variant="soft" sx={{ flexGrow: 1 }} className="fw-bolder text-uppercase">
          Laboratories
        </Tab>
        <Tab variant="soft" sx={{ flexGrow: 1 }} className={`fw-bolder text-uppercase ${formik.values.significant_findings === '' && 'bg-danger text-white'}`}>
          findings & medications
        </Tab>
        <Tab variant="soft" sx={{ flexGrow: 1 }} className="fw-bolder text-uppercase">
           Admissions
        </Tab>
        <Tab variant="soft" sx={{ flexGrow: 1 }} className={`fw-bolder text-uppercase ${formik.values.professional_fee === 0 && 'bg-danger text-white'}`}>
          Billing
        </Tab>
      </TabList>
      <TabPanel value={0}>
        <div className="p-4 d-flex flex-row">
            <table className="table table-bordered">
              <tbody align="center">
                {appointments.map((appointmentVal, index) => (
                  <tr key={index}>
                    <td valign='middle' className="text-center" style={{ width: '10%'}}>{appointmentVal.consultation_date} <CalendarMonthIcon fontSize="small" /></td>
                    <td valign='middle' align="start" style={{ width: '50%'}}>{appointmentVal.chief_complaint}</td>
                    <td valign='middle' className="fw-bolder h5"  style={{ width: '10%'}}>{String(appointmentVal.heart_rate).toLowerCase().includes('bpm') ? appointmentVal.heart_rate.toLowerCase() : `${appointmentVal.heart_rate} bpm`}</td>
                    <td valign='middle' className="fw-bolder h5"  style={{ width: '10%'}}>{String(appointmentVal.temperature).toLowerCase().includes('°C') ? appointmentVal.temperature.toLowerCase() : `${appointmentVal.temperature} °C`} </td>
                    <td valign='middle' className="fw-bolder h5"  style={{ width: '10%'}}>{String(appointmentVal.blood_pressure).toLowerCase().includes('mmhg') ? appointmentVal.blood_pressure.toLowerCase() : `${appointmentVal.blood_pressure} mmhg`}</td>
                    <td valign='middle' className="fw-bolder h5"  style={{ width: '10%'}}>{String(appointmentVal.weight).toLowerCase().includes('kg') ? appointmentVal.weight.toLowerCase() : `${appointmentVal.weight} kg`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </TabPanel>
      <TabPanel value={1}>
        <div className="p-4 d-flex flex-row flex-wrap">
            <div className="col-12 mb-2 d-flex flex-row justify-content-end">
              <LabRequest formik={formik} type="Add" />
            </div>
            <table className="table table-bordered">
              <tbody align="center">
              {formik.values.has_lab_request === 1 && (
                    <tr>
                        <td>----</td>
                        <td>{GetStatusBadge('pending')}</td>
                        <td>
                            {JSON.stringify(pdfAppointment) !== '{}' && (
                                <LaboRatoryRequestPrintForm appointment={pdfAppointment} />
                            )}
                            <Tooltip title="Cancel Request">
                                <IconButton color='primary' onClick={() => formik.setFieldValue('has_lab_request', 0)}>
                                        <CancelIcon />
                                </IconButton>
                            </Tooltip>
                        </td>
                    </tr>
                )}
                {laboratories.map((laboratory, index) => (
                  <>
                  {laboratory.type === 'Result' && (
                    <tr key={index}>
                      <td valign='middle' className="text-center" style={{ width: '10%'}}>{new Date(laboratory.created_at).toLocaleDateString('en-CA')}<CalendarMonthIcon fontSize="small" /></td>
                      <td valign='middle' align="start" style={{ width: '50%'}}>
                        
                        <div className="d-flex flex-row gap-2">
                        {laboratory.result_url !== null ? laboratory.result_url.split("::").map((labResult, index) => (
                            <img 
                              key={index} 
                              src={`${import.meta.env.VITE_STORAGE_URL}${labResult.replace('public', 'storage')}`} 
                              className="shadow border border-success rounded"
                              width={150}
                              height={150}
                              onClick={() => window.open(`${import.meta.env.VITE_STORAGE_URL}${labResult.replace('public', 'storage')}`)}
                              />
                        )) : (
                          <div className="d-flex flex-column gap-2">
                            <h2 className="m-0 fw-bolder text-dark">NO RESULTS UPLOADED</h2>
                          </div>
                        )}
                        </div>
                      </td>
                    </tr>
                  )}
                  </>
                ))}
              </tbody>
            </table>
        </div>
      </TabPanel>
      <TabPanel value={2}>
        <div className="p-4 d-flex flex-row flex-wrap">
            <div className="col-3 p-2">
                  <InputLabel className='text-dark fw-bold h2 text-uppercase'>Significant Findings/Remarks</InputLabel>
                  <TextField 
                      variant='outlined' 
                      fullWidth
                      multiline
                      rows={5}
                      {...formik.getFieldProps('significant_findings')}
                  />
            </div>
            <div className="col-9 p-2">
              <div className="d-flex flex-row mb-1 align-items-center">
                <InputLabel className='text-dark fw-bold h2 text-uppercase m-0'>Medications to Administer</InputLabel>
                <Button variant="contained" size="small" className='ms-auto' disabled={lastMedications.length === 0} onClick={handleSameMeds}>
                  Same Meds as Last Visit
                </Button>
              </div>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th style={{ width: '5%'}}></th>
                    <th style={{ width: '35%'}}>Medicine</th>
                    <th style={{ width: '15%'}}>Brand</th>
                    <th style={{ width: '10%'}}>Unit</th>
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
                          key={selectedMedicineClear}
                          options={medicines}
                          loading={searching}
                          getOptionLabel={(option) => `${option.generic_name} (${option.description}) - ${option.unit.unit_name}`}
                          getOptionDisabled={(option) => option.generic_name === 'Atleast 3 Characters'}
                          onChange={(event, newInputValue) => {
                            setMedicinesInput(`${newInputValue.generic_name} (${newInputValue.description}) - ${newInputValue.unit.unit_name}`);
                            dispatch({type: 'SET_SELECTED_MEDICINE', payload: newInputValue});
                            errorDispatch({type: 'CLEAR_ERROR_GENERIC_NAME'});
                          }}
                          renderInput={(params) => <TextField {...params} error={errorState.generic_name} helperText={errorState.generic_name ? "Please select Medicine" : ""} onChange={handleLookUpMedicine} value={medicinesInput} label="Medicine" />}
                        />
                    </td>
                    <td valign='middle'>
                        <TextField 
                            type='text'
                            value={state.description}
                            error={errorState.description}
                            helperText={errorState.description ? "Please put a brand" : ""}
                            onChange={(e) => {
                              dispatch({type: 'SET_CUSTOM_BRAND', payload: {description: e.target.value}});
                              errorDispatch({type: 'CLEAR_ERROR_BRAND'});
                            }}
                        />
                    </td>
                    <td valign='middle'>
                        <TextField 
                            type='text'
                            value={state.unit}
                            error={errorState.unit}
                            helperText={errorState.unit ? "Please put a unit" : ""}
                            onChange={(e) => {
                              dispatch({type: 'SET_CUSTOM_UNIT', payload: {unit: e.target.value}});
                              errorDispatch({type: 'CLEAR_ERROR_UNIT'});
                            }}
                        />
                    </td>
                    <td valign='middle'>
                      <TextField 
                        type='number'
                        value={state.qty}
                        error={errorState.qty}
                        helperText={errorState.qty ? "Please put a qty" : ""}
                        onChange={(e) => {
                          dispatch({type: 'SET_QTY', payload: {qty: e.target.value}});
                          errorDispatch({type: 'CLEAR_ERROR_QTY'});
                        }}
                      />
                    </td>
                    <td valign='middle'>
                      <TextField 
                        fullWidth
                        multiline
                        rows={2}
                        value={state.instruction}
                        error={errorState.instruction} 
                        helperText={errorState.instruction ? "Please put an instruction" : ""}
                        onChange={(e) => {
                          dispatch({type: 'SET_INSTRUCTIONS', payload: {instruction: e.target.value}});
                          errorDispatch({type: 'CLEAR_ERROR_INSTRUCTION'});
                        }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="d-none col-6 p-2">
            <InputLabel className='text-dark fw-bold h2 text-uppercase'>Last Medications</InputLabel>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th style={{ width: '25%'}}>Medicine</th>
                    <th style={{ width: '20%'}}>Unit</th>
                    <th style={{ width: '10%'}}>Qty</th>
                    <th>Instructions</th>
                  </tr>
                </thead>
                <tbody>
                  {lastMedications.map((medication, index) => (
                    <tr key={index}>
                      <td valign='middle'>
                          {`${medication.generic_name} (${medication.description})`}
                      </td>
                      <td valign='middle'>
                          {medication.unit}
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
            <div className="col-12 p-2">
            <InputLabel className='text-dark fw-bold h2 text-uppercase'>MEDICATIONS</InputLabel>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th style={{ width: '5%'}}></th>
                    <th style={{ width: '35%'}}>Medicine</th>
                    <th style={{ width: '15%'}}>Brand</th>
                    <th style={{ width: '10%'}}>Unit</th>
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
                          {`${medication.generic_name}`}
                      </td>
                      <td valign='middle'>
                          <TextField
                            type='text'
                            variant='outlined'
                            onChange={(e) => handleChangeMedicationValues(index, {...medication, description: e.target.value})}
                            value={medication.description}
                          />
                      </td>
                      <td valign='middle'>
                          <TextField
                            type='text'
                            variant='outlined'
                            onChange={(e) => handleChangeMedicationValues(index, {...medication, unit: e.target.value})}
                            value={medication.unit}
                          />
                      </td>
                      <td valign='middle'>
                          <TextField
                            type='number'
                            variant='outlined'
                            onChange={(e) => handleChangeMedicationValues(index, {...medication, qty: e.target.value})}
                            value={medication.qty}
                          />
                      </td>
                      <td valign='middle'>
                          <TextField
                            multiline={true}
                            fullWidth
                            variant='outlined'
                            onChange={(e) => handleChangeMedicationValues(index, {...medication, instruction: e.target.value})}
                            value={medication.instruction}
                          />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>
      </TabPanel>
      <TabPanel value={3}>
          <div className="p-4 d-flex flex-row flex-wrap gap-3">
            <NewAdmissionModal formik={formik} appointment={appointment} setAdmissions={setAdmissions}/>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th style={{ width: '25%'}}>Content</th>
                </tr>
              </thead>
              <tbody>
                {admissions.length === 0 && (
                  <tr>
                    <td colSpan={1}>NO ADMISSIONS YET</td>
                  </tr>
                )}
                
                {admissions.map((admission, index) => (
                    <tr key={index}>
                      <td>{admission.content}</td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
      </TabPanel>
      <TabPanel value={4}>
        <div className="p-4 d-flex flex-row flex-wrap">
          <div className="col-12">
            <InputLabel className='text-dark fw-bold h2 text-uppercase'>Professional Fee</InputLabel>
            <TextField variant="outlined" fullWidth type='number' {...formik.getFieldProps('professional_fee')}/>
          </div>
          <div className="col-12">
            <InputLabel className='text-dark fw-bold h2 text-uppercase'>Remarks</InputLabel>
            <TextField variant="outlined" fullWidth {...formik.getFieldProps('remarks')}/>
          </div>
        </div>
      </TabPanel>
    </Tabs>
  );
}