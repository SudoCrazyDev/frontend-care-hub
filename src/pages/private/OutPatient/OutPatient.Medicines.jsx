import { useSelector } from 'react-redux';
import { IconButton, TextField, Autocomplete  } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import React, { useState } from "react";

export default function OutPatientMedicines({formik}){
    const { medicines } = useSelector(state => state.medicines);
    const [selectedMed, setSelectedMed] = useState(null);
    const [qty, setQty] = useState(0);
    const [instructions, setInstructions] = useState('');

    const handleAddMedicine = () => {
        if(selectedMed !== null || qty || instructions !== ''){
            formik.setFieldValue('medicines', [...formik.values.medicines, {name: selectedMed.name, unit: selectedMed.unit, qty: qty, instructions: instructions}]);
            setQty(0);
            setInstructions('');
            setSelectedMed(null);
        }
    };

    const handleRemoveMedicine = (index) => {
        let selectedMeds = formik.values.medicines;
        selectedMeds.splice(index, 1);
        formik.setFieldValue('medicines', selectedMeds);
    };
    
    return (
        <table className="table table-hover table-bordered">
            <thead>
                <tr>
                    <th></th>
                    <th width="40%">Medicine</th>
                    <th width="20%">Unit</th>
                    <th width="15%">Qty</th>
                    <th width="25%">Instructions</th>
                </tr>
            </thead>
            <tbody>
                {formik.values && formik.values.medicines.map((medicine, index) => (
                    <tr key={index}>
                        <td>
                            <IconButton size="small" color="error" onClick={() => handleRemoveMedicine(index)}>
                                <RemoveIcon />
                            </IconButton>
                        </td>
                        <td>{medicine.name}</td>
                        <td>{medicine.unit}</td>
                        <td>{medicine.qty}</td>
                        <td>{medicine.instructions}</td>
                    </tr>
                ))}
                <tr>
                    <td className="align-middle">
                        <IconButton size="small" color="primary" onClick={handleAddMedicine}>
                            <AddIcon />
                        </IconButton>
                    </td>
                    <td className="align-middle">
                        <Autocomplete 
                            disablePortal
                            options={medicines}
                            getOptionLabel={(option) => option.name}
                            onChange={(event, newValue) => setSelectedMed(newValue)}
                            renderInput={(params) => <TextField {...params}/>}
                        />
                    </td>
                    <td className="align-middle">
                        {selectedMed !== null && (
                            <p className='m-0 fw-bold'>{selectedMed.unit}</p>
                        )}
                    </td>
                    <td className="align-middle">
                        <TextField 
                            error={qty === 0}
                            helperText={qty === 0 && 'Quantity Required'}
                            onChange={(event) => setQty(parseInt(event.target.value))}
                            value={qty}
                            variant="outlined"
                            size="small"
                            type="number"
                        />
                    </td>
                    <td className="align-middle">
                        <TextField 
                            error={instructions === ''}
                            helperText={instructions === '' && 'Instructions Required'}
                            onChange={(event) => setInstructions(event.target.value)}
                            value={instructions}
                            variant="outlined"
                            size="small"
                            fullWidth
                            multiline
                            rows={2}
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    );
};