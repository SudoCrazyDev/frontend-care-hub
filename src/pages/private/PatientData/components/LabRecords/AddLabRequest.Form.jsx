import { Checkbox, Divider, FormControlLabel, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const BloodChemistryOptions = [
    {id: 'fbs', title: 'FBS', value: false},
    {id: 'bun', title: 'BUN', value: false},
    {id: 'creatinenine', title: 'Creatinine', value: false},
    {id: 'uric_acid', title: 'Uric Acid', value: false},
    {id: 'total_cholesterol', title: 'Total Cholesterol', value: false},
    {id: 'hdl', title: 'HDL', value: false},
    {id: 'globulin', title: 'Globulin', value: false},
    {id: 'serum_na', title: 'Serum Na', value: false},
    {id: 'serum_k', title: 'Serum K', value: false},
    {id: 'serum_cl', title: 'Serum Cl', value: false},
    {id: 'serum_ca', title: 'Serum Ca', value: false},
    {id: 'serum_mg', title: 'Serum Mg', value: false},
    {id: 'bt', title: 'BT', value: false},
    {id: 'ldl', title: 'LDL', value: false},
    {id: 'lol', title: 'LOL', value: false},
    {id: 'hbsag', title: 'HBSaG', value: false},
    {id: 'sgpt', title: 'SGPT', value: false},
    {id: 'sgot', title: 'SGOT', value: false},
    {id: 'ldh', title: 'LDH', value: false},
    {id: 'alk_phos', title: 'Alk Phos', value: false},
    {id: 'tryglycerides', title: 'Tryglycerides', value: false},
    {id: 'albumin', title: 'Albumin', value: false},
    {id: 'ptpa', title: 'PTPA', value: false},
];

const XrayOptions = [
    {id: 'css', title: 'Cervical Spine Serires', value: false},
    {id: 'lss', title: 'Lumbosacral Spine Series', value: false},
    {id: 'tss', title: 'Thoracolumbar Spine Series', value: false},
    {id: 'chest_xray', title: 'Chest X-Ray', value: false},
    {id: 'barium_enema', title: 'Barium Enema', value: false},
    {id: 'ugi_series', title: 'UGI Series', value: false},
    {id: 'complete_abdomen', title: 'Complete Abdomen', value: false},
    {id: 'kvb_ivp', title: 'KVB-IVP', value: false},
];

export default function AddLabRequestForm({formik}){
    const [selectedImages, setSelectedImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);

    const handleFilesSelect = (event) => {
        const imageFiles = event.currentTarget.files;
        if(imageFiles && imageFiles.length > 0){
            const imagesArray = Array.from(imageFiles);
            setSelectedImages(imagesArray);
            formik.setFieldValue('files', imagesArray);
            const previewArray = imagesArray.map((image) => URL.createObjectURL(image));
            setPreviewImages(previewArray);
        }
    };

    const handleRemoveSelectedImage = (index) => {
        setPreviewImages(previewImages => previewImages.filter((image, i) => i !== index));
        setSelectedImages(selectedImages => selectedImages.filter((image, i) => i !== index));
    };

    useEffect(()=>{
        //Declare the initial values for lab request.
        formik.setFieldValue('lab_request.cbc', false);
        formik.setFieldValue('lab_request.urinalysis', false);
        formik.setFieldValue('lab_request.stool_exam', false);
        formik.setFieldValue('lab_request.blood_chemistry', BloodChemistryOptions);
        formik.setFieldValue('lab_request.xray', XrayOptions);
    },[]);

    return(  
        <div className="d-flex flex-row flex-wrap">
            <div className="col-12">
                <h5 className="m-0 text-dark fw-bolder">Lab Requests</h5>
            </div>
            <div className="col-12 d-flex flex-row justify-content-center">
                <FormControlLabel control={<Checkbox onChange={(event)=> formik.setFieldValue('lab_request.cbc', event.target.checked)}/>} label="CBC" />
                <FormControlLabel control={<Checkbox onChange={(event)=> formik.setFieldValue('lab_request.urinalysis', event.target.checked)}/>} label="Urinalysis" />
                <FormControlLabel control={<Checkbox onChange={(event)=> formik.setFieldValue('lab_request.stool_exam', event.target.checked)}/>} label="Stool Exam" />
            </div>
            <div className="col-12">
                <Divider />
            </div>
            <div className="col-12 my-2 d-flex flex-row align-items-center">
                <h5 className="m-0 text-dark fw-bolder">Blood Chemistry</h5>
            </div>
            <div className="ps-2 col-12 d-flex flex-row flex-wrap justify-content-around">
                {BloodChemistryOptions.map((item, index) => (
                    <FormControlLabel className="col-3" key={index} control={<Checkbox onChange={(event) => formik.setFieldValue(`lab_request.blood_chemistry[${index}]`, {id: item.id, title: item.title, value: event.target.checked})}/>} label={item.title} />
                ))}
            </div>
            <div className="col-12">
                <Divider />
            </div>
            <div className="col-12 my-2">
                <h5 className="m-0 text-dark fw-bolder">X-Ray Examination</h5>
            </div>
            <div className="col-12 d-flex flex-row flex-wrap justify-content-around">
                {XrayOptions.map((item, index) => (
                    <FormControlLabel className="col-4" key={index} control={<Checkbox onChange={(event) => formik.setFieldValue(`lab_request.xray[${index}]`, {id: item.id, title: item.title, value: event.target.checked})}/>} label={item.title} />
                ))}
            </div>
            <div className="col-12">
                <Divider />
            </div>
            <div className="col-12 my-2">
                <h5 className="m-0 text-dark fw-bolder">LABORATORY RESULT DATE</h5>
            </div>
            <div className="col-12 my-2">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                    sx={{
                        width: "100%",
                    }}
                    onChange={(date) => formik.setFieldValue('result_date', new Date(date.$d).toLocaleDateString('en-CA'))}
                    textField={(params) => (
                        <TextField
                            fullWidth={true}
                        />
                    )}
                    />
                </LocalizationProvider>
            </div>
            <div className="col-12">
                <Divider />
            </div>
            <div className="col-12 my-2">
                <h5 className="m-0 text-dark fw-bolder">LABORATORY RESULTS</h5>
            </div>
            <div className="col-12 my-2">
                <div className="d-flex flex-row">
                    <input type="file" className="form-control" multiple onChange={handleFilesSelect}/>
                </div>
            </div>
            {previewImages.length !== 0 && (
            <div className="col-12 my-2">
                <div className="d-flex flex-row">
                    <div className="card col-12">
                        <div className="card-body d-flex flex-row gap-3">
                            {previewImages.map((previewImage, index) => (
                                <div key={index} className="p-2" style={{ height: '100px', width: '80px', background: `url(${previewImage}) no-repeat center center / cover`, position: 'relative'}}>
                                    <IconButton onClick={() => handleRemoveSelectedImage(index)} size="small" color="error" style={{ position: 'absolute', top: '0px', right: '0px'}}>
                                        <CloseIcon />
                                    </IconButton>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
};