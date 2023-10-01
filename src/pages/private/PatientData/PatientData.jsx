import TabList from "@mui/joy/TabList/TabList";
import Tabs from "@mui/joy/Tabs/Tabs";
import Tab from '@mui/joy/Tab';
import { Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import { GetPatients } from "../../../helpers/HelperRedux";
import { useEffect, useMemo, useState } from "react";
import { CapitalizeFirstLetter, calculateAgeWithMonths } from "../../../helpers/HelperFunctions";
import PatientLabRecords from "./PatientData.LabRecords";
import PatientAppointments from "./PatientData.Appointments";
import axios from "axios";
import PatientMedicines from "./PatientData.Medicines";

export default function PatientData(){
    const {patientId} = useParams();
    const patients = GetPatients();
    const [patientPhoto, setPatientPhoto] = useState("/assets/svg/maleUser.svg");

    const patientData = useMemo(() => {
        let foundPatient = patients.find(patient => patient.id == patientId);
        return foundPatient  || PatientModel;
    },[patients, patientId]);
    
    const handleFetchPatientPhoto = () => {
        axios.get(`patients/get_patient_photo/${patientId}`)
        .then(res => {
            let stringUrl = res.data;
            setPatientPhoto(stringUrl);
            // setPatientPhoto(stringUrl.replace('storage','storage'));
        })
    };

    useEffect(() => {
        handleFetchPatientPhoto()
    },[]);

    return(
        <div className="row">
            <div className="col-12 d-flex flex-row">
                <div className="d-flex flex-column gap-2">
                    <h2 className="m-0 fw-bolder">{patientData.lastname}, {patientData.firstname}</h2>
                    <h5 className="m-0 fw-normal text-muted">{patientData.address}</h5>
                    <div className="d-flex flex-row gap-3">
                        <h5 className="m-0 fw-normal text-muted">SEX:</h5>
                        <h5 className="m-0 fw-bolder">{CapitalizeFirstLetter(patientData.gender)}</h5>
                        <h5 className="m-0 fw-normal text-muted">CIVIL STATUS:</h5>
                        <h5 className="m-0 fw-bolder">{patientData.civil_status}</h5>
                    </div>
                    <div className="d-flex flex-row gap-3">
                        <h5 className="m-0 fw-normal text-muted">BIRTHDATE:</h5>
                        <h5 className="m-0 fw-bolder">{patientData.birthdate === null || patientData.birthdate === '' ? 'NO BIRTHDATE' : new Date(patientData.birthdate).toLocaleDateString('en-CA')}</h5>
                        <h5 className="m-0 fw-normal text-muted">AGE:</h5>
                        <h5 className="m-0 fw-bolder">{calculateAgeWithMonths(patientData.birthdate).age} years old</h5>
                    </div>
                </div>
                {patientPhoto === "/assets/svg/maleUser.svg" ? (
                    <div className="ms-auto border rounded border-light shadow-lg" style={{ height: '180px', width: '250px', background: `url('/assets/svg/maleUser.svg')`, backgroundSize: `contain`, borderRadius: '10px'}}>

                    </div>
                ) 
                : (
                    <div className="ms-auto border rounded border-light shadow-lg" style={{ height: '180px', width: '250px', background: `url('${patientPhoto}')`, backgroundSize: `cover`, borderRadius: '10px'}}>

                    </div>
                )
                    
                }
                
            </div>
            <Divider className="my-3"/>
            <div className="col-12">
                <Tabs size="lg" className="rounded" defaultValue={0} style={{ background: '#f4e9e6'}}>
                    <TabList variant="soft" color="primary">
                        <Tab className="fw-bolder">APPOINTMENTS</Tab>
                        <Tab className="fw-bolder">LABORATORIES</Tab>
                        <Tab className="fw-bolder">MEDICINES</Tab>
                    </TabList>
                    <PatientAppointments patientData={patientData}/>
                    <PatientLabRecords patientData={patientData}/>
                    <PatientMedicines patientData={patientData}/>
                </Tabs>
            </div>
            
        </div>
    );
};