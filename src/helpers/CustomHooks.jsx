import React, { useContext } from "react";
import { NotficationContext } from "./ContextStore";

function useNotification(){
    const [notification, setNotification] = useContext(NotficationContext);

    const handleNotification = (status, message) => {
        setNotification({status, message, state: true});
    };

    return { handleNotification};
}

export { useNotification }