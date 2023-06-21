import React, { createContext, useContext, useState } from 'react';

export const NotficationContext = createContext();

export default function ContextStore({children}){
    const [notification, setNotification] = useState({state: false, type: '', message: ''});

    return(
        <NotficationContext.Provider value={[notification, setNotification]}>
            {children}
        </NotficationContext.Provider>
    );
}