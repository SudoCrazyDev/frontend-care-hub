import PropTypes from 'prop-types';
import { CHButton } from '../CHButtons/CareHubButtons';
import { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@mui/material';
import AutoDynamicFormBuilder from './AutoDynamicFormBuilder';

export default function AutoDynamicModalBuilder(props){

    //**Destructuring Props */
    const { 
        title,
        type,
        dialogMaxWidth,
        dialogFullWidth,
        fields
    } = props.config;

    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(!showModal);
    };

    return(
        <>
        <CHButton variant="contained" color="primary" size="medium" onClick={handleShowModal}>
            {type} {title}
        </CHButton>
        <Dialog open={showModal} onClose={handleShowModal} maxWidth={dialogMaxWidth} fullWidth={dialogFullWidth}>
        <DialogTitle className="fw-bolder">{type} {title}</DialogTitle>
        <Divider />
        <form>
            <DialogContent>
                <AutoDynamicFormBuilder fields={fields}/>
            </DialogContent>
            <DialogActions>
                <CHButton variant="contained" color="primary" size="medium" onClick={handleShowModal}>Save</CHButton>
                <CHButton variant="contained" color="error" size="medium" onClick={handleShowModal}>Cancel</CHButton>
            </DialogActions>
        </form>
        </Dialog>
        </>
    );
};

AutoDynamicModalBuilder.propTypes = {
    config: PropTypes.shape({
        title: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        dialogMaxWidth: PropTypes.string.isRequired,
        dialogFullWidth: PropTypes.bool.isRequired,
        fields: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            componentType: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            placeholder: PropTypes.string.isRequired,
            required: PropTypes.bool.isRequired,
            disabled: PropTypes.bool.isRequired,
            singleColumn: PropTypes.bool.isRequired
        }))
    }).isRequired
};

AutoDynamicModalBuilder.DefaultProps = {
    config: {
        title: 'NO TITLE PASS',
        type: 'NO TYPE PASS',
        dialogMaxWidth: 'md',
        dialogFullWidth: true,
        fields: [
            {id: 'NO ID', componentType: 'textfield', type: 'text', label: 'NO LABEL', placeholder: 'NO PLACEHOLDER', required: false, disabled: false, singleColumn: false}
        ]
    }
};
