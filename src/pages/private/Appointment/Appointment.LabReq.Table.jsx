import React, { useEffect, useState } from "react";
import { GetStatusBadge } from '../../../helpers/HelperFunctions';
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton, Tooltip } from "@mui/material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import LaboRatoryRequestPrintForm from "../../../components/LaboratoryRequestPrintForm";
import PrintIcon from '@mui/icons-material/Print';

export default function LabRequestTable({formik}){
    const [appointment, setAppointment] = useState({});

    useEffect(() => {
        if(formik.values.has_lab_request){
            setAppointment({
                patient:{
                    firstname: formik.values.patient.firstname,
                    lastname: formik.values.patient.lastname,
                    address: formik.values.patient.address,
                    birthdate: formik.values.patient.birthdate,
                    gender: formik.values.patient.gender
                },
                laboratory:{
                    cbc: formik.values.lab_request.cbc ? '1' : '0',
                    urinalysis: formik.values.lab_request.urinalysis ? '1' : '0',
                    stool_exam: formik.values.lab_request.stool_exam ? '1' : '0',
                    blood_chemistry: JSON.stringify(formik.values.lab_request.blood_chemistry),
                    xray: JSON.stringify(formik.values.lab_request.xray),
                },
            })
        }
    }, [formik.values]);

    return(
        <table className="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {formik.values.has_lab_request === 0 && (
                    <tr>
                        <td colSpan={3}>NO LAB REQUEST</td>
                    </tr>
                )}

                {formik.values.has_lab_request === 1 && (
                    <tr>
                        <td>----</td>
                        <td>{GetStatusBadge('pending')}</td>
                        <td>
                            {JSON.stringify(appointment) !== '{}' && (
                                <PDFDownloadLink document={<LaboRatoryRequestPrintForm appointment={appointment}/>} fileName={`LabRequestForm-${formik.values.patient.lastname}.pdf`}>
                                    {
                                        ({blob, url, loading, error}) => loading ? 'Loading Document...' : 
                                        <Tooltip title="Print Lab Request">
                                            <IconButton color="primary" size="small" onClick={() => window.open(url)}>
                                                    <PrintIcon />
                                            </IconButton>
                                        </Tooltip>
                                    }
                                </PDFDownloadLink>
                            )}
                            <Tooltip title="Cancel Request">
                                <IconButton color='primary' onClick={() => formik.setFieldValue('has_lab_request', 0)}>
                                        <CancelIcon />
                                </IconButton>
                            </Tooltip>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};