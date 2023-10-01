import axios from "axios";
import { useFormik } from "formik";
import { useNotification } from "../../../../helpers/CustomHooks";

export default function InitializeFormik(appointment, setAppointments){
    const { handleNotification } = useNotification();
    
    const handleSubmit = (values) => {
        formik.setSubmitting(true);
        handleNotification('success', 'Saving....')
        
        if(values.has_lab_request){
            values['lab_request'] = JSON.stringify(values["lab_request"]);
        }
        
        axios.post(`out_patients/insert_outpatient`, values)
        .then(res => {
            handleNotification('success', 'Sucessfully saved')
            setAppointments(res.data);
            setTimeout(() => {formik.setSubmitting(false);}, 1500);
        })
    };
    
    const formik = useFormik({
        initialErrors: {
            professional_fee: true,
        },
        initialValues:{
            patient_id: appointment.patient.id,
            patient:{
                firstname: appointment.patient.firstname,
                middlename: appointment.patient.middlename,
                lastname: appointment.patient.lastname,
                address: appointment.patient.address,
                birthdate: appointment.patient.birthdate,
                gender: appointment.patient.gender
            },
            has_admission: 0,
            admission_content: '',
            appointment_id: appointment.id,
            has_lab_request: appointment.has_lab_request,
            professional_fee: 0,
            significant_findings: '',
            current_date: new Date().toLocaleDateString('en-CA')
        },
        onSubmit: handleSubmit
    });
    
    return formik;
};