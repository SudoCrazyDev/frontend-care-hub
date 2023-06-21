import { IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { GetStatusBadge } from "../../../../../helpers/HelperFunctions";
import LabRequestResultUpload from "./ViewAppointment.LabRequest.Upload";
import LabRequestView from "./ViewAppointment.LabRequest.View";


export default function ViewLabRequest({appointment}){

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

                {appointment.has_lab_request === 1 && (
                    <tr>
                        <td width={'40%'}>{appointment.laboratory.id}</td>
                        <td>{GetStatusBadge(appointment.laboratory.status)}</td>
                        <td>
                           <LabRequestView labRequest={appointment.laboratory}/>
                           <LabRequestResultUpload laboratory={appointment.laboratory}/>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>

        </>
    );
}