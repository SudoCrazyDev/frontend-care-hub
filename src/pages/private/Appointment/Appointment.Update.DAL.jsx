import { useFormik } from "formik";
import axios from "axios";
import { useNotification } from "../../../helpers/CustomHooks";

export default function InitializeFormik(appointment, setAppointments){
    const { handleNotification } = useNotification();

    const handleSubmit = (values) => {
        axios.put(`appointments/update_appointment/${appointment.id}`, values)
        .then(res => {
            setAppointments(res.data);
            formik.setSubmitting(false);
            handleNotification('success', 'Appointment Updated');
        })
        .catch(err => {
            handleNotification('error', 'Error Updating Appointment');
        })
    };

    const formik = useFormik({
        initialValues:{
            consultation_date: appointment.consultation_date,
            patient_id: appointment.patient.id,
            patient_name: `${appointment.patient.firstname} ${appointment.patient.lastname}`,
            blood_pressure : appointment.blood_pressure || "",
            weight: appointment.weight || "",
            heart_rate: appointment.heart_rate || "",
            temperature: appointment.temperature || "",
            chief_complaint: appointment.chief_complaint || '',
            has_lab_request: appointment.has_lab_request,
            status: appointment.status,
        },
        onSubmit: handleSubmit
    });

    return formik;
};