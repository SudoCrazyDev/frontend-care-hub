import React from "react";
import { GetStatusBadge } from '../../../helpers/HelperFunctions';
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton, Tooltip } from "@mui/material";

export default function LabRequestTable({formik, patient}){
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