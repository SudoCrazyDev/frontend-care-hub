import { useDispatch, useSelector } from 'react-redux';
import { Button, Divider, InputAdornment, Skeleton, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FilterTextInput } from "../../../components/CHInputs/CareHubInputs";
import FluentTable from "../../../components/FluentTable/FluentTable";
import FluentTableHeader from "../../../components/FluentTable/components/FluentTable.Header";
import FluentTableBody from "../../../components/FluentTable/components/FluentTable.Body";
import FluentTableRow from "../../../components/FluentTable/components/FluentTable.Row";
import MedicineModal from "./Medicines.modal";
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear';
import { setMedicines } from '../../../redux/slicers/medicinesSlice';

export default function Medicines(){
    const dispatch = useDispatch();
    const { medicines } = useSelector(state => state.medicines);
    const [search, setSearch] = useState("");
    const [clearable, setClearable] = useState(false);
    
    const handleSearchChange = (event) => {
        if(event.target.value === ''){
            setClearable(false);
        }else{
            setClearable(true);
        }
        setSearch(event.target.value);
    };
    
    const handleFetchLookupMedicine = () => {
        axios.get(`medicines/lookup_medicine/${search}`)
        .then(res => {
            dispatch(setMedicines(res.data));
        });
    };
    
    const handleFetchMedicines = () => {
        axios.get('medicines/get_all_medicines')
        .then(res => {
            dispatch(setMedicines(res.data.data));
        });
        setSearch("");
        setClearable(false);
    };
    
    return(
        <div className="card shadow-lg border-0 h-100">
            <div className="card-body">
                <div className="row">
                    <div className="d-flex flex-row">
                        <h2 className="m-0 text-uppercase fw-bolder">Medicines</h2>
                        <div className="ms-auto">
                            <MedicineModal type={'new'}/>
                        </div>
                    </div>
                    <Divider className="my-3"/>
                    <div className="d-flex flex-row flex-wrap">
                        <div className="d-flex flex-row gap-3 align-items-center">
                            <TextField
                                variant='outlined'
                                className='my-2'
                                type="text"
                                label="Medicine Name"
                                value={search}
                                onChange={handleSearchChange}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">
                                        {clearable ? <ClearIcon onClick={handleFetchMedicines}/> : <SearchIcon onClick={handleFetchLookupMedicine}/>}
                                    </InputAdornment>,
                                }}
                            />
                            <div>
                                <Button variant='outlined' onClick={handleFetchLookupMedicine}>Search</Button>
                            </div>
                        </div>
                        <div className="col-12 mx-h-50 overflow-y-scroll">
                            <FluentTable>
                                <FluentTableHeader>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Unit</th>
                                        <th>Action</th>
                                    </tr>
                                </FluentTableHeader>
                                <FluentTableBody>
                                    {medicines.length === 0 && (
                                        <FluentTableRow>
                                        <td colSpan={2}>NO MEDICINES</td>
                                    </FluentTableRow>
                                    )}
                                    {medicines.map((medicine, index) => (
                                        <FluentTableRow key={index}>
                                            <td className="fw-bolder text-uppercase">{medicine.generic_name}</td>
                                            <td className="fw-bolder text-uppercase">{medicine.description}</td>
                                            <td>{medicine.unit.unit_name}</td>
                                            <td>
                                                <MedicineModal type={'edit'} medicine={medicine}/>
                                            </td>
                                        </FluentTableRow>
                                    ))}
                                </FluentTableBody>
                            </FluentTable>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};