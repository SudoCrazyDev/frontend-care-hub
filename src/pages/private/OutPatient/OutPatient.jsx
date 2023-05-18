import React from "react";
import { Divider, TextField, Tooltip } from "@mui/material";
import AutoDynamicModalBuilder from "../../../components/AutoDynamicModalBuilder/AutoDynamicModalBuilder";
import FluentTable from "../../../components/FluentTable/FluentTable";
import FluentTableHeader from "../../../components/FluentTable/components/FluentTable.Header";
import FluentTableBody from "../../../components/FluentTable/components/FluentTable.Body";
import FluentTableRow from "../../../components/FluentTable/components/FluentTable.Row";
import { CHTableIconButton } from "../../../components/CHButtons/CareHubButtons";
import {faker} from "@faker-js/faker";
import TopicIcon from '@mui/icons-material/Topic';

const createFieldData = (id = 'NO ID', componentType = 'textfield', type = 'text', label = 'NO LABEL', placeholder = 'NO PLACEHOLDER', required = false, disabled = false, singleColumn = false) => {
    return {
        id: id,
        componentType: componentType,
        type: type,
        label: label,
        placeholder: placeholder,
        required: required,
        disabled: disabled,
        singleColumn: singleColumn
    };
};
const modalConfigs = {
    title: 'In-Patient',
    type: 'New',
    dialogMaxWidth: 'md',
    dialogFullWidth: true,
    fields: [
        createFieldData('hospital_name', 'textfield', 'text', 'HOSPITAL', 'HOSPITAL'),
        createFieldData('hospital_name', 'textfield', 'text', 'PATIENT', 'PATIENT FULL NAME'),
        createFieldData('hospital_name', 'textfield', 'text', 'DATE ADMITTED', 'DATE ADMITTED/REFERRED'),
        createFieldData('hospital_name', 'textfield', 'text', 'DATE DISCHARGED', 'DATE DISCHARGED'),
        createFieldData('hospital_name', 'textfield', 'text', 'ATTENDING PHYSICIAN', 'ATTENDING PHYSICIAN'),
        createFieldData('hospital_name', 'textfield', 'text', 'REMARKS', 'REMARKS'),
    ]
};

const randomPatients = Array(15).fill().map((_, i) => ({
    name: faker.name.fullName(),
    hospital: `${faker.name.fullName()} Hospital`,
    date_admitted: faker.date.past(),
    date_discharged: faker.date.recent(),
    attending_physician: faker.name.fullName(),
}))

export default function OutPatient(){
    return(
        <div className="card h-100">
            <div className="card-body h-100">
                <div className="row">
                    <div className="col-12 d-flex flex-row">
                        <h2 className="m-0 text-dark fw-bolder">Out-Patients</h2>
                        {/* <InPatientModal /> */}
                        <div className="ms-auto">
                            <AutoDynamicModalBuilder config={modalConfigs}/>
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
                                        <th>PATIENT NAME</th>
                                        <th>ATTENDING PHYSICIAN</th>
                                        <th>HOSPITAL</th>
                                        <th>DATE ADMITTED</th>
                                        <th>DATE DISCHARGED</th>
                                        <th></th>
                                    </tr>
                                </FluentTableHeader>
                                <FluentTableBody>
                                    {randomPatients.map((patient, index) => (
                                        <FluentTableRow key={index}>
                                            <td>{patient.name}</td>
                                            <td>{patient.attending_physician}</td>
                                            <td>{patient.hospital} </td>
                                            <td>{new Date(patient.date_admitted).toLocaleDateString()}</td>
                                            <td>{new Date(patient.date_discharged).toLocaleDateString()}</td>
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