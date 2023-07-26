import { useFormik } from "formik";
import axios from 'axios';
import { useNotification } from "../../../../../helpers/CustomHooks";

export default function InitializeFormik(patientData, setLabResults){
    const { handleNotification } = useNotification();

    const handleSubmit = (values) => {
        
        values['lab_request'].blood_chemistry = JSON.stringify(values["lab_request"].blood_chemistry)
        values['lab_request'].xray = JSON.stringify(values["lab_request"].xray);

        let newForm = new FormData();
        newForm.append('lab_request', JSON.stringify(values['lab_request']));
        if(values['files'].length > 1){
            values['files'].map((element, index) => {
                newForm.append(`files[${index}]`, element);
            });
        }else{
            newForm.append(`files[0]`, values['files'][0]);
        }
        newForm.append('patient_id', values['patient_id']);
        newForm.append('result_date', values['result_date']);

        axios.post('patients/insert_laboratory', newForm)
        .then(res => {
            setLabResults(res.data);
            handleNotification('success', 'Success Fully Added Lab Result')
            formik.setSubmitting(false);
        })
        .catch((err) => {
            handleNotification('error', 'An Error Occured')
        })
    };

    const formik = useFormik({
        initialValues:{
            patient_id: patientData.id,
            result_date: new Date().toLocaleDateString('en-CA')
        },
        onSubmit: handleSubmit
    });

    return formik;
}