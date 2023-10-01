import { Divider, TextField } from "@mui/material";
import { PDFViewer, Document, Page, View, Text, Font } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import RobotoThin from "../../../assets/fonts/Roboto-Thin.ttf";
import RobotoLight from "../../../assets/fonts/Roboto-Light.ttf";
import RobotoRegular from "../../../assets/fonts/Roboto-Regular.ttf";
import RobotoMedium from "../../../assets/fonts/Roboto-Medium.ttf";
import RobotoBold from "../../../assets/fonts/Roboto-Bold.ttf";
import RobotoBlack from "../../../assets/fonts/Roboto-Black.ttf";
import React from "react";
import axios from "axios";

Font.register({
    family: 'Roboto',
    fonts: [
        {
            src: RobotoThin,
            fontWeight: 100,
        },
        {
            src: RobotoLight,
            fontWeight: 300,
        },
        {
            src: RobotoRegular,
            fontWeight: 400,
        },
        {
            src: RobotoMedium,
            fontWeight: 500,
        },
        {
            src: RobotoBold,
            fontWeight: 700,
        },
        {
            src: RobotoBlack,
            fontWeight: 900,
        }
    ]
});
export default function Summary(){
    const [summaryDateFrom, setSummaryDateFrom] = useState(new Date().toLocaleDateString('en-CA'));
    const [summaryDateTo, setSummaryDateTo] = useState(new Date().toLocaleDateString('en-CA'));
    const [outPatients, setOutPatients] = useState([]);
    const [totalFee, setTotalFee] = useState(0);
    const [totalTendered, setTotalTendered] = useState(0);
    
    const handleSetSummaryDateFrom = (e) => {
        setSummaryDateFrom(e.target.value);
    };
    
    const handleSetSummaryDateTo = (e) => {
        setSummaryDateTo(e.target.value);
    };
    
    const handleFetchAppointments = () => {
        axios.post(`out_patients/reports`, {dateFrom: '2023-09-28', dateTo: summaryDateTo})
        .then(res => {
            let tempTotalFee = 0;
            let tempTotalTendered = 0;
            res.data.map((outpatient, i) => {
                tempTotalFee += outpatient.professional_fee;
                tempTotalTendered += outpatient.amount_tendered;
            });
            setTotalFee(tempTotalFee);
            setTotalTendered(tempTotalTendered);
            setOutPatients(res.data);
        })
    };
    
    useEffect(() => {
        handleFetchAppointments();
    }, []);
    
    return(
        <div className="card shadow-lg border-0">
            <div className="card-body">
                <div className="d-flex flex-row align-items-center gap-3 p-2">
                    <h2 className="m-0 text-uppercase fw-bolder">Summary Report</h2>
                    <TextField type="date" variant="outlined" value={summaryDateFrom} onChange={(e) => handleSetSummaryDateFrom(e)} label="Date From"/>
                    <TextField type="date" variant="outlined" value={summaryDateTo} onChange={(e) => handleSetSummaryDateTo(e)} label="Date To"/>
                </div>
                <Divider className="my-2" />
                <PDFViewer style={{height: '60vh', width: '100%'}}>
                    <Document>
                        <Page size="LEGAL" style={{fontFamily: 'Roboto', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <View style={{display:'flex', flexDirection: 'column', alignItems: 'center'}} fixed>
                                <Text style={{fontSize: '25px', fontWeight: 400}}>Summary of Out-Patients</Text>
                                <Text style={{fontSize: '10px', fontWeight: 300}}>
                                    {new Date(summaryDateFrom).toDateString()} - {new Date(summaryDateTo).toDateString()}
                                </Text>
                            </View>
                            <View style={{marginBottom: '8px', paddingVertical: '5px', borderTop: '1px solid black', borderBottom: '1px solid black', width: '100%', marginTop: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center'}} fixed>
                                <Text style={{fontSize: '12px', fontWeight: 500, width: '20%'}}>
                                    Consultation Date
                                </Text>
                                <Text style={{fontSize: '12px', fontWeight: 500, width: '40%'}}>
                                    Patient Name
                                </Text>
                                <Text style={{fontSize: '12px', fontWeight: 500, width: '15%'}}>
                                    Billed Amount
                                </Text>
                                <Text style={{fontSize: '12px', fontWeight: 500, width: '15%'}}>
                                    Amount Paid
                                </Text>
                                <Text style={{fontSize: '12px', fontWeight: 500, width: '10%'}}>
                                    Remarks
                                </Text>
                            </View>
                            {outPatients.map((outpatient,i) => (
                                <React.Fragment key={i}>
                                    {i === outPatients.length - 1 ? (
                                        <View style={{display: 'flex', flexDirection: 'row', width: '100%', borderBottom: '1px solid black', paddingBottom: '5px', marginBottom: '5px'}}>
                                            <Text style={{fontSize: '11px', fontWeight: 300, width: '20%'}}>{`${new Number(i) + 1}. ${new Date(outpatient.appointment.consultation_date).toLocaleDateString('en-CA')}`}</Text>
                                            <Text style={{fontSize: '11px', fontWeight: 300, width: '40%'}}>{`${outpatient.patient.firstname} ${outpatient.patient.lastname}`}</Text>
                                            <Text style={{fontSize: '11px', fontWeight: 300, width: '15%'}}>{outpatient.professional_fee}</Text>
                                            <Text style={{fontSize: '11px', fontWeight: 300, width: '15%'}}>{outpatient.amount_tendered}</Text>
                                            <Text style={{fontSize: '11px', fontWeight: 300, width: '10%'}}>{outpatient.remarks}</Text>
                                        </View>
                                    ) : (
                                        <View style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                                            <Text style={{fontSize: '11px', fontWeight: 300, width: '20%'}}>{`${new Number(i) + 1}. ${new Date(outpatient.appointment.consultation_date).toLocaleDateString('en-CA')}`}</Text>
                                            <Text style={{fontSize: '11px', fontWeight: 300, width: '40%'}}>{`${outpatient.patient.firstname} ${outpatient.patient.lastname}`}</Text>
                                            <Text style={{fontSize: '11px', fontWeight: 300, width: '15%'}}>{outpatient.professional_fee}</Text>
                                            <Text style={{fontSize: '11px', fontWeight: 300, width: '15%'}}>{outpatient.amount_tendered}</Text>
                                            <Text style={{fontSize: '11px', fontWeight: 300, width: '10%'}}>{outpatient.remarks}</Text>
                                        </View>
                                    )}
                                </React.Fragment>
                            ))}
                            <View style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                                <Text style={{fontSize: '11px', fontWeight: 700, width: '60%', textAlign: 'right', paddingRight: '10px'}}>
                                    Grand Total {`>>`}
                                </Text>
                                <Text style={{fontSize: '11px', fontWeight: 700, width: '15%', justifyContent:'flex-start'}}>
                                    {new Number(totalFee).toFixed(2)}
                                </Text>
                                <Text style={{fontSize: '11px', fontWeight: 700, width: '15%', justifyContent:'flex-start'}}>
                                    {new Number(totalTendered).toFixed(2)}
                                </Text>
                                <Text style={{fontSize: '11px', fontWeight: 700, width: '10%', justifyContent:'flex-start'}}>
                                    
                                </Text>
                            </View>
                        </Page>
                    </Document>
                </PDFViewer>
            </div>
        </div>
    );
};