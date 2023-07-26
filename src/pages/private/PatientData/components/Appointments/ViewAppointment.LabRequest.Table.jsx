import { IconButton, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { GetStatusBadge } from "../../../../../helpers/HelperFunctions";
import LabRequestResultUpload from "./ViewAppointment.LabRequest.Upload";
import LabRequestView from "./ViewAppointment.LabRequest.View";
import axios from "axios";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import LaboRatoryRequestPrintForm from "../../../../../components/LaboratoryRequestPrintForm";
import { PDFDownloadLink} from '@react-pdf/renderer';
import PrintIcon from '@mui/icons-material/Print';

export default function ViewLabRequest({appointment}){
    const [labRequest, setLabRequest] = useState({blood_chemistry: "[]", xray: "[]"});
    const [fetching, setFetching] = useState(false);

    const handleFetchLabRequest = () => {
        setFetching(true);
        axios.get(`appointments/get_appointment_lab_request/${appointment.id}`)
        .then(res => {
            setLabRequest(res.data);
        })
        .catch(err => {

        })
        .finally(() => {
            setFetching(false);
        })
    };

    const handleViewLabResult = () => {
        let properUrl = labRequest.result_url.replace("public", "storage");
        // window.open(`http://localhost:8000/${properUrl}`, "_blank");
        window.open(`https://carehubapi.harayadevstudio.tech/${properUrl}`, "_blank");
    };

    useEffect(() => {
        handleFetchLabRequest();
    },[])

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
                               <LabRequestView labRequest={labRequest} />
                               {
                                labRequest.result_url === null && (
                                    <LabRequestResultUpload laboratory={labRequest} setLabRequest={setLabRequest}/>
                                   )
                               }
                               {labRequest.result_url !== null && (
                                <Tooltip title="View Result">
                                    <IconButton color="primary" onClick={handleViewLabResult}>
                                            <RemoveRedEyeIcon />
                                    </IconButton>
                                </Tooltip>
                               )}
                               <PDFDownloadLink document={<LaboRatoryRequestPrintForm appointment={appointment}/>} fileName="LabRequestForm.pdf">
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