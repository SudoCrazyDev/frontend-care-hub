import { Routes, Route } from "react-router-dom";
import Login from "./public/login/Login";
import MainLayout from "./private/layout/MainLayout";
import Patients from "./private/Patient/Patients";
import Appointments from "./private/Appointment/Appointment";
import NotFound from "../components/NotFound/NotFound";
import Laboratory from "./private/Laboratory/Laboratory";
import PatientData from "./private/PatientData/PatientData";
import InPatient from "./private/InPatient/InPatient";
import OutPatient from "./private/OutPatient/OutPatient";
import ReduxInitialize from "../redux/reduxInit";
import ContextStore from "../helpers/ContextStore";
import { SnackBarNotification } from "../components/GlobalComponents";
import Medicines from "./private/Medicines/Medicines";

function PublicRoutes(){
    return(
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Login />} />
        </Routes>
    );
};

function PrivateRoutes(){
    return(
        <ReduxInitialize>
            <ContextStore>
                <MainLayout>
                    <Routes>
                        <Route path="/patients" element={<Patients />} />
                        <Route path="/patients/:patientId" element={<PatientData />} />
                        <Route path="/patients/in-patients" element={<InPatient />} />
                        <Route path="/patients/out-patients" element={<OutPatient />} />
                        <Route path="/appointments" element={<Appointments />} />
                        <Route path="/laboratory" element={<Laboratory />} />
                        <Route path="/medicines" element={<Medicines />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </MainLayout>
                <SnackBarNotification />
            </ContextStore>
        </ReduxInitialize>
    );
};

export { PublicRoutes, PrivateRoutes };