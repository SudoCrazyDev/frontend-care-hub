import { TextField } from "@mui/material";
import FormBuilder from "../FormBuilder/FormBuilder";
import PropTypes from 'prop-types';

const generateComponent = (field) => {
    switch (field.componentType) {
        case 'textfield':
            return <TextField 
             disabled={field.disabled}
             type={field.type}
             className="text-capitalize"
             variant="outlined" label={field.label} 
             placeholder={field.placeholder} 
             fullWidth={true}/>;
        default:
            return <TextField disabled type="text" className="text-capitalize" variant="outlined" label='NO COMPONENT TYPE SPECIFIED' placeholder="NO COMPONENT TYPE SPECIFIED" fullWidth={true}/>;
    }
};



export default function AutoDynamicFormBuilder(props){

    //**Default Props and Destructuring Props */
    const {
        fields
    } = props;

    return(
        <FormBuilder>
            {fields.map((field, index) => (
                <div key={index} className={`my-1 ${field.singleColumn ? 'col-12' : 'col-md-12 col-lg-6'}`}>
                    {generateComponent(field)}
                </div>
            ))}
        </FormBuilder>
    );
};

AutoDynamicFormBuilder.propTypes = {
    fields: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        componentType: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        placeholder: PropTypes.string.isRequired,
        required: PropTypes.bool.isRequired,
        disabled: PropTypes.bool.isRequired,
        singleColumn: PropTypes.bool.isRequired,
    })).isRequired
};

AutoDynamicFormBuilder.DefaultProps = {
    fields: [
        {
            id: 'NO ID', 
            componentType: 'textfield', 
            type: 'text', 
            label: 'NO LABEL', 
            placeholder: 'NO PLACEHOLDER', 
            required: false, 
            disabled: false, 
            singleColumn: false
        }
]
};