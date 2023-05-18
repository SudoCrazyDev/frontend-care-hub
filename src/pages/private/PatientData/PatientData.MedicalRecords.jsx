import React from "react";
import TabPanel from '@mui/joy/TabPanel';
import { GenerateFakeMedicalRecord } from "../../../helpers/models/MedicalRecord.Model";
import { FilterTextInput } from "../../../components/CHInputs/CareHubInputs";
import SearchIcon from '@mui/icons-material/Search';

export default function PatientMedicalRecords(){
    const medicalRecords = GenerateFakeMedicalRecord();

    return(
        <TabPanel value={0}>
            <div className="card-body bg-white rounded p-3 d-flex flex-row flex-wrap" style={{ minHeight: '300px'}}>
                <div className="col-12 d-flex flex-row">
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
                </div>
                <div className="col-12">
                    <table className="table table-striped table-bordered shadow-lg">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Requested Date</th>
                                <th>Result Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {medicalRecords.map((record, i) => (
                                <tr key={i}>
                                    <td>{record.id}</td>
                                    <td>{record.requested_date}</td>
                                    <td>{record.result_date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </TabPanel>
    );
};