import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";

import { hideAlert } from "../../reducers/main/alertConsumption";
import IconButton from "./IconButton";
import AlertImage from "../../assets/percentage-consumption.svg";

import "./styles/alertConsumption.css";
import { ALERT_TYPE } from "../../constant/constant";

const AlertConsumptionModal = () => {
    const { company } = useSelector(state => state.businessSlice);
    const { show, data } = useSelector(state => state.alertConsumptionSlice);
    const dispatch = useDispatch();

    const percentageColors = {
        80: "bg-blue",
        90: "bg-yellow-500",
        98: "bg-orange-500 text-white",
        100: "bg-red-400 text-white",
    };

    return (
        <Modal show={show} onHide={() => dispatch(hideAlert())} centered size='lg'>
            <Modal.Header className={`${percentageColors[data.percentage]} pe-3`}>
                <div className='container'>
                    <div className='row'>
                        <div className="col-1">
                            <i className="fa-solid fa-triangle-exclamation fs-3"></i>
                        </div>
                        <div className='col'>
                            <h4 className='text-center'>Alerta de consumo</h4>
                        </div>
                        <div className='col-1'>
                            <IconButton
                                title="Cerrar"
                                icon="fa-solid fa-circle-xmark"
                                onClick={() => dispatch(hideAlert())}
                            />
                        </div>
                    </div>
                </div>
            </Modal.Header>

            <Modal.Body className="bg-light-purple rounded-bottom">
                <div className='container-fluid' style={{ minHeight: "390px" }}>
                    <div className="row">
                        <div className="col-md-12 col-lg-6">
                            <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "390px" }}>
                                <div style={{ position: "absolute", top: 0, left: 0, minHeight: "300px", zIndex: "10" }}>
                                    <img src={AlertImage} alt="" className="w-100 h-100 animate__animated animate__pulse animate__infinite animate__slower" />
                                </div>
                                <h3 className="alert-consumption__percentage font-lilita-one">{data.percentage}</h3>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-6">
                            <div className="row">
                                <h3 className="font-lilita-one text-purple text-center mb-3">{ALERT_TYPE[data.type]?.name}</h3>
                            </div>
                            <div className="row mb-3">
                                <CircleTypeAlert type={data.type} />
                            </div>
                            {
                                !company.is_system_admin
                                ?
                                <div className="row">
                                    <p className="fs-5 text-center" style={{ fontWeight: 600 }}>{data.message}.</p>
                                    <p className="text-center">Recuerda que si se sobrepasan los límites es posible actualizar a un nuevo plan.</p>
                                    <div className="col">
                                        <button className="btn d-block text-white rounded-pill py-2 px-3 mt-2 mb-2 mx-auto" style={{ backgroundColor: "#ff8000" }}>
                                            <i className="fa-solid fa-crown me-2"></i>Actualizar plan
                                        </button>
                                    </div>
                                </div>
                                :
                                <div className="row">
                                    <p className="fs-5 text-center" style={{ fontWeight: 600 }}>{data.message}.</p>
                                    <p className="text-center">Recuerda estar muy pendiente de estos topes, porque al ser superado cualquiera de los servicios al <b>100%</b>, ninguno de tus clientes podrá consumirlos más.</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

const CircleTypeAlert = ({ type }) => {

    return (
        <div className={`alert-consumption__circle ${ALERT_TYPE[type]?.gradient} mx-auto`}>
            <i className={`${ALERT_TYPE[type]?.icon} text-white fs-1 text-center`}></i>
        </div>
    )
}

export default AlertConsumptionModal;