import React, { useEffect, useState } from "react";
import TabPanel from '@mui/joy/TabPanel';
import { CHDatePicker } from "../../../components/CHInputs/CareHubInputs";
import AppointmentModal from "../Appointment/Appointment.modal";
import axios from "axios";
import AppointmentsTable from "./components/Appointments/PatientData.Appointments.Table";

export default function PatientAppointments({patientData}){
    const [appointments, setAppointments] = useState([]);
    const [fetching, setFetching] = useState(false);

    const handleFetchAppointments = () => {
        setFetching(true);
        axios.get(`appointments/get_appointment_by_patient/${patientData.id}`)
        .then(res => {
            setAppointments(res.data.appointments);
        })
        .finally(()=>{
            setFetching(false);
        })
    };

    useEffect(()=>{
        handleFetchAppointments();
    },[]);

    return(
        <TabPanel value={0}>
            <div className="card-body bg-white rounded p-3 d-flex flex-row flex-wrap" style={{ minHeight: '300px'}}>
                <div className="d-flex flex-row gap-3 w-100">
                    <CHDatePicker label="Request Date" />
                    <div className="d-flex flex-row justify-content-end m-auto w-100">
                        <AppointmentModal patientData={patientData} setAppointments={setAppointments}/>
                    </div>
                </div>
                <div className="col-12">
                    <AppointmentsTable appointments={appointments} fetching={fetching} setAppointments={setAppointments}/>
                </div>
            </div>
        </TabPanel>
    );
};