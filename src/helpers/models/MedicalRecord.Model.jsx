import React from "react";
import { faker } from "@faker-js/faker";

/**
 * @typedef {Object} MedicalRecordModel
 * @property {string} id - The Record's UUID.
 * @property {string} patient_code - The Record's Patient UUID.
 * @property {date} requested_date - The date the record requested.
 * @property {date} result_date - The date the record result.
 * @property {string} stool_exam
 * @property {string} cbc_others
 * @property {array} cbc
 * @property {array} x_ray
 * @property {array} urinalysis
 * @property {array} blood_chemistry
 * 
 */

export const MedicalRecordModel = {
    id: '',
    patient_code: '',
    requested_date: new Date(),
    result_date: new Date(),
    stool_exam: '',
    cbc_others: '',
    cbc:[
        {title: 'WBC', value: ''},
        {title: 'Neutrophils', value: ''},
        {title: 'Lymphocytes', value: ''},
        {title: 'Eosinophils', value: ''},
        {title: 'Monocytes', value: ''},
        {title: 'Basophil', value: ''},
        {title: 'Hemoglobin', value: ''},
        {title: 'Hematocrit', value: ''},
        {title: 'Platelet Count', value: ''},
        {title: 'ESR', value: ''}
    ],
    x_ray:[
        {title: 'Cervical Spine Series', value: false},
        {title: 'Lumbosacral Spine Series', value: false},
        {title: 'Thoracolumbar Spine Series', value: false},
        {title: 'Chest X-Ray', value: false},
        {title: 'Barium Enema', value: false},
        {title: 'UGI Series', value: false},
        {title: 'Complete Abdomen', value: false},
        {title: 'KUB-IVP', value: false},
        {title: 'View', value: ''},
        {title: 'Others', value: ''},
    ],
    urinalysis: [
        {title: 'Color', value: ''},
        {title: 'Transparency', value: ''},
        {title: 'PH', value: ''},
        {title: 'Spec. Gran.', value: ''},
        {title: 'Glucose', value: ''},
        {title: 'Protein', value: ''},
        {title: 'Ketone', value: ''},
        {title: 'Bile', value: ''},
        {title: 'Urobilinogen', value: ''},
        {title: 'Nitrite', value: ''},
        {title: 'Cast', value: ''},
        {title: 'Pus Cells', value: ''},
        {title: 'Red Blood', value: ''},
        {title: 'Epithellial Cells', value: ''},
        {title: 'Yeast Cells', value: ''},
        {title: 'Bacteria', value: ''},
        {title: 'Mucous Thread', value: ''},
        {title: 'Crystals', value: ''},
        {title: 'Amor. Urates', value: ''},
        {title: 'Amor. P04', value: ''},
        {title: 'Cal. Oxalate', value: ''},
        {title: 'Others', value: ''},
    ],
    blood_chemistry: [
        {title: 'FBS', value: ''},
        {title: 'BUN', value: ''},
        {title: 'Creatinine', value: ''},
        {title: 'Uric Acid', value: ''},
        {title: 'Total Chol.', value: ''},
        {title: 'HDL', value: ''},
        {title: 'Globulin', value: ''},
        {title: 'Serum Na', value: ''},
        {title: 'Serum K', value: ''},
        {title: 'Serum Cl', value: ''},
        {title: 'Serum Ca', value: ''},
        {title: 'Serum Mg', value: ''},
        {title: 'BT', value: ''},
        {title: 'LDL', value: ''},
        {title: 'SGPT', value: ''},
        {title: 'SGOT', value: ''},
        {title: 'LDH', value: ''},
        {title: 'Alk. Phos', value: ''},
        {title: 'Tryglycerides', value: ''},
        {title: 'Albumin', value: ''},
        {title: 'PTPA', value: ''},
        {title: 'HBSaG', value: ''},
        {title: 'Others', value: ''},
    ],
};

