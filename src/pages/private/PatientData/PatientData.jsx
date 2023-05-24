import TabList from "@mui/joy/TabList/TabList";
import Tabs from "@mui/joy/Tabs/Tabs";
import Tab from '@mui/joy/Tab';
import { Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import { GetPatients } from "../../../helpers/HelperRedux";
import { useMemo } from "react";
import { calculateAgeWithMonths } from "../../../helpers/HelperFunctions";
import { PatientModel } from "../../../helpers/models/Patient.Model";
import PatientLabRecords from "./PatientData.LabRecords";
import PatientAppointments from "./PatientData.Appointments";

export default function PatientData(){
    const {patientId} = useParams();
    const patients = GetPatients();

    const patientData = useMemo(() => {
        let foundPatient = patients.find(patient => patient.patient_code == patientId);
        return foundPatient  || PatientModel;
    },[patients, patientId]);
    
    return(
        <div className="row">
            <div className="col-12 d-flex flex-row">
                <div className="d-flex flex-column gap-2">
                    <h2 className="m-0 fw-bolder">{patientData.lastname}, {patientData.firstname}</h2>
                    <h5 className="m-0 fw-normal text-muted">{patientData.address}</h5>
                    <div className="d-flex flex-row gap-3">
                        <h5 className="m-0 fw-normal text-muted">SEX:</h5>
                        <h5 className="m-0 fw-bolder">{patientData.gender}</h5>
                        <h5 className="m-0 fw-normal text-muted">CIVIL STATUS:</h5>
                        <h5 className="m-0 fw-bolder">{patientData.civil_status}</h5>
                    </div>
                    <div className="d-flex flex-row gap-3">
                        <h5 className="m-0 fw-normal text-muted">BIRTHDATE:</h5>
                        <h5 className="m-0 fw-bolder">{new Date(patientData.birthdate).toLocaleDateString('en-CA')}</h5>
                        <h5 className="m-0 fw-normal text-muted">AGE:</h5>
                        <h5 className="m-0 fw-bolder">{calculateAgeWithMonths(patientData.birthdate).age} years and {calculateAgeWithMonths(patientData.birthdate).months} months</h5>
                    </div>
                    <div className="d-flex flex-row gap-3">
                        <h5 className="m-0 fw-normal text-muted">LIST VIST:</h5>
                        <h5 className="m-0 fw-bolder">54 Yrs, 2 Months</h5>
                    </div>
                </div>
                <div className="ms-auto border rounded border-light shadow-lg" style={{ height: '200px', width: '250px', background: "url('/assets/svg/maleUser.svg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', borderRadius: '10px'}}>

                </div>
            </div>
            <Divider className="my-3"/>
            <div className="col-12">
                <Tabs size="lg" className="rounded" defaultValue={0} style={{ background: '#f4e9e6'}}>
                    <TabList variant="soft" color="primary">
                        <Tab className="fw-bolder">LABORATORY RECORDS</Tab>
                        <Tab className="fw-bolder">APPOINTMENTS</Tab>
                    </TabList>
                    <PatientLabRecords />
                    <PatientAppointments />
                </Tabs>
            </div>
            
        </div>
    );
};