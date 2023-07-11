import React from "react";
import { configureStore } from '@reduxjs/toolkit';
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from 'redux-persist';

import patientsSlice from "./slicers/patientsSlice";
import medicinesSlice from "./slicers/medicinesSlice";
import userSlice from "./slicers/userSlice";

const patientPersistConfig = {
    key: 'health-flow-v1',
    storage
};

const medicinePersistConfig = {
    key: 'health-medicine-flow-v1',
    storage
};

const userPersistConfig = {
    key: 'carehub-user',
    storage
}

const persistedPatients = persistReducer(patientPersistConfig, patientsSlice);
const persistedMedicines = persistReducer(medicinePersistConfig, medicinesSlice);
const persistedUser = persistReducer(userPersistConfig, userSlice);

const store = configureStore({
    reducer: {
        patients: persistedPatients,
        medicines: persistedMedicines,
        user: persistedUser,
    },
});

export const persistor = persistStore(store);
export default store;