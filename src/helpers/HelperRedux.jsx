import React from "react";
import { useSelector} from "react-redux";

export const GetPatients = () => {
    const { patients } = useSelector(state => state.patients);
    return patients;
};
