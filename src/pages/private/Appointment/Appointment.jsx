import { Divider, TextField } from "@mui/material";
import FluentTable from "../../../components/FluentTable/FluentTable";
import FluentTableHeader from "../../../components/FluentTable/components/FluentTable.Header";
import FluentTableBody from "../../../components/FluentTable/components/FluentTable.Body";
import FluentTableRow from "../../../components/FluentTable/components/FluentTable.Row";
import { GetPatients } from "../../../helpers/HelperRedux";
import { FilterTextInput } from "../../../components/CHInputs/CareHubInputs";
import { CHDatePicker } from "../../../components/CHInputs/CareHubInputs";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { GetStatusBadge } from "../../../helpers/HelperFunctions";
import CancelAppointment from "../PatientData/components/Appointments/CancelAppointment";
import ViewAppointment from "../PatientData/components/Appointments/ViewAppointment";
import OutPatientModal from "../OutPatient/OutPatient";
import ViewOutPatientResult from "../PatientData/components/Appointments/ViewAppointment.OutPatient";

export default function Appointments(){
    const [appointments, setAppointments] = useState([]);
    const [filterDate, setFilterDate] = useState(new Date().toLocaleDateString('en-CA'));

    const handleFetchAppointments = () => {
        axios.get('appointments/get_all_appointments')
        .then(res => {
            setAppointments(res.data);
        })
    };

    const handleDateChange = (event) => {
        setFilterDate(new Date(event.$d.toString()).toLocaleDateString('en-CA'))
    };

    const filteredAppointments = useMemo(()=>{
        return appointments.filter(appointment => {
            return appointment.consultation_date === filterDate;
        });
    },[appointments,filterDate]);

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
                            <FilterTextInput size="lg" type="text" label="Patient Name"/>
                            <CHDatePicker 
                            onChange={handleDateChange}
                            textField={(
                                <TextField
                                    fullWidth
                                    value={filterDate}
                                />
                            )}
                            />
                        </div>
                        <div className="col-12 mx-h-50 overflow-y-scroll">
                            <FluentTable>
                                <FluentTableHeader>
                                    <tr>
                                        <th width={'1%'}>#</th>
                                        <th>PATIENT</th>
                                        <th>LABORATORY REQUEST</th>
                                        <th>STATUS</th>
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
                                            <td className="align-middle h5">{
                                                appointment.has_lab_request ?
                                                <span className="badge bg-success">Yes</span>
                                                :
                                                <span className="badge bg-danger">No</span>
                                                }
                                            </td>
                                            <td className="align-middle h5">
                                                {GetStatusBadge(appointment.status)}
                                            </td>
                                            <td>
                                                {appointment.status === 'pending' && <OutPatientModal appointment={appointment} setAppointments={setAppointments}/>}
                                                {appointment.status === 'complete' && <ViewOutPatientResult appointment={appointment}/>}
                                                <ViewAppointment appointment={appointment} />
                                                {appointment.status === 'pending' && <CancelAppointment appointment={appointment} setAppointments={setAppointments}/>}
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