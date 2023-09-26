import React from "react";
import { createSlice  } from "@reduxjs/toolkit";

const initialState = {
    medicineBrands: [],
    loading: true,
    links: [],
}

export const medicineBrandsSlice = createSlice({
    name: 'medicineBrands',
    initialState: initialState,
    reducers: {
        setMedicineBrands: (state, action) => {
            state.medicineBrands = action.payload;
        },
        setLoadingMedicineBrands: (state, action) => {
            state.loading = action.payload;
        },
        setMedicineBrandsLinks: (state, action) => {
            state.links = action.payload;
        }
    }
});

export const {
    setMedicineBrands,
    setLoadingMedicineBrands,
    setMedicineBrandsLinks
} = medicineBrandsSlice.actions;

export default medicineBrandsSlice.reducer;