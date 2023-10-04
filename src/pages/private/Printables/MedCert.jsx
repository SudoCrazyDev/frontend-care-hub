import { Button, Divider, TextField} from "@mui/material";
import { useFormik } from "formik";
import MedCertPrint from "./MedCertPrint";
import TabPanel from '@mui/joy/TabPanel';

export default function MedicalCertificate({patientData}){
    
    const formik = useFormik({
        initialValues: {
            diagnose: "",
            recommendation: "",
            patient: patientData
        },
    });
    
    return(
        <TabPanel value={4}>
            <div className="card shadow-lg border-0">
                <div className="card-body">
                    <div className="d-flex flex-row">
                        <h2 className="m-0 text-uppercase fw-bolder">Medical Certificate</h2>
                        <div className="ms-auto">
                            <MedCertPrint formik={formik}/>
                        </div>
                    </div>
                    <Divider className="my-3"/>
                    <div className="d-flex flex-row flex-wrap">
                        <div className="col-12">
                            <h1 className="m-0 fw-bolder">Please Fill-up form</h1>
                        </div>
                        <div className="col-6 p-2">
                            <TextField variant="outlined" label="Diagnose" multiline rows={5} fullWidth {...formik.getFieldProps('diagnose')}/>
                        </div>
                        <div className="col-6 p-2">
                            <TextField variant="outlined" label="Recommendation" multiline rows={5} fullWidth {...formik.getFieldProps('recommendation')}/>
                        </div>
                    </div>
                </div>
            </div>
        </TabPanel>
    );
};