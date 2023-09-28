import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import { useEffect, useState } from 'react';
import axios from "axios"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputLabel, TextField, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import LabRequest from '../../PatientData/components/LabRequest/LabRequest';
import CancelIcon from '@mui/icons-material/Cancel';
import LaboRatoryRequestPrintForm from '../../../../components/LaboratoryRequestPrintForm';
import { PDFDownloadLink } from "@react-pdf/renderer";
import { GetStatusBadge } from '../../../../helpers/HelperFunctions';
import PrintIcon from '@mui/icons-material/Print';

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
  const [appointments, setAppointments] = useState([]);
  const [laboratories, setLaboratories] = useState([]);
  const [searching, setSearching] = useState(false);
  const [medications, setMedications] = useState([]);
  const [outPatients, setOutPatients] = useState([]);
  const [medicines, setMedicines] = useState([{id: 0, generic_name: 'Atleast 3 Characters', unit: {unit_name: ''}}]);
  const [selectedMedicine, setSelectedMedicine] = useState({unit:{}});
  const [selectedMedicineValue, setSelectedMedicineValue] = useState(0);
  const [selectedMedicineInstruction, setSelectedMedicineInstruction] = useState("");
  const [selectedMedicineUnit, setSelectedMedicineUnit] = useState("");
  const [lastMedications, setLastMedications] = useState([]);
  const [admissions, setAdmissions] = useState([]);
  const [pdfAppointment, setPdfAppointment] = useState({});
  const [medicinesInput, setMedicinesInput] = useState("");
  const [selectedMedicineClear, setSelectedMedicineClear] = useState(false);
  
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
    setMedicines([{id: 0, generic_name: 'Atleast 3 Characters', unit: {unit_name: ''}}]);
    setMedicinesInput("");
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
    setMedications([...medications.filter((medication, index) => index !== baseIndex), newValue]);
    formik.setFieldValue('medications', JSON.stringify([...medications.filter((medication, index) => index !== baseIndex), newValue]));
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

console.log(medications);
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
        <Tab variant="soft" sx={{ flexGrow: 1 }} className="fw-bolder text-uppercase">
          findings & medications
        </Tab>
        <Tab variant="soft" sx={{ flexGrow: 1 }} className="fw-bolder text-uppercase">
           Admissions
        </Tab>
        <Tab variant="soft" sx={{ flexGrow: 1 }} className="fw-bolder text-uppercase">
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
                                <PDFDownloadLink document={<LaboRatoryRequestPrintForm appointment={pdfAppointment}/>} fileName={`LabRequestForm-${formik.values.patient.lastname}.pdf`}>
                                    {
                                        ({blob, url, loading, error}) => loading ? 'Loading Document...' : 
                                        <Tooltip title="Print Lab Request">
                                            <IconButton color="primary" size="small" onClick={() => window.open(url)}>
                                                    <PrintIcon />
                                            </IconButton>
                                        </Tooltip>
                                    }
                                </PDFDownloadLink>
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
            <div className="col-4 p-2">
                  <InputLabel className='text-dark fw-bold h2 text-uppercase'>Significant Findings/Remarks</InputLabel>
                  <TextField 
                      variant='outlined' 
                      fullWidth
                      multiline
                      rows={5}
                      {...formik.getFieldProps('significant_findings')}
                  />
            </div>
            <div className="col-8 p-2">
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
                          key={selectedMedicineClear}
                          options={medicines}
                          loading={searching}
                          getOptionLabel={(option) => `${option.generic_name} (${option.description}) - ${option.unit.unit_name}`}
                          getOptionDisabled={(option) => option.generic_name === 'Atleast 3 Characters'}
                          onChange={(event, newInputValue) => {
                            setSelectedMedicine(newInputValue);
                            setMedicinesInput(`${newInputValue.generic_name} (${newInputValue.description}) - ${newInputValue.unit.unit_name}`);
                          }}
                          renderInput={(params) => <TextField {...params} onChange={handleLookUpMedicine} value={medicinesInput} label="Medicine" />}
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
                    <th style={{ width: '45%'}}>Medicine</th>
                    <th style={{ width: '8%'}}>Qty</th>
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
                          <TextField
                            type='number'
                            variant='outlined'
                            onChange={(e) => handleChangeMedicationValues(index, {id: medication.id, generic_name: medication.generic_name, description: medication.description, unit: medication.unit, qty: e.target.value, instruction: medication.instruction})}
                            value={medication.qty}
                          />
                      </td>
                      <td valign='middle'>
                          <TextField
                            multiline={true}
                            fullWidth
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