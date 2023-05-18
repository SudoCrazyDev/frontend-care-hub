import { Divider, TextField, Tooltip } from "@mui/material";
import PatientModal from "./Patient.modal";
import FluentTable from "../../../components/FluentTable/FluentTable";
import FluentTableHeader from "../../../components/FluentTable/components/FluentTable.Header";
import FluentTableBody from "../../../components/FluentTable/components/FluentTable.Body";
import FluentTableRow from "../../../components/FluentTable/components/FluentTable.Row";
import TopicIcon from '@mui/icons-material/Topic';
import { CHTableIconButton } from "../../../components/CHButtons/CareHubButtons";
import { GetPatients } from "../../../helpers/HelperRedux";
import { NavLink } from "react-router-dom";

export default function Patients(){
    const patients = GetPatients();

    return(
        <div className="card shadow-lg border-0">
            <div className="card-body">
                <div className="d-flex flex-row">
                    <h2 className="m-0 text-uppercase fw-bolder">List of Patients</h2>
                    <div className="ms-auto">
                        <PatientModal />
                    </div>
                </div>
                <Divider className="my-3"/>
                <div className="d-flex flex-row flex-wrap">
                    <div className="m-2 d-flex flex-row">
                        <TextField size="small" variant="outlined" type="text" label="Patient Name"/>
                    </div>
                    <div className="col-12 mx-h-50 overflow-y-scroll">
                        <FluentTable>
                            <FluentTableHeader>
                                <tr>
                                    <th>PATIENT CODE</th>
                                    <th>PATIENT NAME</th>
                                    <th></th>
                                </tr>
                            </FluentTableHeader>
                            <FluentTableBody>
                                {patients.map((patient, index) => (
                                    <FluentTableRow key={index}>
                                        <td width={`35%`} className="fw-bolder">{patient.patient_code}</td>
                                        <td width={`55%`}>{patient.firstname} {patient.lastname}</td>
                                        <td width={`10%`}>
                                            <Tooltip title="View Patient Data">
                                                <NavLink to={`/patients/${patient.patient_code}`}>
                                                    <CHTableIconButton size="small">
                                                        <TopicIcon className="ch-primary"/>
                                                    </CHTableIconButton>
                                                </NavLink>
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
    );
};