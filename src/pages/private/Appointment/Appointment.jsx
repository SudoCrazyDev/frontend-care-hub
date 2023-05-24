import { Button, Divider, TextField, Tooltip } from "@mui/material";
import AppointmentModal from "./Appointment.modal";
import FluentTable from "../../../components/FluentTable/FluentTable";
import FluentTableHeader from "../../../components/FluentTable/components/FluentTable.Header";
import FluentTableBody from "../../../components/FluentTable/components/FluentTable.Body";
import FluentTableRow from "../../../components/FluentTable/components/FluentTable.Row";
import { CHTableIconButton } from "../../../components/CHButtons/CareHubButtons";
import {faker} from "@faker-js/faker";
import TopicIcon from '@mui/icons-material/Topic';
import { GetPatients } from "../../../helpers/HelperRedux";
import { FilterTextInput } from "../../../components/CHInputs/CareHubInputs";
import { CHDatePicker } from "../../../components/CHInputs/CareHubInputs";

const randomPatients = Array(15).fill().map((_, i) => ({
    name: faker.name.fullName(),
    consultationDate: faker.date.recent(),
    status: faker.helpers.arrayElement(['Pending', 'Confirmed', 'Cancelled']),
}))

export default function Appointments(){
    const patients = GetPatients();
    return(
        <div className="card shadow-lg border-0 h-100">
            <div className="card-body">
                <div className="row">
                    <div className="d-flex flex-row">
                        <h2 className="m-0 text-uppercase fw-bolder">Appointments</h2>
                        <div className="ms-auto">
                            <AppointmentModal />
                        </div>
                    </div>
                    <Divider className="my-3"/>
                    <div className="d-flex flex-row flex-wrap">
                        <div className="d-flex flex-row gap-3">
                            <FilterTextInput size="lg" type="text" label="Patient Name"/>
                            <CHDatePicker />
                        </div>
                        <div className="col-12 mx-h-50 overflow-y-scroll">
                            <FluentTable>
                                <FluentTableHeader>
                                    <tr>
                                        <th>Priority #</th>
                                        <th>PATIENT NAME</th>
                                        <th></th>
                                    </tr>
                                </FluentTableHeader>
                                <FluentTableBody>
                                    {patients.map((patient, index) => (
                                        <FluentTableRow key={index}>
                                            <td>{index}</td>
                                            <td>{patient.firstname} {patient.lastname}</td>
                                            <td>
                                                <Tooltip title="View Patiend Data">
                                                    <CHTableIconButton size="small">
                                                        <TopicIcon className="ch-primary"/>
                                                    </CHTableIconButton>
                                                </Tooltip>
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