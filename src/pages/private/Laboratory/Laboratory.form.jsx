import FormBuilder from "../../../components/FormBuilder/FormBuilder";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Divider, IconButton, InputLabel, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import PatientFieldSearcher from "../../../components/PatientFieldSearcher/PatientFieldSearcher";
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';

const CBCSchema = [
    {title: "White Blood Cell"},
    {title: "Neutrophils"},
    {title: "Lymphocytes"},
    {title: "Eosinophils"},
    {title: "Monocytes"},
    {title: "Basophil"},
    {title: "Hemoglobin"},
    {title: "Metocrit"},
    {title: "Platelet Count"},
    {title: "ESR"},
];

const XRAYSchema = [
    {title: "Cervical Spine Series"},
    {title: "Lumbosacral Spine Series"},
    {title: "Thoracolumbar Spine Series"},
    {title: "Chest X-Ray"},
    {title: "Barium Enema"},
    {title: "UGI Series"},
    {title: "Complete Abdomen"},
    {title: "KUB-IVP"},
];

const BLOODCHEMISTRYSchema = [
    {title: "FBS"},
    {title: "BUN"},
    {title: "Creatinine"},
    {title: "Uric Acid"},
    {title: "Total Chol."},
    {title: "HDL"},
    {title: "Globulin"},
    {title: "SERUM Na"},
    {title: "SERUM K"},
    {title: "SERUM Cl"},
    {title: "SERUM Ca"},
    {title: "SERUM Mg"},
    {title: "BT"},
    {title: "LDL"},
    {title: "SGPT"},
    {title: "SGOT"},
    {title: "LDH"},
    {title: "Alk Phos"},
    {title: "Triglycerides"},
    {title: "Albumin"},
    {title: "PTPA"},
    {title: "HBSaG"},
];

const URINALYSISSchema = [
    {title: "Color"},
    {title: "Transparency"},
    {title: "PH"},
    {title: "Spec. Gran."},
    {title: "Glucose"},
    {title: "Protein"},
    {title: "Ketone"},
    {title: "Bile"},
    {title: "Urobilinogen"},
    {title: "Nitrite"},
    {title: "Cast"},
    {title: "Pus Cells"},
    {title: "Red Blood"},
    {title: "Epithelial Cells"},
    {title: "Yeast Cells"},
    {title: "Bacteria"},
    {title: "Mucous Thread"},
    {title: "Crystals"},
    {title: "Amor. Urates"},
    {title: "Amor. P04"},
    {title: "Cal. Oxalate"},
];

export default function LaboratoryForm(){
    
    return(
        <FormBuilder>
                <div className="col-md-12 col-lg-6">
                    <InputLabel className='text-dark fw-bold'>Result Date</InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                        sx={{
                            width: "100%",
                        }}
                        />
                    </LocalizationProvider>
                </div>
                <div className="col-md-12 col-lg-6">
                    <InputLabel className='text-dark fw-bold'>Patient</InputLabel>
                    <PatientFieldSearcher />
                </div>
                <div className="col-12">
                    <Divider className="my-3"/>
                </div>
                <div className="col-12">
                    <InputLabel className='text-dark fw-bold'>Stool Exam</InputLabel>
                    <TextField variant="outlined" fullWidth={true} multiline rows={2}/>
                </div>
                <div className="col-12">
                    <Divider className="my-3 fw-bolder">LABORATORY DATA</Divider>
                </div>
                <div className="col-12">
                    <Tabs orientation="vertical">
                        <TabList>
                            <Tab>CBC</Tab>
                            <Tab>X-Ray</Tab>
                            <Tab>Urinalysis</Tab>
                            <Tab>Blood Chemistry</Tab>
                        </TabList>
                        <TabPanel>
                            <div className="d-flex flex-row flex-wrap justify-content-center">
                                {CBCSchema.map((cbc,i) => (
                                    <div key={i} className="col-2 my-2 mx-2">
                                        <TextField variant="outlined" fullWidth={true} label={cbc.title} placeholder={cbc.title}/>
                                    </div>
                                ))}
                                <div className="col-4 my-2 mx-2">
                                    <TextField variant="outlined" fullWidth={true} label="Others" placeholder="Others" multiline rows={4}/>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel value={1}>
                            <div className="d-flex flex-row flex-wrap justify-content-center">
                                {XRAYSchema.map((urinalysis,i) => (
                                    <div key={i} className="col-2 my-2 mx-2">
                                        <TextField variant="outlined" fullWidth={true} label={urinalysis.title} placeholder={urinalysis.title}/>
                                    </div>
                                ))}
                                <div className="col-5 my-2 mx-2">
                                    <TextField variant="outlined" fullWidth={true} label="View" placeholder="View"/>
                                </div>
                                <div className="col-12 my-2 mx-2">
                                    <TextField variant="outlined" fullWidth={true} label="Others" placeholder="Others" multiline rows={4}/>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel value={2}>
                            <div className="d-flex flex-row flex-wrap justify-content-center">
                                {URINALYSISSchema.map((cbc,i) => (
                                    <div key={i} className="col-2 my-2 mx-2">
                                        <TextField variant="outlined" fullWidth={true} label={cbc.title} placeholder={cbc.title}/>
                                    </div>
                                ))}
                                <div className="col-12 my-2 mx-2">
                                    <TextField variant="outlined" fullWidth={true} label="Others" placeholder="Others" multiline rows={4}/>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel value={3}>
                            <div className="d-flex flex-row flex-wrap justify-content-center">
                                {BLOODCHEMISTRYSchema.map((cbc,i) => (
                                    <div key={i} className="col-2 my-2 mx-2">
                                        <TextField variant="outlined" fullWidth={true} label={cbc.title} placeholder={cbc.title}/>
                                    </div>
                                ))}
                                <div className="col-12 my-2 mx-2">
                                    <TextField variant="outlined" fullWidth={true} label="Others" placeholder="Others" multiline rows={4}/>
                                </div>
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
        </FormBuilder>
    );
};