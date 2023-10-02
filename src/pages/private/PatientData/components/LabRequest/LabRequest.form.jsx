import { Button, Checkbox, Divider, FormControlLabel, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNotification } from "../../../../../helpers/CustomHooks";

export default function LabRequestForm({formik}){
    const [sectionEdit, setSectionEdit]       = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [sections, setSections]             = useState([]);
    const [meta_id, setMetaId]                = useState("");
    const [metaTemplate, setMetaTemplate]     = useState([]);
    const { handleNotification }              = useNotification();

    const handleFetchLabRequestTemplate = () => {
        axios.get('meta_values/get_meta_key_value/lab_request_template')
        .then(res => {
            setSections(JSON.parse(res.data[0].meta_values));
            setMetaId(res.data[0].id);
        });
    };

    const handleRenamingSectionValue = (event, parentIndex, valueIndex) => {
        let old_sections = sections;
        let updated_sections = old_sections.map((mainSection, index) => {
            if(index === parentIndex){
                return{
                    ...mainSection,
                    value: mainSection.value.map((sectionValue, index) => {
                        if(index === valueIndex){
                            return {
                                ...sectionValue,
                                title: event.target.value
                            }
                        }else{
                            return sectionValue
                        }
                    })
                };
            }else{
                return mainSection
            }
        })
        let meta_template = old_sections.map((mainSection, index) => {
            if(index === parentIndex){
                return{
                    ...mainSection,
                    value: mainSection.value.map((sectionValue, index) => {
                        if(index === valueIndex){
                            return {
                                value: false,
                                title: event.target.value
                            }
                        }else{
                            return sectionValue
                        }
                    })
                };
            }else{
                return mainSection
            }
        })
        setMetaTemplate(meta_template);
        setSections(updated_sections);
    };

    const handleSectionValueChange = (event, parentIndex, valueIndex) => {
        let old_sections = sections;
        let updated_sections = old_sections.map((mainSection, index) => {
            if(index === parentIndex){
                return{
                    ...mainSection,
                    value: mainSection.value.map((sectionValue, index) => {
                        if(index === valueIndex){
                            return {
                                ...sectionValue,
                                value: event.target.checked
                            }
                        }else{
                            return sectionValue
                        }
                    })
                };
            }else{
                return mainSection
            }
        })
        setSections(updated_sections);
    };

    const handleSaveTemplate = (sectionId) => {
        if(sectionEdit == sectionId){
            setSectionEdit('');
            handleNotification('info', 'Saving....')
            setButtonDisabled(true);
            axios.put(`meta_values/update_meta_key_value/${meta_id}`, {meta_values: JSON.stringify(metaTemplate)})
            .then(res => {
                handleNotification('success', 'Template Save Successfully')
            })
            .catch(err => {
                handleNotification('error', 'Error in Saving Template');
            })
            .finally(() => {
                setButtonDisabled(false);
            });
        };

        if(sectionEdit == ''){
            setSectionEdit(sectionId);
        };
    };
    
    useEffect(()=>{
        handleFetchLabRequestTemplate();
    },[]);

    useEffect(() => {
        formik.setFieldValue(`lab_request`, sections);
    }, [sections]);

    return(
        <div className="d-flex flex-row flex-wrap">
            {sections.map((section, index) => (
                <React.Fragment key={index}>
                <div className="col-12 my-2 d-flex flex-row">
                    <h4 className="m-0 text-dark fw-bolder">{section.title}</h4>
                    <div className="ms-auto">
                        <Button variant="outlined" color="primary" onClick={() => handleSaveTemplate(section.id)} disabled={buttonDisabled}>
                            {sectionEdit === section.id ? 'Save' : 'Edit'}
                        </Button>
                    </div>
                </div>
                <div className="ps-2 col-12 d-flex flex-row flex-wrap justify-content-between">
                    {section.value.map((value, sectionValueIndex) => (
                        <React.Fragment key={sectionValueIndex}>
                            {section.id == sectionEdit ? 
                                <TextField className="col-4 p-2" variant="standard" value={sections[index].value[sectionValueIndex].title} onChange={(event) => handleRenamingSectionValue(event, index, sectionValueIndex)}/>
                            :
                                <FormControlLabel 
                                    className="col-3"
                                    control={<Checkbox checked={sections[index].value[sectionValueIndex].value} onChange={(event)=> handleSectionValueChange(event, index, sectionValueIndex)}/>} 
                                    label={`${value.title}`}
                                />
                            }
                        </React.Fragment>
                        ))}
                </div>
                <div className="col-12">
                    <Divider />
                </div>
                </React.Fragment>
            ))}
        </div>
    );
};