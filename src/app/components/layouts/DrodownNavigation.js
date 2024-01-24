import { useState } from "react";

const DrodownNavigation = ({ icon = "", title = "", isExpanded, children }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div role="button" className="d-block p-2 text-white" onClick={()=>setOpen(!open)}>
                {
                    isExpanded
                        ?
                        <>
                            <i className={`${icon} fs-5 ms-3 me-2`}></i> {title}
                        </>
                        :
                        <i className={`${icon} fs-5 mx-1`}></i>
                }
            </div>
            {
                open && children
            }
        </>
    )
}

export default DrodownNavigation;