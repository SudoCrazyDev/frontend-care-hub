import { Divider, IconButton, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function AddLabRequestForm({formik}){
    const [previewImages, setPreviewImages] = useState([]);

    const handleFilesSelect = (event) => {
        const imageFiles = event.currentTarget.files;
        if(imageFiles && imageFiles.length > 0){
            const imagesArray = Array.from(imageFiles);
            formik.setFieldValue('files', imagesArray);
            const previewArray = imagesArray.map((image) => URL.createObjectURL(image));
            setPreviewImages(previewArray);
        }
    };

    const handleRemoveSelectedImage = (index) => {
        setPreviewImages(previewImages => previewImages.filter((image, i) => i !== index));
        formik.setFieldValue('files', previewImages => previewImages.filter((image, i) => i !== index));
    };

    return(  
        <div className="d-flex flex-row flex-wrap">

            <div className="col-12">
                <Divider />
            </div>
            <div className="col-12 my-2">
                <h5 className="m-0 text-dark fw-bolder">LABORATORY RESULT DATE</h5>
            </div>
            <div className="col-12 my-2">
                <TextField 
                    type="date"
                    variant="outlined"
                    fullWidth={true}
                    onChange={(event) => formik.setFieldValue('result_date', event.target.value)}
                />
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