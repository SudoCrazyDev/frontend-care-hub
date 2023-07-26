import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function ViewLabResult({results}){
    const [open, setOpen] = useState(false);
    const [labResults, setLabResults] = useState([]);

    const handleOpenModal = () => {
        setOpen(!open);
    };

    useEffect(() => {
        if(results.result_url !== null){
            setLabResults(results.result_url.split("::"));
        }
    }, []);

    return(
        <>
        <IconButton color="primary" onClick={() => handleOpenModal()}>
            <VisibilityIcon />
        </IconButton>
        <Dialog open={open} maxWidth="md" fullWidth>
            <DialogTitle className="fw-bold">Lab Results</DialogTitle>
            <DialogContent dividers>
                <div className="form-group">
                    <div className="d-flex flex-column gap-2">
                        {labResults.map((labResult, index) => (
                            <img key={index} src={`${import.meta.env.VITE_API_URL}${labResult.replace('public', 'storage')}`} className="shadow border border-success rounded" />
                        ))}
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button color="error" variant="contained" onClick={() => handleOpenModal()}>Close</Button>
            </DialogActions>
        </Dialog>
        </>
    );
};