import React from "react";
import {faker} from "@faker-js/faker";
import { GenderOptions } from "./Global.Model";
/**
 * This is the Guide Structure for Patient Model.
 * Use this model as referrence when building the back-end.
 * Use JSDoc in Documentation use proper typing.
 */

/**
 * @typedef {Object} PatientModel
 * @property {string} patient_code - The Patient's UUID (Backend Generated).
 * @property {string} firstname - The Patient's First Name.
 * @property {string} middlename - The Patient's Middle Name.
 * @property {string} lastname - The Patient's Last Name.
 * @property {date} birthdate - The Patient's Birthdate.
 * @property {string} address - The Patient's Address.
 * @property {string} gender - The Patient's Gender.
 * @property {string} civil_status - The Patient's Civil Status.
 * @property {string} religion - The Patient's Religion.
 * @property {string} occupation - The Patient's Occupation.
 * @property {string} contact_number - The Patient's Contact Number.
 */

export const PatientFormModel = [
    {id: 'firstname', label: 'First Name', type: 'text'},
    {id: 'middlename', label: 'Middle Name', type: 'text'},
    {id: 'lastname', label: 'Last Name', type: 'text'},
    {id: 'birthdate', label: 'Birthdate', type: 'date'},
    {id: 'address', label: 'Address', type: 'text'},
    {id: 'gender', label: 'Gender', type: 'select', options: GenderOptions},
    {id: 'civil_status', label: 'Civil Status', type: 'select', options: ['Single', 'Married', 'Divorced']},
    {id: 'occupation', label: 'Occupation', type: 'text'},
    {id: 'contact_number', label: 'Contact Number', type: 'text'},
];

export const PatientModel = {
    patient_code: '',
    firstname: '',
    middlename: '',
    lastname: '',
    birthdate: new Date(),
    address: '',
    gender: '',
    civil_status: '',
    religion: '',
    occupation: '',
    contact_number: '',
};

const FakePatientModel = () => {
    return {
        patient_code: faker.datatype.uuid(),
        firstname: faker.name.firstName(),
        middlename: faker.name.middleName(),
        lastname: faker.name.lastName(),
        birthdate: new Date(faker.date.birthdate()).toISOString(),
        address: faker.address.streetName(),
        gender: faker.helpers.arrayElement(['Male', 'Female']),
        civil_status: faker.helpers.arrayElement(['Single', 'Married', 'Divorced']),
        religion: faker.helpers.arrayElement(['Roman Catholic', 'Islam', 'Buddhist', 'Others']),
        occupation: faker.name.jobTitle(),
        contact_number: faker.phone.number(),
    };
};

export const GenerateFakePatients = (length = 5) => {
    return Array.from({length: length}, FakePatientModel);
};