import { Divider } from "@mui/material";
import Header from "./Header";
import { SideNav } from "./Nav";

export default function MainLayout({children}){

    return (
        <div className="container-fluid vh-100">
          <div className="row" style={{minHeight: '100%'}}>
            <div className="col-md-2" style={{ background: '#218fc8', color: '#FFF'}}>
              <div className="d-flex flex-column justify-content-center">
                <div className="my-2 d-flex flex-row flex-wrap justify-content-center">
                    <h2 className="m-0">Health Flow</h2>
                </div>
                <Divider className="mb-2"/>
                <SideNav />
              </div>
            </div>
            <div
              className="col-md-10 px-0"
              style={{ backgroundColor: "rgb(156 217 206"}}
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