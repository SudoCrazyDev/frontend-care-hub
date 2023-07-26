import React from "react";
import { Document, Page, View, Text, StyleSheet, Image, Font} from "@react-pdf/renderer";
import { calculateAgeWithMonths } from "../helpers/HelperFunctions";

Font.register({
    family: 'Ubuntu',
    fonts: [
        {
            src: 'https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf',
        }
    ]
});

const styles = StyleSheet.create({
    page: {
      padding: '5px',
      fontFamily: 'Ubuntu',
      transform: 'rotate(360deg)',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      height: '100%'
    },
    halfPage1:{
        width: '100%',
    },
    halfPage2:{
        width: '50%'
    },
    headingSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    smallFont:{
        fontSize: 8,
        fontWeight: 'bold'
    },
    sectionTitle:{
        fontSize: 10,
        fontWeight: '500'
    }, 
    sectionInfo:{
        fontSize: 8,
        fontWeight: 'light'
    },
    infoSection:{
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    divider:{
        borderTop: '1px solid black'
    },
    patientInfo:{
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    patientInfo1:{
        fontSize: 8,
    },
    labRequestSectionHeader:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 8
    },
    labRequestSection:{
        fontSize: 8,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    labRequestTitle:{
        fontSize: 15,
        fontWeight: 'bold'
    },
    bloodChemistrySection:{
        fontSize: 9,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    bloodChemistryTitle:{
        fontSize: 7,
        width: '33.33333333%'
    },
    xrayExaminationSection:{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    xrayExaminiationTitle:{
        fontSize: 7,
        width: '50%'
    }
});

export default function LaboRatoryRequestPrintForm({formik, appointment, patient}){
    return(
        <Document>
            <Page size="A4" orientation="portrait" style={styles.page}>
                <View style={styles.halfPage1}>
                    <View style={styles.headingSection}>
                        <Text>
                            <Image src={"/assets/png/kidney_480px.png"}/> 
                            Natividad M. Torre, M.D.
                        </Text>
                        <Text style={styles.smallFont}>INTERNAL MEDICINE</Text>
                        <Text style={styles.smallFont}>KIDNEY DISEASES AND HYPERTENSION</Text>
                    </View>
                    <View style={styles.infoSection}>
                        <View>
                            <Text style={styles.sectionTitle}>CLINIC HOURS</Text>
                            <Text style={styles.sectionInfo}>Mon-Sat Except Wed</Text>
                            <Text style={styles.sectionInfo}>GenMedex Bldg. Room 201</Text>
                            <Text style={styles.sectionInfo}>Roxas St., G.S.C</Text>
                            <Text style={styles.sectionInfo}>9:00 A.M - 12:00 NN</Text>
                            <Text style={styles.sectionInfo}>Mobile No.: 0922-821-2825</Text>
                        </View>
                        <View>
                            <Text style={styles.sectionTitle}>HOSPITAL AFFILIATIONS</Text>
                            <Text style={styles.sectionInfo}>Mindanao Medical Center</Text>
                            <Text style={styles.sectionInfo}>St. Elizabeth Hostpital</Text>
                            <Text style={styles.sectionInfo}>General Santos Doctors Hospital</Text>
                            <Text style={styles.sectionInfo}>Sarangani Bay Specialist Medical Center</Text>
                            <Text style={styles.sectionInfo}>TUFAMATO Dialysis & Wellness Center</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.divider}></Text>
                    </View>
                    <View style={styles.patientInfo}>
                            <View>
                                <Text style={styles.patientInfo1}>Patient:{`${String(appointment.patient.firstname).toUpperCase()} ${String(appointment.patient.lastname).toUpperCase()}`}</Text>
                                <Text style={styles.patientInfo1}>Address: {`${String(appointment.patient.address).toUpperCase()}`}</Text>
                            </View>
                            <View>
                                <Text style={styles.patientInfo1}>Date: {new Date().toLocaleDateString('en-US')}</Text>
                                <Text style={styles.patientInfo1}>Age/Sex: {calculateAgeWithMonths(appointment.patient.birthdate).age}yrs Old / {appointment.patient.gender}</Text>
                            </View>
                    </View>
                    <View style={styles.labRequestSectionHeader}>
                        <Text style={styles.labRequestTitle}>LABORATORY REQUESTS</Text>
                    </View>
                    <View style={styles.labRequestSection}>
                        <Text>{`${Boolean(parseInt(appointment.laboratory.cbc)) ? ' _X_' : '___'}`} CBC </Text>
                        <Text>{`${Boolean(parseInt(appointment.laboratory.urinalysis)) ? ' _X_' : '___'}`} URINALYSIS </Text>
                        <Text>{`${Boolean(parseInt(appointment.laboratory.stool_exam)) ? ' _X_' : '___'}`} STOOL EXAM </Text>
                    </View>
                    <View style={styles.labRequestSectionHeader}>
                        <Text style={styles.labRequestTitle}>BLOOD CHEMISTRY</Text>
                    </View>
                    <View style={styles.xrayExaminationSection}>
                        {JSON.parse(appointment.laboratory.blood_chemistry).map((cbc, index) => (
                            <Text key={index} style={styles.bloodChemistryTitle}> {`${cbc.value ? ' _x_ ' : ' ___ '} ${cbc.title}`} </Text>
                        ))}
                    </View>
                    <View style={styles.labRequestSectionHeader}>
                        <Text style={styles.labRequestTitle}>X-RAY EXAMINATION</Text>
                    </View>
                    <View style={styles.bloodChemistrySection}>
                        {JSON.parse(appointment.laboratory.xray).map((xray, index) => (
                            <Text key={index} style={styles.xrayExaminiationTitle}> {`${xray.value ? ' _x_ ' : ' ___ '} ${xray.title}`} </Text>
                        ))}
                    </View>
                    <View style={styles.patientInfo}>
                            <View>
                                <Text style={styles.divider}></Text>
                                <Text style={styles.patientInfo1}>NATIVIDAD M. TORRE, M.D.</Text>
                                <Text style={styles.patientInfo1}>License No.: 0077811</Text>
                                <Text style={styles.patientInfo1}>PTR No.: 0525578A</Text>
                                <Text style={styles.patientInfo1}>S2 No.: 010505RM21-044-M</Text>
                            </View>
                    </View>
                </View>
                <View style={styles.halfPage2}>
                    
                </View>
            </Page>
        </Document>
    );
};