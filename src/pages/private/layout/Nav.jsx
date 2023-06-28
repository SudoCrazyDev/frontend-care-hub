import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import Diversity3Icon from '@mui/icons-material/Diversity3';
import Groups2Icon from '@mui/icons-material/Groups2';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import ScienceIcon from '@mui/icons-material/Science';
import MedicationIcon from '@mui/icons-material/Medication';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import styled from "@emotion/styled";

const CHNavButton = styled(Button)`
    color: #e2f6fc;
    &:hover{
        background-color: #5ec8ee;
    }
`;


function SideNav(){
    let location = useLocation();
    let pageName = String(location.pathname).substring(1, location.pathname.length);

    const handleIsPageActive = (page) => {
        if(page === pageName){
            return 'nav-active shadow';
        }
    };

    return(
        <div className="d-flex flex-column gap-1 mt-2">

        <p className="m-0" style={{ color: '#9dbad3'}}>Main Menu</p>
        <NavLink to="/patients">
            <CHNavButton variant="text" className={`p-2 justify-content-start ${handleIsPageActive('patients')}`} fullWidth>
                <p className="m-0 text-capitalize fw-light fs-5" style={{ color: '#e2f6fc'}}><Diversity3Icon fontSize="medium" /> Patients</p>
            </CHNavButton>
        </NavLink>
    
        <NavLink to="/appointments">
            <CHNavButton variant="text" className={`p-2 justify-content-start ${handleIsPageActive('appointments')}`} fullWidth>
                <p className="m-0 text-capitalize fw-light fs-5" style={{ color: '#e2f6fc'}}><RecentActorsIcon fontSize="medium" /> Appointments</p>
            </CHNavButton>
        </NavLink>

        <NavLink to="/medicines">
            <CHNavButton variant="text" className={`p-2 justify-content-start ${handleIsPageActive('medicines')}`} fullWidth>
                <p className="m-0 text-capitalize fw-light fs-5" style={{ color: '#e2f6fc'}}><MedicationIcon fontSize="medium" /> Medicines</p>
            </CHNavButton>
        </NavLink>

        {/* <NavLink to="/laboratory">
            <CHNavButton variant="text" className={`p-2 justify-content-start active ${handleIsPageActive('laboratory')}`} fullWidth>
                <p className="m-0 text-capitalize fw-light fs-5" style={{ color: '#e2f6fc'}}><ScienceIcon fontSize="medium" /> Laboratory</p>
            </CHNavButton>
        </NavLink> */}

        {/* <div className="my-3"></div>

        <p className="m-0" style={{ color: '#9dbad3'}}>Patients</p>
        <NavLink to="/patients/out-patients">
            <CHNavButton variant="text" className={`p-2 justify-content-start ${handleIsPageActive('patients/out-patients')}`} fullWidth>
                <p className="m-0 text-capitalize fw-light fs-5" style={{ color: '#e2f6fc'}}><ExitToAppIcon fontSize="medium" /> Out-Patients</p>
            </CHNavButton>
        </NavLink>
        <div className="my-3"></div> */}

        <p className="m-0" style={{ color: '#9dbad3'}}>Other Menu</p>
        {/* <NavLink to="/laboratory">
            <CHNavButton variant="text" className={`p-2 justify-content-start active ${handleIsPageActive('Medicines')}`} fullWidth>
                <p className="m-0 text-capitalize fw-light fs-5" style={{ color: '#e2f6fc'}}><MedicationIcon fontSize="medium" /> Medicines</p>
            </CHNavButton>
        </NavLink>
        <NavLink to="/laboratory">
            <CHNavButton variant="text" className={`p-2 justify-content-start active ${handleIsPageActive('Hospitals')}`} fullWidth>
                <p className="m-0 text-capitalize fw-light fs-5" style={{ color: '#e2f6fc'}}><LocalHospitalIcon fontSize="medium" /> Hospitals</p>
            </CHNavButton>
        </NavLink>
        <NavLink to="/laboratory">
            <CHNavButton variant="text" className={`p-2 justify-content-start active ${handleIsPageActive('Doctors')}`} fullWidth>
                <p className="m-0 text-capitalize fw-light fs-5" style={{ color: '#e2f6fc'}}><Groups2Icon fontSize="medium" /> Doctors</p>
            </CHNavButton>
        </NavLink> */}
        </div>
    );
};

export { SideNav }