import { Link } from "react-router-dom";

const BreadcrumbCustom = ({ title = "", routes = [], activeRoute = "" }) => {
    return (
        <div className="pb-2 mb-4" style={{borderBottom: "dotted green 2px"}}>
            <div className="head-title">
                <div className="left">
                    <h2>{title}</h2>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            {
                                routes.map(item => (<li className="breadcrumb-item" key={item.name}><Link to={item.link}>{item.name}</Link></li>))
                            }
                            <li className="breadcrumb-item active" aria-current="page">{activeRoute}</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default BreadcrumbCustom;