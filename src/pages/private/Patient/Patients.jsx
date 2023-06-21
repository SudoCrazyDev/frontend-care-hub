import { Divider} from "@mui/material";
import PatientModal from "./Patient.modal";
import PatientTable from "./Patient.table";

export default function Patients(){
    
    return(
        <div className="card shadow-lg border-0">
            <div className="card-body">
                <div className="d-flex flex-row">
                    <h2 className="m-0 text-uppercase fw-bolder">List of Patients</h2>
                    <div className="ms-auto">
                        <PatientModal />
                    </div>
                </div>
                <Divider className="my-3"/>
                <PatientTable />
            </div>
        </div>
    );
};