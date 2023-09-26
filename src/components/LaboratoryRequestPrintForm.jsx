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
      marginTop: '25px',
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
    docInfo1:{
        fontSize: 15,
        fontWeight: "extrabold"
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
        justifyContent: 'space-between',
    },
    labRequestTitle:{
        fontSize: 25,
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
        fontSize: 13,
        width: '33.33333333%',
        marginTop: '2px',
        marginBottom: '2px'
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

export default function LaboRatoryRequestPrintForm({appointment}){
    console.log(appointment);
    return(
        <Document>
            <Page size="A5" style={styles.page}>
                <View style={styles.halfPage1}>
                    <View style={styles.headingSection}>
                        <Text>
                            <Image src={"/assets/png/company_logo.png"}/> 
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
                    {appointment.lab_request.map((section, index) => (
                        <React.Fragment key={index}>
                            <View style={styles.labRequestSectionHeader}>
                                <Text style={styles.labRequestTitle}>{section.title}</Text>
                            </View>
                            <View style={styles.labRequestSection}>
                                {section.value.map((sectionValue, index) => (
                                    <Text style={styles.bloodChemistryTitle} key={index}>{`${sectionValue.value ? ' _X_' : '___'}`} {sectionValue.title} </Text>
                                ))}
                            </View>
                        </React.Fragment>
                    ))}
                    <View style={styles.patientInfo}>
                            <View>
                                <Text style={styles.divider}></Text>
                                <Text style={styles.docInfo1}>NATIVIDAD M. TORRE, M.D.</Text>
                                <Text style={styles.docInfo1}>License No.: 0077811</Text>
                                <Text style={styles.docInfo1}>PTR No.: 0525578A</Text>
                                <Text style={styles.docInfo1}>S2 No.: 010505RM21-044-M</Text>
                            </View>
                    </View>
                </View>
                <View style={styles.halfPage2}>
                    
                </View>
            </Page>
        </Document>
    );
};