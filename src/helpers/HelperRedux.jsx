import React from "react";
import { useDispatch, useSelector} from "react-redux";
import Axios from 'axios';

export const GetPatients = () => {
    const { patients } = useSelector(state => state.patients);
    return patients;
};

export const GetPatientPaginationLinks = () => {
    const { links } = useSelector(state => state.patients);
    return links;
};

export const HandleSetPatientsPagination = (link) => {
    
};
