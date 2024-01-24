

const CardSwitch = ({ icon, title, name, checked, onChange, className="", disabled, tooltip }) => {
    return (
        <div className={`form-check form-switch ${className}`}>
            <input
                className="form-check-input"
                name={name}
                title={tooltip}
                type="checkbox"
                role="switch"
                id={`switch-${name}`}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
            />
            <label className="form-check-label" htmlFor={`switch-${name}`}>
                <i className={icon}></i> {title}
            </label>
        </div>
    )
}

export default CardSwitch;