import React from "react";
import { createSlice  } from "@reduxjs/toolkit";

const initialState = {
    medicines: [],
    initialMedicines: [],
    loading: true,
    links: [],
}

export const medicinesSlice = createSlice({
    name: 'medicines',
    initialState: initialState,
    reducers: {
        setMedicines: (state, action) => {
            state.medicines = action.payload;
        },
        setLoadingMedicine: (state, action) => {
            state.loading = action.payload;
        },
        setLinks: (state, action) => {
            state.links = action.payload;
        },
        setInitialMedicines: (state, action) => {
            state.initialMedicines = action.payload;
        },
    }
});

export const {
    setMedicines,
    setLoadingMedicine,
    setLinks,
    setInitialMedicines
} = medicinesSlice.actions;

export default medicinesSlice.reducer;