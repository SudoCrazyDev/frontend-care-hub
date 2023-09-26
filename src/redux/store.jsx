import React from "react";
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from 'redux-persist';

import patientsSlice from "./slicers/patientsSlice";
import medicinesSlice from "./slicers/medicinesSlice";
import userSlice from "./slicers/userSlice";
import medicineBrandsSlice from "./slicers/medicineBrandsSlice";
import medicineUnitsSlice from "./slicers/medicineUnitsSlice";

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

const medicineBrandsPersistConfig = {
    key: 'carehub-medicine-brands',
    storage
};

const medicineUnitsPersistConfig = {
    key: 'carehub-medicine-units',
    storage
};

const persistedPatients = persistReducer(patientPersistConfig, patientsSlice);
const persistedMedicines = persistReducer(medicinePersistConfig, medicinesSlice);
const persistedUser = persistReducer(userPersistConfig, userSlice);
const persistedMedicineBrands = persistReducer(medicineBrandsPersistConfig, medicineBrandsSlice);
const persistedMedicineUnits = persistReducer(medicineUnitsPersistConfig, medicineUnitsSlice);

const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
    reducer: {
        patients: persistedPatients,
        medicines: persistedMedicines,
        user: persistedUser,
        medicineBrands: persistedMedicineBrands,
        medicineUnits: persistedMedicineUnits
    }
});

export const persistor = persistStore(store);
export default store;