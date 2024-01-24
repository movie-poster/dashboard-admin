import { NavLink } from 'react-router-dom';

const ItemNavigation = ({ path = "", icon = "", title = "", isExpanded, identation = "ms-3" }) => {
    return (
        <div title={!isExpanded ? title : undefined}>
            <NavLink exact to={path}
                className="d-block text-white p-2"
                activeClassName='active-pathv2'
            >
                {
                    isExpanded
                        ?
                        <>
                            <i className={`${icon} fs-5 ${identation} me-2`}></i> {title}
                        </>
                        :
                        <i className={`${icon} fs-5 mx-1`}></i>
                }
            </NavLink>
        </div>
    )
}

export default ItemNavigation;