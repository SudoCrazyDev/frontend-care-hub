import React, { useEffect, useState } from 'react';
import FluentTable from '../../../components/FluentTable/FluentTable';
import FluentTableHeader from '../../../components/FluentTable/components/FluentTable.Header';
import FluentTableBody from '../../../components/FluentTable/components/FluentTable.Body';
import FluentTableRow from '../../../components/FluentTable/components/FluentTable.Row';
import { Skeleton, Tooltip } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { CHTableIconButton } from '../../../components/CHButtons/CareHubButtons';
import TopicIcon from '@mui/icons-material/Topic';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { GetPatientPaginationLinks, GetPatients } from '../../../helpers/HelperRedux';
import FluentTablePagination from '../../../components/FluentTable/components/FluentTable.Pagination';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLinks, setPatients } from '../../../redux/slicers/patientsSlice';
import PatientLookup from './Patient.table.lookup';

export default function PatientTable(){
    const patients = GetPatients();
    const links = GetPatientPaginationLinks();
    const { loading } = useSelector(state => state.patients);
    const dispatch = useDispatch();

    const handleLinkClick = (link) => {
        Axios.get(link)
        .then(res => {
            dispatch(setPatients(res.data.data))
            dispatch(setLinks(res.data.links))
        })
    };

    return(
        <div className="d-flex flex-row flex-wrap">
            <div className="d-flex flex-row">
                <PatientLookup />
            </div>
            <div className="col-12 mx-h-50 overflow-y-scroll">
                <FluentTable>
                    <FluentTableHeader>
                        <tr>
                            <th className='rounded-top'>PATIENT CODE</th>
                            <th>PATIENT NAME</th>
                            <th></th>
                        </tr>
                    </FluentTableHeader>
                    <FluentTableBody>
                        {patients.length === 0 || loading && Array(10).fill().map((_,i)=>(
                            <tr key={i}>
                                <td><Skeleton variant="rect"/></td>
                                <td><Skeleton variant="rect"/></td>
                                <td><Skeleton variant="rect"/></td>
                            </tr>
                        ))
                        }
                        {patients.length === 0 && !loading && <tr><td colSpan={3}>No patients found</td></tr>}
                        {patients !== 0 && patients.map((patient, index) => (
                            <FluentTableRow key={index}>
                                <td width={`30%`} className="fw-bolder">{patient.id}</td>
                                <td width={`55%`}>{patient.firstname} {patient.lastname}</td>
                                <td width={`15%`}>
                                    <Tooltip title="View Patient Data">
                                        <NavLink to={`/patients/${patient.id}`}>
                                            <CHTableIconButton size="small">
                                                <TopicIcon className="ch-primary"/>
                                            </CHTableIconButton>
                                        </NavLink>
                                    </Tooltip>
                                    <Tooltip title="Create an Appointment">
                                        <NavLink to={`/patients/${patient.id}`}>
                                            <CHTableIconButton size="small">
                                                <PostAddIcon className="ch-primary"/>
                                            </CHTableIconButton>
                                        </NavLink>
                                    </Tooltip>
                                </td>
                            </FluentTableRow>
                        ))}
                    </FluentTableBody>
                </FluentTable>
            </div>
            <div className="d-flex flex-row">
                <FluentTablePagination links={links} onLinkClick={handleLinkClick}/>
            </div>
        </div>
    );
};