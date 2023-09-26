import {Skeleton } from "@mui/material";
import React from "react";
import { GetStatusBadge } from "../../../../../helpers/HelperFunctions";
import CancelAppointment from "./CancelAppointment";
import ViewAppointment from "./ViewAppointment";

export default function AppointmentsTable({appointments, fetching, setAppointments}){
    return(
        <table className="table table-bordered shadow-lg">
            <thead>
                <tr>
                    <th width={`18%`}>Consultation Date</th>
                    <th>Complaint</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {fetching && appointments.length === 0 && Array(10).fill().map((_,i)=>(
                    <tr key={i}>
                        <td colSpan={5}><Skeleton variant="text" /></td>
                    </tr>
                ))}
                {!fetching && appointments.length === 0 && (
                    <tr>
                        <td colSpan={5}>No Appointments Found</td>
                    </tr>
                )}
                {appointments.length !== 0 && appointments.map((appointment, index) => (
                    <tr key={index}>
                        <td className="fw-bolder">{new Date(appointment.consultation_date).toLocaleDateString('en-CA')}</td>
                        <td>{appointment.chief_complaint}</td>
                        <td>{GetStatusBadge(appointment.status)}</td>
                        <td>
                            <ViewAppointment appointment={appointment}/>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};