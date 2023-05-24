import React from "react";
import TabPanel from '@mui/joy/TabPanel';
import { GenerateFakeMedicalRecord } from "../../../helpers/models/MedicalRecord.Model";
import SearchIcon from '@mui/icons-material/Search';
import { CHDatePicker, FilterTextInput } from "../../../components/CHInputs/CareHubInputs";

export default function PatientAppointments(){
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
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </TabPanel>
    );
};