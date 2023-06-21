import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import UploadFileIcon from '@mui/icons-material/UploadFile';

export default function LabRequestResultUpload({laboratory}){
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState({});
    const [uploading, setUploading] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleFileUpload = () => {
        setUploading(true);
        let formData = new FormData();
        formData.append('file', file);
        formData.append('lab_request_id', laboratory.id);

        axios.post('file_upload', formData)
        .then(res => {
            console.log(res);
        })
        .catch(err => {

        })
        .finally(() => {
            setUploading(false);
        });
    };

    return(
        <>
        <Tooltip title="Upload Result">
            <IconButton color='primary' onClick={() => handleOpen()}>
                <UploadFileIcon />
            </IconButton>
        </Tooltip>
        <Dialog open={open} maxWidth='md' fullWidth={true}>
        <DialogTitle>Upload Laboratory Result</DialogTitle>
        <DialogContent>
            <div className="d-flex flex-row">
                <input type="file" className="form-control" onChange={handleFileChange}/>
            </div>
        </DialogContent>
        <DialogActions>
            <Button variant="contained" color="primary" disabled={uploading} onClick={() => handleFileUpload()}>Upload</Button>
            <Button variant="contained" color="error" onClick={() => handleOpen()}>Cancel</Button>
        </DialogActions>
        </Dialog>
        </>
    );
};