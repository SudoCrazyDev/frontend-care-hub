import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Tooltip } from "@mui/material";
import React, { useState } from "react";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CircularProgress from '@mui/joy/CircularProgress';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CloseIcon from '@mui/icons-material/Close';
import { useNotification } from '../../../../../helpers/CustomHooks';

export default function LabRequestResultUpload({laboratory, setLabRequest}){
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState({});
    const [uploading, setUploading] = useState(false);
    const [previewImages, setPreviewImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [resultDate, setResultDate] = useState(new Date().toLocaleDateString('en-CA'));
    const { handleNotification } = useNotification();

    const handleOpen = () => {
        setOpen(!open);
    };

    const handleFileUpload = () => {
        setUploading(true);
        let formData = new FormData();

        formData.append('lab_request_id', laboratory.id);
        formData.append('result_date', resultDate);

        if(selectedImages.length > 1){
            selectedImages.map((element, index) => {
                formData.append(`files[${index}]`, element);
            });
        }else{
            formData.append(`files[0]`, selectedImages[0]);
        }

        axios.post('file_upload', formData)
        .then(res => {
            setLabRequest(res.data);
            handleOpen();
            handleNotification('success', 'Lab Result Uploaded');
        })
        .catch(err => {
            handleNotification('error', 'Lab Result Failed to Upload');
        })
        .finally(() => {
            setUploading(false);
        });

    };

    const handleFilesSelect = (event) => {
        const imageFiles = event.currentTarget.files;
        if(imageFiles && imageFiles.length > 0){
            const imagesArray = Array.from(imageFiles);
            setSelectedImages(imagesArray);
            const previewArray = imagesArray.map((image) => URL.createObjectURL(image));
            setPreviewImages(previewArray);
        }
    };

    const handleRemoveSelectedImage = (index) => {
        setSelectedImages(selectedImages => selectedImages.filter((image, i) => i !== index));
        setPreviewImages(previewImages => previewImages.filter((image, i) => i !== index));
    };

    return(
        <>
        <Tooltip title="Upload Result">
            <IconButton color='primary' onClick={() => handleOpen()}>
                <UploadFileIcon />
            </IconButton>
        </Tooltip>
        <Dialog open={open} maxWidth='md' fullWidth={true}>
        <DialogTitle>Upload Laboratory Results</DialogTitle>
        <DialogContent>
            <div className="d-flex flex-row">
                <input type="file" className="form-control" onChange={handleFilesSelect} multiple/>
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
                    onChange={(date) => setResultDate(new Date(date.$d).toLocaleDateString('en-CA'))}
                    textField={(params) => (
                        <TextField
                            fullWidth={true}
                        />
                    )}
                    />
                </LocalizationProvider>
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
        </DialogContent>
        <DialogActions>
            <Button variant="contained" color="primary" disabled={uploading} onClick={() => handleFileUpload()}>Upload {uploading && <CircularProgress variant="plain" size="sm" color="neutral" className="ms-1" />}</Button>
            <Button variant="contained" color="error" onClick={() => handleOpen()}>Cancel</Button>
        </DialogActions>
        </Dialog>
        </>
    );
};