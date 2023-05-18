import React from "react";
import { createSlice  } from "@reduxjs/toolkit";

const initialState = {
    patients: [],
    loading: true
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
        addPatient: (state, action) => {
            state.patients = [{...state.patients}, action.payload];
        }
    }
});

export const {
    setPatients,
    addPatient,
    setLoading
} = patientsSlice.actions;

export default patientsSlice.reducer;