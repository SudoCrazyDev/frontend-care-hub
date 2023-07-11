import React, { useEffect, useState } from "react";
import DescriptionIcon from '@mui/icons-material/Description';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, TextField, Tooltip } from "@mui/material";
import axios from "axios";

export default function ViewOutPatientResult({appointment}){
    const [open, setModalOpen] = useState(false);
    const [outpatient, setOutPatient] = useState({});
    const [medicines, setMedicines] = useState([]);

    const handleModalState = () => {
        setModalOpen(!open);
    };

    const handleFetchOutPatientResult = () => {
        axios.get(`appointments/get_appointment_out_patient/${appointment.id}`)
        .then(res => {
            console.log(res);
            setOutPatient(res.data[0]);
        });
    };

    const handleParseMedicines = () => {
        if(outpatient.medicines === undefined){
            return;
        };
        setMedicines(JSON.parse(outpatient.medicines));
    };

    useEffect(() => {
        handleFetchOutPatientResult();
    },[]);

    useEffect(() => {handleParseMedicines()}, [outpatient]);
    return(
        <>
        <Tooltip title="View Out Patient Result">
            <IconButton color="success" onClick={handleModalState}>
                <DescriptionIcon />
            </IconButton>
        </Tooltip>
        <Dialog open={open} fullScreen scroll="paper">
            <DialogTitle className="fw-bold text-uppercase">OUT PATIENT - RESULT</DialogTitle>
            <DialogContent dividers>
                <div className="form-group d-flex flex-row flex-wrap">
                    <div className="col-12 my-2">
                        <Divider className="fw-bold col-12 h2">SIGNIFICANT FINDINGS/REMARKS</Divider>
                    </div>
                    <div className="col-12 my-2">
                        <TextField variant='outlined' fullWidth={true} multiline rows={5} InputProps={{ readOnly: true}} value={outpatient.significant_findings}/>
                    </div>
                    <div className="col-12 my-2">
                        <Divider className="fw-bold col-12 h2">MEDICINES</Divider>
                    </div>
                    <div className="col-12 my-2">
                        <table className="table table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th width="40%">Medicine</th>
                                        <th width="20%">Unit</th>
                                        <th width="15%">Qty</th>
                                        <th width="25%">Instructions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {medicines.map((medicine, index) => (
                                        <tr key={index}>
                                            <td className="fw-bold">{medicine.name}</td>
                                            <td className="fw-bold">{medicine.unit}</td>
                                            <td>{medicine.qty}</td>
                                            <td>{medicine.instructions}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                    </div>
                    <div className="col-12 my-2">
                        <Divider className="fw-bold col-12 h2">PROFESSIONAL FEE</Divider>
                    </div>
                    <div className="col-12 my-2">
                        <TextField className="fw-bold" variant="outlined" fullWidth={true} placeholder="0.00" type="number" InputProps={{ readOnly: true}} value={Number(outpatient.professional_fee).toFixed(2)}/>
                    </div>
                </div>
            </DialogContent>
            <DialogActions className="p-3">
                <Button variant="contained" color="error" onClick={handleModalState}>Cancel</Button>
            </DialogActions>
        </Dialog>
        </>
    );
};