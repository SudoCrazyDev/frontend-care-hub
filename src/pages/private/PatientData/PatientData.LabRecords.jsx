import React, { useEffect, useState } from "react";
import TabPanel from '@mui/joy/TabPanel';
import { CHDatePicker } from "../../../components/CHInputs/CareHubInputs";
import AddLaboratoryResult from "./components/LabRecords/AddLabResult";
import axios from "axios";
import { GetStatusBadge } from "../../../helpers/HelperFunctions";
import ViewLabResult from "./components/LabRecords/PatientData.LabRecords.ViewResult";


export default function PatientLabRecords({patientData}){
    const [labResults, setLabResults] = useState([]);

    const handleFetchLabResult = () => {
        axios.get(`patients/get_patient_laboratories/${patientData.id}`)
        .then(res => {
            console.log(res);
            setLabResults(res.data);
        })
    };

    useEffect(() => {
        handleFetchLabResult()
    }, []);
    return(
        <TabPanel value={1}>
            <div className="card-body bg-white rounded p-3 d-flex flex-row flex-wrap" style={{ minHeight: '300px'}}>
                <div className="d-flex flex-row align-items-center w-100">
                    <div className="col-3 d-flex flex-row gap-3">
                        <CHDatePicker label="Request Date" />
                    </div>
                    <div className="ms-auto">
                        <AddLaboratoryResult patientData={patientData} setLabResults={setLabResults}/>
                    </div>
                </div>
                <div className="col-12">
                    <table className="table table-bordered shadow-lg">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Result Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {labResults.map((labResult, index) => (
                                <tr key={index}>
                                    <td className="fw-bolder">{labResult.id}</td>
                                    <td>{labResult.result_date}</td>
                                    <td>{GetStatusBadge(labResult.status)}</td>
                                    <td>
                                        <ViewLabResult results={labResult}/>
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