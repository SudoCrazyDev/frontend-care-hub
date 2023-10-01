import TabPanel from "@mui/joy/TabPanel";
import axios from "axios";
import { useEffect, useState } from "react";
import PatientAddMedicine from "./PatientData.AddMedicine";
import PrintRx from "./components/Appointments/PrintRx";

export default function PatientMedicines({patientData}){
    const [medications, setMedications] = useState([]);
    const appointment = {patient: patientData};
    
    const handleFetchMedications = () => {
        axios.get(`patients/get_patient_medications/${patientData.id}`)
        .then((res) => {
            setMedications(res.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
        });
    };
    
    useEffect(() => {
        handleFetchMedications();
    },[]);
    
    return(
        <TabPanel value={2}>
            <div className="card-body bg-white rounded p-3 d-flex flex-row flex-wrap" style={{ minHeight: '300px'}}>
                <div className="d-flex flex-row align-items-center w-100">
                    <div className="ms-auto d-flex flex-row gap-2">
                        <PatientAddMedicine patientData={patientData} setMedicationsMain={setMedications}/>
                    </div>
                </div>
                <div className="col-12 my-3">
                    <table className="table table-bordered shadow-lg">
                        <thead>
                            <tr>
                                <th>PRESCRIPTION DATE</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {medications.map((medicine, index) => (
                                <tr key={index}>
                                    <td className="fw-bold">{new Date(medicine.created_at).toLocaleDateString('en-CA')}</td>
                                    <td><PrintRx appointment={appointment} schedule={medicine} medicines={JSON.parse(medicine.medicines)}/></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </TabPanel>
    );
};