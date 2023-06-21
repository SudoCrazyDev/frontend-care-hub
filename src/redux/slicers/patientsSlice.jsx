import React from "react";
import { createSlice  } from "@reduxjs/toolkit";

const initialState = {
    patients: [],
    initialPatients: [],
    loading: true,
    links: [],
}

export const patientsSlice = createSlice({
    name: 'patients',
    initialState: initialState,
    reducers: {
        setPatients: (state, action) => {
            state.patients = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setLinks: (state, action) => {
            state.links = action.payload;
        },
        setInitialPatients: (state, action) => {
            state.initialPatients = action.payload;
        },
        addPatient: (state, action) => {
            state.patients = [...state.patients, action.payload];
        }
    }
});

export const {
    setPatients,
    addPatient,
    setLoading,
    setLinks,
    setInitialPatients
} = patientsSlice.actions;

export default patientsSlice.reducer;