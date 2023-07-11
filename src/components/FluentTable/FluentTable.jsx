export default function FluentTable({children}){

    return(
        <table className="table table-hover table-bordered">
            {children}
        </table>
    );
};