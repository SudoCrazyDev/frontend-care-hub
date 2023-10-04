import { Button, Divider, TextField} from "@mui/material";
import PrintReferral from "./ReferralPrint";
import { useFormik } from "formik";
import TabPanel from '@mui/joy/TabPanel';

export default function Referral({patientData}){
    
    const formik = useFormik({
        initialValues: {
            doctor_name: "",
            first_clinic_address: "",
            second_clinic_address: "",
            evaluation: "",
            other_problems: "",
            remarks: "",
            patient: patientData
        },
    });
    
    return(
        <TabPanel value={3}>
            <div className="card shadow-lg border-0">
                <div className="card-body">
                    <div className="d-flex flex-row">
                        <h2 className="m-0 text-uppercase fw-bolder">Referral Letter</h2>
                        <div className="ms-auto">
                            <PrintReferral formik={formik}/>
                        </div>
                    </div>
                    <Divider className="my-3"/>
                    <div className="d-flex flex-row flex-wrap">
                        <div className="col-12">
                            <h1 className="m-0 fw-bolder">Please Fill-up form</h1>
                        </div>
                        <div className="col-4 p-2">
                            <TextField variant="outlined" label="Doctor Name" fullWidth {...formik.getFieldProps('doctor_name')}/>
                        </div>
                        <div className="col-4 p-2">
                            <TextField variant="outlined" label="Clinic Address 1" fullWidth {...formik.getFieldProps('first_clinic_address')}/>
                        </div>
                        <div className="col-4 p-2">
                            <TextField variant="outlined" label="Clinic Address 1" fullWidth {...formik.getFieldProps('second_clinic_address')}/>
                        </div>
                        <div className="col-6 p-2">
                            <TextField variant="outlined" label="Evaluation" multiline rows={5} fullWidth {...formik.getFieldProps('evaluation')}/>
                        </div>
                        <div className="col-6 p-2">
                            <TextField variant="outlined" label="Other Problems" multiline rows={5} fullWidth {...formik.getFieldProps('other_problems')}/>
                        </div>
                        <div className="col-12 p-2">
                            <TextField variant="outlined" label="Remarks" multiline rows={5} fullWidth {...formik.getFieldProps('remarks')}/>
                        </div>
                    </div>
                </div>
            </div>
        </TabPanel>
    );
};