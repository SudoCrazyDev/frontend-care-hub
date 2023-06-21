const HandleLabel = (label) => {
    if(String(label).includes('Previous')){
        return '<< Previous'
    }
    if(String(label).includes('Next')){
        return 'Next >>'
    }
    return label;
};
export default function FluentTablePagination({links, onLinkClick}){
    return(
        <ul className="pagination pt-3">
            {links.map((link, i) => (
                <li key={i} className="page-item">
                    <a href="#" className={`page-link ${link.active && 'active'} ${!link.url && 'bg-light text-secondary'}`} onClick={() => onLinkClick(link.url)}>{HandleLabel(link.label)}</a>
                </li>
            ))}
        </ul>
    );
}