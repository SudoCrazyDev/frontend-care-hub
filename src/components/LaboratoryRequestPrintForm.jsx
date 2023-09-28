import React, { useState } from "react";
import { Document, Page, View, Text, StyleSheet, Image, Font, PDFViewer} from "@react-pdf/renderer";
import { calculateAgeWithMonths } from "../helpers/HelperFunctions";
import PrintIcon from '@mui/icons-material/Print';

import RobotoThin from '../assets/fonts/Roboto-Thin.ttf';
import RobotoLight from '../assets/fonts/Roboto-Light.ttf';
import RobotoRegular from '../assets/fonts/Roboto-Regular.ttf';
import RobotoMedium from '../assets/fonts/Roboto-Medium.ttf';
import RobotoBold from '../assets/fonts/Roboto-Bold.ttf';
import RobotoBlack from '../assets/fonts/Roboto-Black.ttf';
import { Dialog, DialogContent, IconButton } from "@mui/material";

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

const styles = StyleSheet.create({
    page: {
      fontFamily: 'Roboto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
});

export default function LaboRatoryRequestPrintForm({appointment}){
    const [open, setOpen] = useState(false);
    
    const handleModalState = () => {
        setOpen(!open);
    };
    
    return(
        <>
        <IconButton color="primary" size="small" onClick={() => handleModalState()}>
            <PrintIcon />
        </IconButton>
        <Dialog open={open} maxWidth="md" fullWidth onClose={() => handleModalState()}>
            <DialogContent style={{height: '70vh'}}>
                <PDFViewer style={{height: '100%', width: '100%'}}>
                    <Document>
                        <Page size="A5" style={styles.page}>
                            <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%'}}>
                                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                                    <Image src={"/assets/png/company_logo.png"} style={{height: '25px', width: '25px'}} />
                                    <Text style={{height: 'auto', width: 'auto', fontWeight: 500}}>
                                        Natividad M. Torre, M.D.
                                    </Text>
                                </View>
                                
                                <Text style={{width: '100%', textAlign: 'center', fontSize: '8px', fontWeight: 400, marginTop: '-5px'}}>
                                    INTERNAL MEDICINE
                                </Text>
                                <Text style={{width: '100%', textAlign: 'center', fontSize: '8px', fontWeight: 400, marginTop: '1px'}}>
                                    KIDNEY DISEASE AND HYPERTENSION
                                </Text>
                                
                                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
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
                                
                                <View style={{display:'flex', flexDirection: 'row', justifyContent: 'center'}}>
                                    <Text style={{width: '95%', borderTop: '0.8px solid #222222', marginTop: '2px', marginBottom: '5px'}}></Text>
                                </View>
                                
                                <View style={{display:'flex', flexDirection: 'row', justifyContent: 'center'}}>
                                    <View style={{width: '62%', display: 'flex', flexDirection: 'column', marginTop: '10px'}}>
                                        <Text style={{fontSize: '10px', fontWeight: 300}}>Patient: <Text style={{fontWeight: 400}}>{`${String(appointment.patient.firstname).toUpperCase()} ${String(appointment.patient.lastname).toUpperCase()}`}</Text></Text>
                                        <Text style={{fontSize: '10px', fontWeight: 300}}>Address: <Text style={{fontWeight: 400}}>{`${String(appointment.patient.address).toUpperCase()}`}</Text></Text>
                                    </View>
                                    
                                    <View style={{width: '33%', marginTop: '10px', marginBottom: '10px'}}>
                                        <Text style={{fontSize: '10px', fontWeight: 300}}>Date: <Text style={{fontWeight: 400}}>{new Date().toLocaleDateString('en-US')}</Text></Text>
                                        <Text style={{fontSize: '10px', fontWeight: 300}}>Age/Sex: <Text style={{fontWeight: 400}}>{calculateAgeWithMonths(appointment.patient.birthdate).age}yrs Old / {appointment.patient.gender}</Text></Text>
                                    </View>
                                </View>
                                
                                
                                
                                {appointment.lab_request.map((section, index) => (
                                    <React.Fragment key={index}>
                                        <View style={{width: '100%', textAlign: 'center', fontWeight: 700, marginVertical: '10px'}}>
                                            <Text>{section.title}</Text>
                                        </View>
                                        <View style={{width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', textAlign: 'center', marginTop: '5px'}}>
                                            {section.value.map((sectionValue, index) => (
                                                <Text style={{fontSize: '15px', fontWeight: 400, width: '33%', textAlign: 'left'}} key={index}>{`${sectionValue.value ? ' _X_' : '___'}`} {sectionValue.title} </Text>
                                            ))}
                                        </View>
                                    </React.Fragment>
                                ))}
                                    
                                <View style={{marginTop: 'auto', display: 'flex', flexDirection: 'column'}}>
                                    <View style={{display:'flex', flexDirection: 'row'}}>
                                        <Text style={{width: '45%', borderTop: '0.8px solid #222222', marginTop: '2px', marginBottom: '5px'}}></Text>
                                    </View>
                                    <Text style={{fontSize: '12px', fontWeight: 700}}>NATIVIDAD M. TORRE, M.D.</Text>
                                    <Text style={{fontSize: '12px', fontWeight: 400}}>License No.: 0077811</Text>
                                    <Text style={{fontSize: '12px', fontWeight: 400}}>PTR No.: 0525578A</Text>
                                    <Text style={{fontSize: '12px', fontWeight: 400}}>S2 No.: 010505RM21-044-M</Text>
                                </View>
                            </View>
                            
                        </Page>
                    </Document>
                </PDFViewer>
            </DialogContent>
        </Dialog>
        </>
    );
};