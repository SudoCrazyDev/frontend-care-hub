import LoginForm from "./login.form"

export default function Login(){
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
          <div className="d-flex flex-column align-items-center mb-5">
            <h1 className="display-1"><span className="fw-bolder">Care</span>Hub</h1>
            <h5 className="m-0 text-muted fst-italic">Seamless care, all in one place</h5>
          </div>
          <LoginForm />
          <div className="d-flex flex-row">
            <p className="mt-3 text-muted fw-light fst-italic">Made by Philip Louis Calub for Natividiad M. Torre, M. D. Clinic</p>
          </div>
        </div>
      );
}