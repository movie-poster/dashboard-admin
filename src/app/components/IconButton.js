const IconButton = ({ icon = "", title, onClick, fontSize = "18px", className = "", ref }) => {
    return (
        <div ref={ref} title={title} className={`icon-button bg-icon_button ${className}`} onClick={onClick} role='button'>
            <i
                className={icon}
                style={{ fontSize }}
            ></i>
        </div>
    )
}

export default IconButton;