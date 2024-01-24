import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import recover from '../../../assets/recover.svg';
import { reducerForm, cleanData } from "../../../reducers/auth/reducerRecoverCredentials";
import IconButton from "../../../app/components/IconButton";
import GeneralService from "../../../services/GeneralService";
import { MessageError, MessageSuccess } from "../../../utils/message";

const RecoverPasswordModal = ({ show, setShow }) => {
    const { recoverOptions } = useSelector(state => state.recoverCredentialsSlice);
    const dispatch = useDispatch();

    const setData = (e) => {
        dispatch(reducerForm({
            key: e.target.name,
            value: e.target.value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const service = new GeneralService("user/reset-password");
        const res = await service.post({
            is_email: recoverOptions.is_email === "1",
            value: recoverOptions.value,
        });
        if (res.is_ok) {
            setShow(false);
            MessageSuccess(res.message, 3000);
            dispatch(cleanData());
            return;
        }
        MessageError(res.message);
    }

    return (
        <Modal show={show} onHide={() => setShow(false)} centered >
            <form onSubmit={handleSubmit} autoCorrect="on">
                <Modal.Body>
                    <div className="row">
                        <div className="col">
                            <IconButton
                                title="Cerrar"
                                icon="fa-solid fa-circle-xmark text-purple"
                                fontSize="20px"
                                className="d-block ms-auto"
                                onClick={() => setShow(false)}
                            />
                        </div>
                    </div>
                    <div className="card-body p-3">
                        <div className="row">
                            <img src={recover} alt="cookies-img" height={230} />
                            <h3 className="text-center mt-1">Recuperar credenciales</h3>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <div className="mb-1 fs-6 fw-bold">¿Qué has olvidado?</div>
                                <div className="row">
                                    <div className="col-12">
                                        <input
                                            type="radio"
                                            name="is_email"
                                            id="radioPassword"
                                            className="form-check-input me-2"
                                            value="0"
                                            checked={recoverOptions.is_email === "0"}
                                            onChange={setData}
                                        />
                                        <label htmlFor="radioPassword">Olvidé mi contraseña</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <input
                                            type="radio"
                                            name="is_email"
                                            id="radioUsername"
                                            className="form-check-input me-2"
                                            value="1"
                                            checked={recoverOptions.is_email === "1"}
                                            onChange={setData}
                                        />
                                        <label htmlFor="radioUsername">Olvidé mi usuario</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2"></div>
                        {
                            recoverOptions.is_email === "0"
                                ?
                                <p>Ingresa tu nombre de usuario y enviaremos un mail a tu dirección de correo asociada con instrucciones para recuperar tu contraseña</p>
                                :
                                <p>Ingresa tu dirección de correo electrónico y te enviaremos un mail con instrucciones para recuperar tu contraseña</p>
                        }

                        <div className="row">
                            <div className='col'>
                                <input
                                    type={recoverOptions.is_email === "1" ? "email" : "text"}
                                    className="form-control py-2 px-3 mt-1 rounded-5"
                                    name="value"
                                    value={recoverOptions.value}
                                    maxLength={50}
                                    minLength={3}
                                    placeholder={`Ingresa tu ${recoverOptions.is_email === "1" ? "email" : "usuario"}`}
                                    autoComplete="off"
                                    onChange={setData}
                                    required
                                />
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col">
                                <button type="submit" className="btn bg-purple text-white d-block mx-auto rounded-5 py-2 px-3 my-2">
                                    <i className="fa-solid fa-key me-2" style={{ fontSize: '16px' }}></i>
                                    Recuperar contraseña
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </form>
        </Modal>
    )
}

export default RecoverPasswordModal;