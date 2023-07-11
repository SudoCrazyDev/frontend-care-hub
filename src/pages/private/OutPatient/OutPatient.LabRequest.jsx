import React, { useEffect, useState } from "react";
import axios from "axios";
import { GetStatusBadge } from "../../../helpers/HelperFunctions";
import { IconButton, Tooltip } from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import PrintIcon from '@mui/icons-material/Print';
import { PDFDownloadLink} from '@react-pdf/renderer';
import LaboRatoryRequestPrintForm from "../../../components/LaboratoryRequestPrintForm";
import CancelIcon from '@mui/icons-material/Cancel';

export default function OutPatientLabRequest({appointment, formik}){
    const [labrequest, setLabRequest] = useState({});

    const handleFetchLabRequest = () => {
        axios.get(`appointments/get_appointment_lab_request/${appointment.id}`)
        .then(res => {
            setLabRequest(res.data);
        })
    };

    const handleViewResult = () => {
        let properUrl = labrequest.result_url.replace("public", "storage");
        window.open(`http://localhost:8000/${properUrl}`, "_blank");
        //window.open(`https://carehubapi.harayadevstudio.tech/${properUrl}`, "_blank");
    };

    useEffect(() => {
        handleFetchLabRequest()
    },[]);

    return(
        <table className="table table-hover table-bordered">
            <tbody>
                {formik.values.has_lab_request ? (
                    <tr>
                        <td className="fw-bold">------</td>
                        <td>{GetStatusBadge('pending')}</td>
                        <td>
                            <PDFDownloadLink document={<LaboRatoryRequestPrintForm formik={formik}/>} fileName="LabRequestForm.pdf">
                                {
                                    ({blob, url, loading, error}) => loading ? 'Loading Document...' : 
                                    <Tooltip title="Print Lab Request">
                                        <IconButton color="primary" size="small" onClick={() => window.open(url)}>
                                                <PrintIcon />
                                        </IconButton>
                                    </Tooltip>
                                }
                            </PDFDownloadLink>
                            <Tooltip title="Cancel Request">
                                <IconButton color="error" size="small" onClick={() => formik.setFieldValue('has_lab_request', 0)}>
                                        <CancelIcon />
                                </IconButton>
                            </Tooltip>
                        </td>
                    </tr>
                )
                :appointment.has_lab_request && JSON.stringify(labrequest) !== "{}" ? (
                    <tr>
                        <td className="fw-bold">{labrequest.id}</td>
                        <td>{GetStatusBadge(labrequest.status)}</td>
                        {labrequest.status === 'completed' && (
                            <td>
                            <Tooltip title="View Lab Result">
                                <IconButton color="primary" size="small" onClick={handleViewResult}>
                                        <RemoveRedEyeIcon />
                                </IconButton>
                            </Tooltip>
                            <PDFDownloadLink document={<LaboRatoryRequestPrintForm />} fileName="LabRequestForm.pdf">
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
                            
                        )}
                    </tr>
                )
                :
                <tr>
                    <td colSpan={3} className="fw-bold">NO LABORATORY REQUEST</td>
                </tr>
                }
            </tbody>
        </table>
    );
};