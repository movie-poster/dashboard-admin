
const ActionButton = ({ icon = "", onClick, title = "" }) => {
    return (
        <div className="circle__action" onClick={onClick} title={title}>
            <i className={`fa-solid mt-2 ${icon}`}></i>
        </div>
    )
}

export default ActionButton;