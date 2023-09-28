import React, { useEffect, useState } from "react";
import TabPanel from '@mui/joy/TabPanel';
import AddLaboratoryResult from "./components/LabRecords/AddLabResult";
import axios from "axios";
import ViewLabResult from "./components/LabRecords/PatientData.LabRecords.ViewResult";
import PatientDataAddLabRequest from "./PatientData.AddLabRequest";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { IconButton, Tooltip } from "@mui/material";
import PrintIcon from '@mui/icons-material/Print';
import LaboRatoryRequestPrintForm from "../../../components/LaboratoryRequestPrintForm";

export default function PatientLabRecords({patientData}){
    const [labResults, setLabResults] = useState([]);

    const handleFetchLabResult = () => {
        axios.get(`patients/get_patient_laboratories/${patientData.id}`)
        .then(res => {
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
                    <div className="ms-auto d-flex flex-row gap-2">
                        <AddLaboratoryResult patientData={patientData} setLabResults={setLabResults}/>
                        <PatientDataAddLabRequest patientData={patientData} setLabResults={setLabResults}/>
                    </div>
                </div>
                <div className="col-12 my-3">
                    <table className="table table-bordered shadow-lg">
                        <thead>
                            <tr>
                                <th>LABORATORY TYPE</th>
                                <th>DATE</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {labResults.map((labResult, index) => (
                                <tr key={index}>
                                    <td className="fw-bolder">{String(labResult.type).toUpperCase()}</td>
                                    <td>{labResult.result_date}</td>
                                    <td>
                                        {labResult.type === 'Result' && (
                                          <ViewLabResult results={labResult}/>  
                                        )}
                                        {/* {labResult.status !== 'complete' && (
                                          <LabRequestResultUpload laboratory={labResult}/>  
                                        )} */}
                                        {labResult.type === 'Request' && (
                                            // <PDFDownloadLink document={<LaboRatoryRequestPrintForm appointment={{patient:{firstname: patientData.firstname, lastname: patientData.lastname, address: patientData.address, birthdate: patientData.address, gender: patientData.gender}, lab_request: JSON.parse(labResult.form_details)}}/>} fileName={`LabRequestForm-${patientData.lastname}.pdf`}>
                                            //     {
                                            //         ({blob, url, loading, error}) => loading ? 'Loading Document...' : 
                                            //         <Tooltip title="Print Lab Request">
                                            //             <IconButton color="primary" size="small" onClick={() => window.open(url)}>
                                            //                     <PrintIcon />
                                            //             </IconButton>
                                            //         </Tooltip>
                                            //     }
                                            // </PDFDownloadLink>
                                            <LaboRatoryRequestPrintForm appointment={{patient:{firstname: patientData.firstname, lastname: patientData.lastname, address: patientData.address, birthdate: patientData.birthdate, gender: patientData.gender}, lab_request: JSON.parse(labResult.form_details)}}/>
                                        )}
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