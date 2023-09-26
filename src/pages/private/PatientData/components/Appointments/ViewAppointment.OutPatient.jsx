import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, TextField, Tooltip } from "@mui/material";
import axios from "axios";
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import LabRequestView from "./ViewAppointment.LabRequest.View";
import { GetStatusBadge } from "../../../../../helpers/HelperFunctions";
import { PDFDownloadLink} from '@react-pdf/renderer';
import LaboRatoryRequestPrintForm from "../../../../../components/LaboratoryRequestPrintForm";
import PrintIcon from '@mui/icons-material/Print';
import { useFormik } from "formik";
import PrintRx from "./PrintRx";
import PrintAdmission from "./PrintAdmission";

export default function ViewOutPatientResult({setAppointments, current_appointment}){
    const [open, setModalOpen] = useState(false);
    const [outpatient, setOutPatient] = useState({admission: null});
    const [appointment, setAppointment] = useState([]);
    const [medicines, setMedicines] = useState([]);

    const handleModalState = () => {
        setModalOpen(!open);
    };

    const handleFetchOutPatientResult = () => {
        axios.get(`appointments/get_appointment_out_patient/${current_appointment.id}`)
        .then(res => {
            setOutPatient(res.data[0]);
            formik.setFieldValue('out_patient_id', res.data[0].id);
        });
    };

    const handleParseMedicines = () => {
        if(outpatient.medicines === undefined || outpatient.medicines === null){
            return;
        };
        setMedicines(JSON.parse(outpatient.medicines));
    };

    useEffect(() => {
        handleFetchOutPatientResult();
    },[]);

    useEffect(() => {handleParseMedicines()}, [outpatient]);
    
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
    
    const handleSubmit = (values) => {
        axios.post(`out_patients/billout`, values)
        .then(res => {
            setAppointments(res.data);
            setTimeout(() => {handleModalState()}, 1500);
        })
    };
    
    const formik = useFormik({
        initialValues:{
            out_patient_id: outpatient.id,
            patient_id: current_appointment.patient.id,
            appointment_id: current_appointment.id,
            professional_fee: outpatient.professional_fee,
            amount_tendered: 0,
            current_date: new Date().toLocaleDateString('en-CA')
        },
        onSubmit: handleSubmit
    });
    
    return(
        <>
        <Tooltip title="Billing">
            <IconButton color="success" onClick={handleModalState}>
                <PointOfSaleIcon />
            </IconButton>
        </Tooltip>
        <Dialog open={open} fullScreen scroll="paper">
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle className="fw-bold text-uppercase">OUT PATIENT - BILLING</DialogTitle>
                <DialogContent dividers>
                    <div className="form-group d-flex flex-row flex-wrap">
                        <div className="col-12 my-2">
                            <Divider className="fw-bold col-12 h2">SIGNIFICANT FINDINGS/REMARKS</Divider>
                        </div>
                        <div className="col-12 my-2">
                            <TextField variant='outlined' fullWidth={true} multiline rows={5} InputProps={{ readOnly: true}} value={outpatient.significant_findings}/>
                        </div>
                        <div className="col-12 my-2">
                            <Divider className="fw-bold col-12 h2">LABORATORY REQUEST</Divider>
                        </div>
                        <div className="col-12 my-2 d-flex flex-row justify-content-end">
                            <table className="table table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th width="40%">ID</th>
                                        <th width="20%">STATUS</th>
                                        <th width="15%">ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!current_appointment.has_lab_request && (
                                        <tr>
                                            <td className="fw-bold" colSpan={4}>NO LAB REQUEST</td>
                                        </tr>
                                    )}
                                    {current_appointment.has_lab_request && current_appointment.laboratory !== null && (
                                        <tr>
                                            <td className="fw-bold" width={'50%'}>{current_appointment.laboratory.id}</td>
                                            <td>{GetStatusBadge(GetStatusBadge(current_appointment.laboratory.status))}</td>
                                            <td>
                                            <LabRequestView labRequest={JSON.parse(current_appointment.laboratory.form_details)} />
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
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-12 my-2">
                            <Divider className="fw-bold col-12 h2">MEDICINES</Divider>
                        </div>
                        <div className="col-12 my-2 d-flex flex-row justify-content-end">
                            {medicines.length > 0 && <PrintRx appointment={current_appointment} medicines={medicines} />}
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
                                        {medicines.length === 0 && (
                                            <tr>
                                                <td className="fw-bold" colSpan={4}>NO MEDICINES</td>
                                            </tr>
                                        )}
                                        {medicines.map((medicine, index) => (
                                            <tr key={index}>
                                                <td className="fw-bold">{medicine.generic_name}</td>
                                                <td className="fw-bold">{medicine.unit}</td>
                                                <td>{medicine.qty}</td>
                                                <td>{medicine.instruction}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                            </table>
                        </div>
                        <div className="col-12 my-2">
                            <Divider className="fw-bold col-12 h2">ADMISSION</Divider>
                        </div>
                        <div className="col-12 my-2 d-flex flex-row justify-content-end">
                            <table className="table table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th width="40%">CONTENT</th>
                                        <th width="15%">ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {outpatient.admission !== null && (
                                        <tr>
                                            <td>{outpatient.admission.content}</td>
                                            <td><PrintAdmission content={outpatient.admission.content}/></td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-12 my-2">
                            <Divider className="fw-bold col-12 h2">PROFESSIONAL FEE</Divider>
                        </div>
                        <div className="col-12 my-2">
                            <TextField className="fw-bold" variant="outlined" fullWidth={true} placeholder="0.00" type="number" InputProps={{ readOnly: true}} value={Number(outpatient.professional_fee).toFixed(2)}/>
                        </div>
                        <div className="col-12 my-2">
                            <Divider className="fw-bold col-12 h2">REMARKS</Divider>
                        </div>
                        <div className="col-12 my-2">
                            <TextField className="fw-bold" variant="outlined" fullWidth={true} InputProps={{ readOnly: true}} value={outpatient.remarks}/>
                        </div>
                        <div className="col-12 my-2">
                            <Divider className="fw-bold col-12 h2">AMOUNT</Divider>
                        </div>
                        <div className="col-12 my-2">
                            <TextField className="fw-bold" variant="outlined" fullWidth={true} placeholder="0.00" type="number" {...formik.getFieldProps('amount_tendered')}/>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions className="p-3">
                    <Button variant="contained" color="primary" type="submit" disabled={formik.isSubmitting || current_appointment.status === 'complete'}>Bill-Out</Button>
                    <Button variant="contained" color="error" onClick={handleModalState}>Cancel</Button>
                </DialogActions>
            </form>
        </Dialog>
        </>
    );
};