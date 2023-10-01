import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./public/login/Login";
import MainLayout from "./private/layout/MainLayout";
import Patients from "./private/Patient/Patients";
import Appointments from "./private/Appointment/Appointment";
import Laboratory from "./private/Laboratory/Laboratory";
import PatientData from "./private/PatientData/PatientData";
import ReduxInitialize from "../redux/reduxInit";
import ContextStore from "../helpers/ContextStore";
import { SnackBarNotification } from "../components/GlobalComponents";
import Medicines from "./private/Medicines/Medicines";
import { useEffect } from "react";
import Referrals from "./private/Referrals/Referrals";
import Summary from "./private/Reports/Summary";

function PublicRoutes(){
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/login')
    },[]);
    
    return(
        <Routes>
            <Route path="/login" element={<Login />} />
        </Routes>
    );
};

function PrivateRoutes(){
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/appointments')
    },[]);
    
    return(
        <ReduxInitialize>
            <ContextStore>
                <MainLayout>
                    <Routes>
                        <Route path="/patients" element={<Patients />} />
                        <Route path="/patients/:patientId" element={<PatientData />} />
                        <Route path="/appointments" element={<Appointments />} />
                        <Route path="/laboratory" element={<Laboratory />} />
                        <Route path="/medicines" element={<Medicines />} />
                        <Route path="/referrals" element={<Referrals />} />
                        <Route path="/reports" element={<Summary />} />
                    </Routes>
                </MainLayout>
                <SnackBarNotification />
            </ContextStore>
        </ReduxInitialize>
    );
};

export { PublicRoutes, PrivateRoutes };