import React from "react";
import TabPanel from '@mui/joy/TabPanel';
import { GenerateFakeMedicalRecord } from "../../../helpers/models/MedicalRecord.Model";
import SearchIcon from '@mui/icons-material/Search';
import { CHDatePicker, FilterTextInput } from "../../../components/CHInputs/CareHubInputs";
import LabRequest from "./components/LabRequest/LabRequest";
import ViewLabRequest from "./PatientData.ViewLabRequest";
import LabResult from "./components/LabResult/LabResult";

export default function PatientLabRecords(){
    const medicalRecords = GenerateFakeMedicalRecord();
    return(
        <TabPanel value={1}>
            <div className="card-body bg-white rounded p-3 d-flex flex-row flex-wrap" style={{ minHeight: '300px'}}>
                <div className="d-flex flex-row gap-3 w-100">
                    <div className="d-flex flex-row gap-3 w-100">
                        <FilterTextInput 
                            variant="outlined" 
                            label="Search" 
                            className="my-2" 
                            InputProps={{
                                endAdornment: (
                                    <SearchIcon />
                                )
                            }}
                        />
                        <CHDatePicker label="Request Date" />
                    </div>
                    <div className="d-flex flex-row justify-content-end m-auto w-100">
                        <LabRequest />
                    </div>
                </div>
                <div className="col-12">
                    <table className="table table-bordered shadow-lg">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Requested Date</th>
                                <th>Result Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {medicalRecords.map((record, i) => (
                                <tr key={i}>
                                    <td>{record.id}</td>
                                    <td>{record.requested_date}</td>
                                    <td>{record.result_date}</td>
                                    <td><span className="badge text-bg-secondary">Pending</span></td>
                                    <td>
                                        <ViewLabRequest />
                                        <LabResult />
                                        <LabResult type="View" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </TabPanel>
    );
};