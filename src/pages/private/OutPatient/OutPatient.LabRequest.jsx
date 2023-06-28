import React, { useEffect, useState } from "react";
import axios from "axios";
import { GetStatusBadge } from "../../../helpers/HelperFunctions";
import { IconButton, Tooltip } from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import PrintIcon from '@mui/icons-material/Print';

export default function OutPatientLabRequest({appointment}){
    const [labrequest, setLabRequest] = useState({});

    const handleFetchLabRequest = () => {
        axios.get(`appointments/get_appointment_lab_request/${appointment.id}`)
        .then(res => {
            setLabRequest(res.data);
        })
    };

    const handleViewResult = () => {
        let properUrl = labrequest.result_url.replace("public", "storage");
        // window.open(`http://localhost:8000/${properUrl}`, "_blank");
        window.open(`https://carehubapi.harayadevstudio.tech/${properUrl}`, "_blank");
    };

    useEffect(() => {
        handleFetchLabRequest()
    },[]);

    return(
        <table className="table table-hover table-bordered">
            <tbody>
                {appointment.has_lab_request && JSON.stringify(labrequest) !== "{}" ? (
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
                            <Tooltip title="Print Lab Request">
                                <IconButton color="primary" size="small" onClick={() => window.print()}>
                                        <PrintIcon />
                                </IconButton>
                            </Tooltip>
                            </td>
                            
                        )}
                    </tr>
                )
                :
                <tr>
                    <td colSpan={3} className="text-center">No Lab Request</td>
                </tr>
                }
            </tbody>
        </table>
    );
};