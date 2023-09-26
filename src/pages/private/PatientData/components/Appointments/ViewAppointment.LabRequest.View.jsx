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
                {labRequest.map((section, index) => (
                    <React.Fragment key={index}>
                    <div className="col-12 my-2 d-flex flex-row">
                        <h4 className="m-0 text-dark fw-bolder">{section.title}</h4>
                    </div>
                    <div className="ps-2 col-12 d-flex flex-row flex-wrap justify-content-between">
                        {section.value.map((value, sectionValueIndex) => (
                            <FormControlLabel 
                                key={sectionValueIndex}
                                className="col-3"
                                control={<Checkbox checked={value.value} />} 
                                label={`${value.title}`}
                            />
                            ))}
                    </div>
                    <div className="col-12">
                        <Divider />
                    </div>
                    </React.Fragment>
                ))}
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