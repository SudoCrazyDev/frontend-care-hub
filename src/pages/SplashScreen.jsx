import { CircularProgress, Dialog, DialogContent } from "@mui/material";

export default function SplashScreen({open}){
    return(
        <Dialog open={open} fullScreen>
            <DialogContent>
                <div className="d-flex flex-column justify-content-center align-items-center h-100 gap-3">
                    <h1 className="m-0 fw-bolder display-1">Loading</h1>
                    <CircularProgress />
                </div>
            </DialogContent>
        </Dialog>
    );
}