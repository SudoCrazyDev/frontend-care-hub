import React from "react";
import { createSlice  } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    authToken: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setAuthToken: (state, action) => {
            state.authToken = action.payload;
        },
    }
});

export const {
    setUser,
    setAuthToken,
} = userSlice.actions;

export default userSlice.reducer;