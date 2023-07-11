import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from "react";
import { Avatar, Button, IconButton } from '@mui/material';
import { setUser } from '../../../redux/slicers/userSlice';

export default function ProfileDropDown(){
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [toggle, setToggle] = useState(false);

    const handleToggle = () => {
        setToggle(!toggle);
    };

    const handleLogout = () => {
        dispatch(setUser(null));
    };

    return(
        <>
        <div className="ms-auto" style={{ position: 'relative', display: 'inline-block'}}>
            <IconButton onClick={handleToggle}>
                <Avatar>
                    {user.firstname !== null ? String(user.firstname).charAt(0).toUpperCase() : '?'}
                </Avatar>
            </IconButton>
            {toggle &&
                <div className="card" style={{minWidth: '350px', position: 'absolute', transform: 'translate(-310px, 0px)', zIndex: 1}}>
                    <div className="card-header p-4">
                        <h4 className="m-0">Hi! {String(user.firstname)}</h4>
                    </div>
                    <div className="card-body">
                        <Button variant='outlined' onClick={handleLogout}>Logout</Button>
                    </div>
                </div>
            }
        </div>
        </>
    );
};