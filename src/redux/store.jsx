import React from "react";
import { configureStore } from '@reduxjs/toolkit';
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from 'redux-persist';

import patientsSlice from "./slicers/patientsSlice";

const patientPersistConfig = {
    key: 'health-flow-v1',
    storage
};

const persistedPatients = persistReducer(patientPersistConfig, patientsSlice);
const store = configureStore({
    reducer: {
        patients: persistedPatients
    },
});

export const persistor = persistStore(store);
export default store;