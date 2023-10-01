import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import Diversity3Icon from '@mui/icons-material/Diversity3';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import MedicationIcon from '@mui/icons-material/Medication';
import styled from "@emotion/styled";
import AssessmentIcon from '@mui/icons-material/Assessment';

const CHNavButton = styled(Button)`
    color: #3B9488;
    &:hover{
        color: #fff;
        background-color: #3B9488;
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

        <p className="m-0" >Main Menu</p>

        <NavLink to="/appointments">
            <CHNavButton variant="text" className={`p-2 justify-content-start ${handleIsPageActive('appointments')}`} fullWidth>
                <p className="m-0 text-capitalize fw-bold fs-5"><RecentActorsIcon fontSize="medium" /> Appointments</p>
            </CHNavButton>
        </NavLink>

        <NavLink to="/patients">
            <CHNavButton variant="text" className={`p-2 justify-content-start ${handleIsPageActive('patients')}`} fullWidth>
                <p className="m-0 text-capitalize fw-bold fs-5"><Diversity3Icon fontSize="medium" /> Patients</p>
            </CHNavButton>
        </NavLink>

        <div className="m-4">

        </div>
        <p className="m-0" >Other Menu</p>

        <NavLink to="/medicines">
            <CHNavButton variant="text" className={`p-2 justify-content-start ${handleIsPageActive('medicines')}`} fullWidth>
                <p className="m-0 text-capitalize fw-bold fs-5"><MedicationIcon fontSize="medium" /> Medicines</p>
            </CHNavButton>
        </NavLink>
        
        <NavLink to="/reports">
            <CHNavButton variant="text" className={`p-2 justify-content-start ${handleIsPageActive('reports')}`} fullWidth>
                <p className="m-0 text-capitalize fw-bold fs-5"><AssessmentIcon fontSize="medium" /> Summary</p>
            </CHNavButton>
        </NavLink>

        </div>
    );
};

export { SideNav }