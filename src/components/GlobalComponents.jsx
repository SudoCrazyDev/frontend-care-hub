import React, { useContext } from "react";
import { NotficationContext } from "../helpers/ContextStore";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const GetNotificationMessage = (status, message) => {
    switch (status) {
        case 'success':
            return <MuiAlert elevation={6} variant="filled" severity="success" className="bg-success"><strong>{message}</strong></MuiAlert>;
        case 'error':
            return <MuiAlert elevation={6} variant="filled" severity="error" className="bg-danger"><strong>{message}</strong></MuiAlert>;
        case 'info':
            return <MuiAlert elevation={6} variant="filled" severity="info" className="bg-danger"><strong>{message}</strong></MuiAlert>;
        default:
            return <MuiAlert elevation={6} variant="filled" severity="info" className="bg-danger"><strong>{message}</strong></MuiAlert>;
    }
}
function SnackBarNotification(){
    const [notification, setNotification] = useContext(NotficationContext);

    return(
        <Snackbar
            open={notification.state}
            autoHideDuration={5000}
            onClose={() => setNotification({...notification, state: false})}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                {GetNotificationMessage(notification.status, notification.message)}
        </Snackbar>
    );
};

export { SnackBarNotification };