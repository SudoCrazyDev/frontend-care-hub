import React from "react";
import { createSlice  } from "@reduxjs/toolkit";

const initialState = {
    medicineUnits: [],
    loading: true,
    links: [],
}

export const medicineUnitSlice = createSlice({
    name: 'medicineUnits',
    initialState: initialState,
    reducers: {
        setMedicineUnits: (state, action) => {
            state.medicineUnits = action.payload;
        },
        setLoadingMedicineUnits: (state, action) => {
            state.loading = action.payload;
        },
        setMedicineUnitsLinks: (state, action) => {
            state.links = action.payload;
        }
    }
});

export const {
    setMedicineUnits,
    setLoadingMedicineUnits,
    setMedicineUnitsLinks
} = medicineUnitSlice.actions;

export default medicineUnitSlice.reducer;