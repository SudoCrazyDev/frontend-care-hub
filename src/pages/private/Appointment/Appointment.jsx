import { Button, Divider, TextField } from "@mui/material";
import FluentTable from "../../../components/FluentTable/FluentTable";
import FluentTableHeader from "../../../components/FluentTable/components/FluentTable.Header";
import FluentTableBody from "../../../components/FluentTable/components/FluentTable.Body";
import FluentTableRow from "../../../components/FluentTable/components/FluentTable.Row";
import { FilterTextInput } from "../../../components/CHInputs/CareHubInputs";
import { CHDatePicker } from "../../../components/CHInputs/CareHubInputs";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { GetStatusBadge } from "../../../helpers/HelperFunctions";
import CancelAppointment from "../PatientData/components/Appointments/CancelAppointment";
import ViewAppointment from "../PatientData/components/Appointments/ViewAppointment";
import ViewOutPatientResult from "../PatientData/components/Appointments/ViewAppointment.OutPatient";
import UpdateAppointment from "./Appointment.Update";
import OutPatient from "../OutPatient/OutPatient";

export default function Appointments(){
    const [appointments, setAppointments] = useState([]);
    const [search, setSearch] = useState("");
    const [reFetching, setRefetching] = useState(false);
    
    const handleFetchAppointments = () => {
        axios.get(`appointments/get_appointments_by_date/${new Date().toLocaleDateString('en-CA')}`)
        .then(res => {
            setAppointments(res.data);
        })
    };

    const handleRefetchAppointments = () => {
        setRefetching(true);
        axios.get(`appointments/get_appointments_by_date/${new Date().toLocaleDateString('en-CA')}`)
        .then(res => {
            setAppointments(res.data);
        })
        .finally(() => {
            setRefetching(false);
        })
    };
    
    const handleDateChange = (event) => {
        axios.get(`appointments/get_appointments_by_date/${new Date(event.$d.toString()).toLocaleDateString('en-CA')}`)
        .then(res => {
            setAppointments(res.data);
        })
    };

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const noCancelledAppointments = useMemo(() => {
        return appointments.filter(appointment => appointment.status !== 'cancelled');
    }, [appointments]);
    
    const filteredAppointments = useMemo(() => {
        return search === "" ? noCancelledAppointments : noCancelledAppointments.filter(appointment => String(appointment.patient.lastname).toUpperCase().includes(String(search).toUpperCase()));
    }, [noCancelledAppointments, search]);

    useEffect(()=>{
        handleFetchAppointments()
    },[]);

    return(
        <div className="card shadow-lg border-0 h-100">
            <div className="card-body">
                <div className="row">
                    <div className="d-flex flex-row">
                        <h2 className="m-0 text-uppercase fw-bolder">Appointments</h2>
                    </div>
                    <Divider className="my-3"/>
                    <div className="d-flex flex-row flex-wrap">
                        <div className="d-flex flex-row gap-3">
                            <FilterTextInput size="lg" type="text" label="Patient Name" onChange={handleSearch}/>
                            <CHDatePicker 
                                onChange={handleDateChange}
                                textField={(
                                    <TextField
                                        fullWidth
                                    />
                                )}
                            />
                            <div className="align-self-center">
                                <Button className="fw-bolder" variant="contained" color="primary" onClick={() => handleRefetchAppointments()} disabled={reFetching}>Refresh {reFetching && <span className="m-1 p-1 spinner-border spinner-border-sm"></span>}</Button>
                            </div>
                        </div>
                        <div className="col-12 mx-h-50 overflow-y-scroll">
                            <FluentTable>
                                <FluentTableHeader>
                                    <tr>
                                        <th width={'1%'}>#</th>
                                        <th>PATIENT</th>
                                        <th></th>
                                    </tr>
                                </FluentTableHeader>
                                <FluentTableBody>
                                    {filteredAppointments.length === 0 && (
                                        <FluentTableRow>
                                            <td colSpan={5} className="fw-bold">NO APPOINTMENTS FOR TODAY</td>
                                        </FluentTableRow>
                                    )}
                                    {filteredAppointments.map((appointment, index) => (
                                        <FluentTableRow key={index}>
                                            <td>{index + 1}</td>
                                            <td className="align-middle fw-bolder text-uppercase">{appointment.patient.firstname} {appointment.patient.lastname}</td>
                                            <td>
                                                
                                                <OutPatient appointment={appointment} setAppointments={setAppointments}/>
                                                { appointment.status === 'complete' || appointment.status === 'Waiting for Billing' && (
                                                    <ViewOutPatientResult current_appointment={appointment} setAppointments={setAppointments}/>
                                                )}
                                                <ViewAppointment appointment={appointment} />
                                                <UpdateAppointment appointment={appointment} setAppointments={setAppointments}/>
                                                {appointment.status !== 'complete' && (
                                                  <CancelAppointment appointment={appointment} setAppointments={setAppointments}/>
                                                )}
                                            </td>
                                        </FluentTableRow>
                                    ))}
                                </FluentTableBody>
                            </FluentTable>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};