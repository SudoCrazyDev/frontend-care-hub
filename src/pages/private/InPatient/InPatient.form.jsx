import { Divider, InputLabel } from "@mui/material";
import FormBuilder from "../../../components/FormBuilder/FormBuilder";
import PatientFieldSearcher from "../../../components/PatientFieldSearcher/PatientFieldSearcher";

export default function InPatientForm(){
    return(
        <FormBuilder>
            <Divider className="my-3"/>
            <div className="col-md-12 col-lg-6">
                <InputLabel className="fw-bold text-dark">Patient Name</InputLabel>
                <PatientFieldSearcher />
            </div>
            <div className="col-md-12 col-lg-6">
                <InputLabel className="fw-bold text-dark">Hospital Name</InputLabel>
                <PatientFieldSearcher />
            </div>
        </FormBuilder>
    );
};