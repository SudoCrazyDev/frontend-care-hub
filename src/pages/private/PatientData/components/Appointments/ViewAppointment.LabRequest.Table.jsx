import { IconButton, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { GetStatusBadge } from "../../../../../helpers/HelperFunctions";
import LabRequestResultUpload from "./ViewAppointment.LabRequest.Upload";
import LabRequestView from "./ViewAppointment.LabRequest.View";
import axios from "axios";
import LaboRatoryRequestPrintForm from "../../../../../components/LaboratoryRequestPrintForm";
import { PDFDownloadLink} from '@react-pdf/renderer';
import PrintIcon from '@mui/icons-material/Print';
import ViewLabRequest from "../LabRecords/PatientData.LabRecords.ViewResult";

export default function ViewLabRequestTable({current_appointment}){
    const [labRequest, setLabRequest] = useState({blood_chemistry: "[]", xray: "[]"});
    const [appointment, setAppointment] = useState([]);
    const [fetching, setFetching] = useState(false);
    
    const handleFetchLabRequest = () => {
        setFetching(true);
        axios.get(`appointments/get_appointment_lab_request/${current_appointment.id}`)
        .then(res => {
            setLabRequest(res.data);
        })
        .catch(err => {

        })
        .finally(() => {
            setFetching(false);
        })
    };

    useEffect(() => {
        handleFetchLabRequest();
    },[])

    useEffect(() => {
        setAppointment({
            patient:{
                firstname: current_appointment.patient.firstname,
                lastname: current_appointment.patient.lastname,
                address: current_appointment.patient.address,
                birthdate: current_appointment.patient.birthdate,
                gender: current_appointment.patient.gender
            },
            has_lab_request: current_appointment.has_lab_request,
            lab_request: current_appointment.has_lab_request ? JSON.parse(current_appointment.laboratory.form_details) : null,
        })
    },[]);

    return(
        <>
        <table className="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {appointment.has_lab_request === 0 && (
                    <tr>
                        <td colSpan={3}>NO LAB REQUEST</td>
                    </tr>
                )}

                {appointment.has_lab_request === 1 && !fetching &&
                    (
                        <tr>
                            <td className="fw-bold" width={'50%'}>{labRequest.id}</td>
                            <td>{GetStatusBadge(labRequest.status)}</td>
                            <td>
                               <LabRequestView labRequest={JSON.parse(current_appointment.laboratory.form_details)} />
                               {
                                labRequest.result_url === null && (
                                    <LabRequestResultUpload laboratory={current_appointment.laboratory} setLabRequest={setLabRequest}/>
                                   )
                               }
                               {labRequest.result_url !== null && (
                                 <ViewLabRequest results={current_appointment.laboratory} />
                               )}
                               <PDFDownloadLink document={<LaboRatoryRequestPrintForm appointment={appointment}/>} fileName={`LabRequestForm-${current_appointment.patient.lastname}.pdf`}>
                                {
                                    ({blob, url, loading, error}) => loading ? 'Loading Document...' : 
                                    <Tooltip title="Print Lab Request">
                                        <IconButton color="primary" size="small" onClick={() => window.open(url)}>
                                                <PrintIcon />
                                        </IconButton>
                                    </Tooltip>
                                }
                            </PDFDownloadLink>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>

        </>
    );
}