import { Divider } from "@mui/material";
import Header from "./Header";
import { SideNav } from "./Nav";
import SVG from 'react-inlinesvg';

export default function MainLayout({children}){

    return (
        <div className="container-fluid vh-100">
          <div className="row" style={{minHeight: '100%'}}>
            <div className="col-md-2" style={{backgroundColor: "white", color: "#4E7B73", border: "3px solid #E3E8EA"}}>
              <div className="d-flex flex-column justify-content-center">
                <div className="my-2 d-flex flex-row flex-wrap justify-content-center">
                    <h2 className="m-0 d-flex flex-row align-items-center">
                      <SVG src="assets/svg/kidney.svg" height="30px" width="30px" title="Logo"/>
                      <span className="text-dark fw-bold">Care</span><span className="text-dark">Hub</span>
                    </h2>
                    <span className="text-muted">Patient Record System</span>
                </div>
                <Divider className="mb-2"/>
                <SideNav />
              </div>
            </div>
            <div
              className="col-md-10 px-0"
              style={{ backgroundColor: "rgb(156 217 206)"}}
            >
              <div className="d-flex flex-column">
                <Header />
                <div className="p-5">{children}</div>
              </div>
            </div>
          </div>
        </div>
      );
};