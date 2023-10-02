export default function FluentTableRow({className, children}){
    return(
        <tr className={className}>
            {children}
        </tr>
    );
};