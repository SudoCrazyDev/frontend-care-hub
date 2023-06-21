import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import DescriptionIcon from '@mui/icons-material/Description';

export default function LabRequestView({labRequest}){
    const [open, setOpen] = useState(false);

    const handleOpenModal = () => {
        setOpen(!open);
    };

    return(
        <>
        <Tooltip title="View Lab Request">
            <IconButton color="primary" onClick={handleOpenModal}>
                <DescriptionIcon />
            </IconButton>
        </Tooltip>
        <Dialog open={open} fullWidth maxWidth='md'>
            <DialogTitle>View Lab Request</DialogTitle>
            <DialogContent>
                <div className="d-flex flex-row flex-wrap">
                    <div className="col-12">
                        <h5 className="m-0 text-dark fw-bolder">Lab Requests</h5>
                    </div>
                    <div className="col-12 d-flex flex-row justify-content-center">
                        <FormControlLabel control={<Checkbox checked={Boolean(parseInt(labRequest.cbc))}/>} label="CBC" />
                        <FormControlLabel control={<Checkbox checked={Boolean(parseInt(labRequest.urinalysis))}/>} label="Urinalysis" />
                        <FormControlLabel control={<Checkbox checked={Boolean(parseInt(labRequest.stool_exam))}/>} label="Stool Exam" />
                    </div>
                    <div className="col-12">
                        <Divider />
                    </div>
                    <div className="col-12 my-2 d-flex flex-row align-items-center">
                        <h5 className="m-0 text-dark fw-bolder">Blood Chemistry</h5>
                    </div>
                    <div className="ps-2 col-12 d-flex flex-row flex-wrap justify-content-around">
                        {JSON.parse(labRequest.blood_chemistry).map((item, index) => (
                            <FormControlLabel className="col-3" key={index} control={<Checkbox checked={Boolean(item.value)}/>} label={item.title} />
                        ))}
                    </div>
                    <div className="col-12">
                        <Divider />
                    </div>
                    <div className="col-12 my-2">
                        <h5 className="m-0 text-dark fw-bolder">X-Ray Examination</h5>
                    </div>
                    <div className="col-12 d-flex flex-row flex-wrap justify-content-around">
                        {JSON.parse(labRequest.xray).map((item, index) => (
                            <FormControlLabel className="col-4" key={index} control={<Checkbox checked={Boolean(item.value)}/>} label={item.title} />
                        ))}
                    </div>
                </div>
            </DialogContent>
            <Divider />
            <DialogActions className="shadow-lg p-3">
                    <Button variant="contained" color="error" onClick={handleOpenModal}>Close</Button>
            </DialogActions>
        </Dialog>
        </>
    );
};