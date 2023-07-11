import React from "react";
import { Document, Page, View, Text, StyleSheet, PDFViewer, Image} from "@react-pdf/renderer";
import { Divider } from "@mui/material";
import { calculateAgeWithMonths } from "../helpers/HelperFunctions";

const styles = StyleSheet.create({
    page: {
      padding: '5px',
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
        fontWeight: 'bold'
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
        fontWeight: 'bolder'
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
            <Page size="A6" style={styles.page}>
                <View style={styles.headingSection}>
                    <Text>
                        <Image src={"/assets/png/kidney_480px.png"}/> 
                        Natividad M. Torre, M.D.
                    </Text>
                    <Text style={styles.smallFont}>INTERNAL MEDICINE</Text>
                    <Text style={styles.smallFont}>KIDNEY DISEASE AND HYPERTENSION</Text>
                </View>
                <View style={styles.infoSection}>
                    <View>
                        <Text style={styles.sectionTitle}>CLINIC HOURS</Text>
                        <Text style={styles.sectionInfo}>Mon-Sat Except Wed</Text>
                        <Text style={styles.sectionInfo}>GenMedex Bldg.</Text>
                        <Text style={styles.sectionInfo}>Santiago Blvd., GSC</Text>
                        <Text style={styles.sectionInfo}>9:00 A.M - 12:00 NN</Text>
                        <Text style={styles.sectionInfo}>Tel. No.: 554-7758</Text>
                    </View>
                    <View>
                        <Text style={styles.sectionTitle}>HOSPITAL AFFILIATIONS</Text>
                        <Text style={styles.sectionInfo}>Mindanao Medical Center</Text>
                        <Text style={styles.sectionInfo}>St. Elizabeth Hostpital</Text>
                        <Text style={styles.sectionInfo}>General Santos Doctors Hospital</Text>
                        <Text style={styles.sectionInfo}> </Text>
                        <Text style={styles.sectionInfo}>SUN No. 09228212825</Text>
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
                        <Text style={styles.bloodChemistryTitle}> {`${cbc.value ? ' _x_ ' : ' ___ '} ${cbc.title}`} </Text>
                    ))}
                </View>
                <View style={styles.labRequestSectionHeader}>
                    <Text style={styles.labRequestTitle}>X-RAY EXAMINATION</Text>
                </View>
                <View style={styles.bloodChemistrySection}>
                    {JSON.parse(appointment.laboratory.xray).map((xray, index) => (
                        <Text style={styles.xrayExaminiationTitle}> {`${xray.value ? ' _x_ ' : ' ___ '} ${xray.title}`} </Text>
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
            </Page>
        </Document>
    );
};