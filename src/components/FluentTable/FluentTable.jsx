export default function FluentTable({children}){

    return(
        <table className="table table-hover table-bordered shadow-lg">
            {children}
        </table>
    );
};