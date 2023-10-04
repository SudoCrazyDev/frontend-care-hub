import { Button, Dialog, DialogContent } from "@mui/material";
import { Document, Page, View, Text, StyleSheet, Image, Font, PDFViewer} from "@react-pdf/renderer";
import { useState } from "react";
import RobotoThin from "../../../assets/fonts/Roboto-Thin.ttf";
import RobotoLight from "../../../assets/fonts/Roboto-Light.ttf";
import RobotoRegular from "../../../assets/fonts/Roboto-Regular.ttf";
import RobotoMedium from "../../../assets/fonts/Roboto-Medium.ttf";
import RobotoMediumItalic from "../../../assets/fonts/Roboto-MediumItalic.ttf";
import RobotoBold from "../../../assets/fonts/Roboto-Bold.ttf";
import RobotoBlack from "../../../assets/fonts/Roboto-Black.ttf";

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
            fontStyle: 'normal',
        },
        {
            src: RobotoMediumItalic,
            fontWeight: 500,
            fontStyle: 'italic',
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

export default function MedCertPrint({appointment, medicines, schedule}){
    const [open, setOpen] = useState(false);
    
    const handleModalState = () => {
        setOpen(!open);
    };

    return(
        <>
        <Button variant="contained" className="fw-bolder" onClick={() => handleModalState()}>Print Medical Certificate</Button>
        <Dialog open={open} maxWidth="md" fullWidth onClose={() => handleModalState()}>
            <DialogContent style={{height: '70vh'}}>
                <PDFViewer style={{height: '100%', width: '100%'}}>
                    <Document>
                        <Page size={"LETTER"} style={{fontFamily: 'Roboto', dispaly: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}} fixed>
                                <Image src={"/assets/png/company_logo.png"} style={{height: '25px', width: '25px'}} />
                                <Text style={{height: 'auto', width: 'auto', fontWeight: 500}}>
                                    Natividad M. Torre, M.D.
                                </Text>
                            </View>
                            
                            <Text style={{width: '100%', textAlign: 'center', fontSize: '8px', fontWeight: 400, marginTop: '-5px'}} fixed>
                                INTERNAL MEDICINE
                            </Text>
                            <Text style={{width: '100%', textAlign: 'center', fontSize: '8px', fontWeight: 400, marginTop: '1px'}} fixed>
                                KIDNEY DISEASE AND HYPERTENSION
                            </Text>
                                
                            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}} fixed>
                                <View style={{width: '62%', display: 'flex', flexDirection: 'column'}}>
                                    <Text style={{fontSize: '12px', fontWeight: 700}}>
                                        CLINIC HOURS
                                    </Text>
                                    <Text style={{fontSize: '8px', fontWeight: 300}}>
                                        Mon - Fri Except Wed
                                    </Text>
                                    <Text style={{fontSize: '8px', fontWeight: 300}}>
                                        Room 201, 2F, Generals Complex Bldg.
                                    </Text>
                                    <Text style={{fontSize: '8px', fontWeight: 300}}>
                                        Roxas, East Ave. G.S.C
                                    </Text>
                                    <Text style={{fontSize: '8px', fontWeight: 300}}>
                                        9:00 A.M - 5:00 P.M
                                    </Text>
                                    <Text style={{fontSize: '8px', fontWeight: 300}}>
                                        Sun No.: 09228212825
                                    </Text>
                                </View>
                                <View style={{width: '33%', display: 'flex', flexDirection: 'column'}}>
                                    <Text style={{fontSize: '12px', fontWeight: 700}}>
                                        HOSPITAL AFFILIATIONS
                                    </Text>
                                    <Text style={{fontSize: '8px', fontWeight: 300}}>
                                        Mindanao Medical Center
                                    </Text>
                                    <Text style={{fontSize: '8px', fontWeight: 300}}>
                                        St. Elizabeth Hospital
                                    </Text>
                                    <Text style={{fontSize: '8px', fontWeight: 300}}>
                                        General Santos Doctors Hospital
                                    </Text>
                                    <Text style={{fontSize: '8px', fontWeight: 300}}>
                                        Sarangani Bay Specialist Medical Center
                                    </Text>
                                    <Text style={{fontSize: '8px', fontWeight: 300}}>
                                        TUFAMATO Dialysis & Wellness Center
                                    </Text>
                                </View>
                            </View>
                                
                            <View style={{display:'flex', flexDirection: 'row', justifyContent: 'center'}} fixed>
                                <Text style={{width: '95%', borderTop: '0.8px solid #222222', marginTop: '2px', marginBottom: '5px'}}></Text>
                            </View>
                            
                            {/* <View style={{display:'flex', flexDirection: 'row', justifyContent: 'center'}} fixed>
                                <View style={{width: '62%', display: 'flex', flexDirection: 'column', marginTop: '10px'}}>
                                    <Text style={{fontSize: '10px', fontWeight: 300}}>Patient: <Text style={{fontWeight: 400}}>{`${String(appointment.patient.firstname).toUpperCase()} ${String(appointment.patient.lastname).toUpperCase()}`}</Text></Text>
                                    <Text style={{fontSize: '10px', fontWeight: 300}}>Address: <Text style={{fontWeight: 400}}>{`${String(appointment.patient.address).toUpperCase()}`}</Text></Text>
                                </View>
                                
                                <View style={{width: '33%', marginTop: '10px', marginBottom: '10px'}}>
                                    <Text style={{fontSize: '10px', fontWeight: 300}}>Date: <Text style={{fontWeight: 400}}>{new Date().toLocaleDateString('en-US')}</Text></Text>
                                    <Text style={{fontSize: '10px', fontWeight: 300}}>Age/Sex: <Text style={{fontWeight: 400}}>{calculateAgeWithMonths(appointment.patient.birthdate).age}yrs Old / {appointment.patient.gender}</Text></Text>
                                </View>
                            </View>
                                
                            {medicines.map((medicine, index) => (
                                <View key={index} style={{alignSelf: 'center', width: '95%', display: 'flex', justifyContent: 'center', marginTop: '18px', fontSize: '10px', gap: '3px'}}>
                                    <Text>{`${medicine.generic_name} - ${medicine.unit}`}</Text>
                                    <Text>{`(${medicine.description}) Qty: ${medicine.qty}`}</Text>
                                    <Text style={{fontWeight: 500, fontStyle: 'italic'}}>{`SIG: ${medicine.instruction}`}</Text>
                                </View>
                            ))} */}
                            
                            <View style={{marginTop: 'auto', display: 'flex', flexDirection: 'column', paddingTop: '20px'}} fixed>
                                <View style={{display:'flex', flexDirection: 'row'}}>
                                    <Text style={{width: '45%', borderTop: '0.8px solid #222222', marginTop: '2px', marginBottom: '5px'}}></Text>
                                </View>
                                <Text style={{fontSize: '12px', fontWeight: 700}}>NATIVIDAD M. TORRE, M.D.</Text>
                                <Text style={{fontSize: '12px', fontWeight: 400}}>License No.: 0077811</Text>
                                <Text style={{fontSize: '12px', fontWeight: 400}}>PTR No.: 0525578A</Text>
                                <Text style={{fontSize: '12px', fontWeight: 400}}>S2 No.: 010505RM21-044-M</Text>
                            </View>
                        </Page>
                    </Document>
                </PDFViewer>
            </DialogContent>
        </Dialog>
        </>
    );
}