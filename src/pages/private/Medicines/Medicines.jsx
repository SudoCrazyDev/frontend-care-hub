import { useSelector } from 'react-redux';
import { Divider, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FilterTextInput } from "../../../components/CHInputs/CareHubInputs";
import FluentTable from "../../../components/FluentTable/FluentTable";
import FluentTableHeader from "../../../components/FluentTable/components/FluentTable.Header";
import FluentTableBody from "../../../components/FluentTable/components/FluentTable.Body";
import FluentTableRow from "../../../components/FluentTable/components/FluentTable.Row";
import MedicineModal from "./Medicines.modal";

export default function Medicines(){
    const {medicines, loading} = useSelector(state => state.medicines);

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
                        <div className="d-flex flex-row gap-3">
                            <FilterTextInput size="lg" type="text" label="Medicine Name"/>
                        </div>
                        <div className="col-12 mx-h-50 overflow-y-scroll">
                            <FluentTable>
                                <FluentTableHeader>
                                    <tr>
                                        <th>Name</th>
                                        <th>Unit</th>
                                        <th>Action</th>
                                    </tr>
                                </FluentTableHeader>
                                <FluentTableBody>
                                    {loading && (
                                        <FluentTableRow>
                                            <td colSpan={2}><Skeleton variant="rect" /></td>
                                        </FluentTableRow>
                                    )}
                                    {!loading && medicines.length === 0 && (
                                        <FluentTableRow>
                                        <td colSpan={2}>NO MEDICINES</td>
                                    </FluentTableRow>
                                    )}
                                    {!loading && medicines.map((medicine, index) => (
                                        <FluentTableRow key={index}>
                                            <td className="fw-bolder text-uppercase">{medicine.name}</td>
                                            <td>{medicine.unit}</td>
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