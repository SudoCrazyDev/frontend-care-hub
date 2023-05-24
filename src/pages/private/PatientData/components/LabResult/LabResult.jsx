import React, { useState } from 'react';
import { CHTableIconButton } from '../../../../../components/CHButtons/CareHubButtons';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Tooltip } from '@mui/material';
import LabResultForm from './LabResult.form';
import InventoryTwoToneIcon from '@mui/icons-material/InventoryTwoTone';

export default function LabResult({type = 'Add'}){
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(!showModal);
    };

    return (
        <>
        <Tooltip title={`${type} Result`}>
            <CHTableIconButton size="small" color="primary" onClick={handleShowModal}>
                {type == 'Add' ? <PostAddIcon /> : <InventoryTwoToneIcon />}
            </CHTableIconButton>
        </Tooltip>
        <Dialog open={showModal} onClose={handleShowModal} maxWidth='md' fullWidth>
            <DialogTitle>{type} Lab Result</DialogTitle>
            <DialogContent>
                <LabResultForm />
            </DialogContent>
            <Divider />
            <DialogActions className='shadow'>
                <div className="p-2 d-flex flex-row gap-2">
                    <Button variant='contained' color='primary'>Add</Button>
                    <Button variant='contained' className="bg-danger" onClick={handleShowModal}>Cancel</Button>
                </div>
            </DialogActions>
        </Dialog>
        </>
    );
}