const FakeMedicalRecordModel = () => {
    return {
        id: faker.string.uuid(),
        patient_code: faker.string.uuid(),
        requested_date: faker.date.past().toLocaleDateString('en-CA'),
        result_date: faker.date.recent().toLocaleDateString('en-CA'),
        stool_exam: faker.lorem.paragraphs(3),
        cbc_others: faker.lorem.paragraphs(3),
        cbc:[
            {title: 'WBC', value: faker.string.numeric()},
            {title: 'Neutrophils', value: faker.number.int(100)},
            {title: 'Lymphocytes', value: faker.number.int(100)},
            {title: 'Eosinophils', value: faker.number.int(100)},
            {title: 'Monocytes', value: faker.number.int(100)},
            {title: 'Basophil', value: faker.number.int(100)},
            {title: 'Hemoglobin', value: faker.number.int(100)},
            {title: 'Hematocrit', value: faker.number.int(100)},
            {title: 'Platelet Count', value: faker.number.int(100)},
            {title: 'ESR', value: faker.number.int(100)}
        ],
        x_ray:[
            {title: 'Cervical Spine Series', value: false},
            {title: 'Lumbosacral Spine Series', value: false},
            {title: 'Thoracolumbar Spine Series', value: false},
            {title: 'Chest X-Ray', value: false},
            {title: 'Barium Enema', value: false},
            {title: 'UGI Series', value: false},
            {title: 'Complete Abdomen', value: false},
            {title: 'KUB-IVP', value: false},
            {title: 'View', value: ''},
            {title: 'Others', value: ''},
        ],
        urinalysis: [
            {title: 'Color', value: faker.number.int(100)},
            {title: 'Transparency', value: faker.number.int(100)},
            {title: 'PH', value: faker.number.int(100)},
            {title: 'Spec. Gran.', value: faker.number.int(100)},
            {title: 'Glucose', value: faker.number.int(100)},
            {title: 'Protein', value: faker.number.int(100)},
            {title: 'Ketone', value: faker.number.int(100)},
            {title: 'Bile', value: faker.number.int(100)},
            {title: 'Urobilinogen', value: faker.number.int(100)},
            {title: 'Nitrite', value: faker.number.int(100)},
            {title: 'Cast', value: faker.number.int(100)},
            {title: 'Pus Cells', value: faker.number.int(100)},
            {title: 'Red Blood', value: faker.number.int(100)},
            {title: 'Epithellial Cells', value: faker.number.int(100)},
            {title: 'Yeast Cells', value: faker.number.int(100)},
            {title: 'Bacteria', value: faker.number.int(100)},
            {title: 'Mucous Thread', value: faker.number.int(100)},
            {title: 'Crystals', value: faker.number.int(100)},
            {title: 'Amor. Urates', value: faker.number.int(100)},
            {title: 'Amor. P04', value: faker.number.int(100)},
            {title: 'Cal. Oxalate', value: faker.number.int(100)},
            {title: 'Others', value: ''},
        ],
        blood_chemistry: [
            {title: 'FBS', value: faker.number.int(100)},
            {title: 'BUN', value: faker.number.int(100)},
            {title: 'Creatinine', value: faker.number.int(100)},
            {title: 'Uric Acid', value: faker.number.int(100)},
            {title: 'Total Chol.', value: faker.number.int(100)},
            {title: 'HDL', value: faker.number.int(100)},
            {title: 'Globulin', value: faker.number.int(100)},
            {title: 'Serum Na', value: faker.number.int(100)},
            {title: 'Serum K', value: faker.number.int(100)},
            {title: 'Serum Cl', value: faker.number.int(100)},
            {title: 'Serum Ca', value: faker.number.int(100)},
            {title: 'Serum Mg', value: faker.number.int(100)},
            {title: 'BT', value: faker.number.int(100)},
            {title: 'LDL', value: faker.number.int(100)},
            {title: 'SGPT', value: faker.number.int(100)},
            {title: 'SGOT', value: faker.number.int(100)},
            {title: 'LDH', value: faker.number.int(100)},
            {title: 'Alk. Phos', value: faker.number.int(100)},
            {title: 'Tryglycerides', value: faker.number.int(100)},
            {title: 'Albumin', value: faker.number.int(100)},
            {title: 'PTPA', value: faker.number.int(100)},
            {title: 'HBSaG', value: faker.number.int(100)},
            {title: 'Others', value: ''},
        ],
    };
};

export const GenerateFakeMedicalRecord = (length = 5) => {
    return Array.from({length: length}, FakeMedicalRecordModel)
};