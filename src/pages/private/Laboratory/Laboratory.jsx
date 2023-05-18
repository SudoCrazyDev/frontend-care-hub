import { Divider } from "@mui/material";
import LaboratoryModal from "./Laboratory.modal";

export default function Laboratory(){
    return(
        <div className="card border-0 shadow-lg h-100">
            <div className="card-body">
                <div className="row">
                    <div className="d-flex flex-row">
                        <h2 className="m-0 text-uppercase fw-bolder">Laboratory Results and Request</h2>
                        <div className="ms-auto">
                            <LaboratoryModal />
                        </div>
                    </div>
                    <Divider className="my-3"/>
                </div>
            </div>
        </div>
    );
};