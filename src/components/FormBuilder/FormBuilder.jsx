export default function FormBuilder({children}){
    return(
        <div className="form-group">
            <div className="row">
                {children}
            </div>
        </div>
    );
};