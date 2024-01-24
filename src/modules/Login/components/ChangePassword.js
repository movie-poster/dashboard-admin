import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, useLocation } from "react-router-dom";
import queryString from 'query-string';

import { MessageError, MessageSuccess } from "../../../utils/message";
import GeneralService from "../../../services/GeneralService";

import Change from "../../../assets/change-password-help.svg";
import { reducerFormChangePassword } from "../../../reducers/auth/reducerRecoverCredentials";
import { toast } from "../../../utils/toast";
import { ALERT_DANGER } from "../../../constant/constant";
import { BackgroundResetPassword } from "../../../app/components/design/MinimalistBackground";

const ChangePassword = () => {
    const { changePassword } = useSelector(state => state.recoverCredentialsSlice);
    const { token } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const { search } = useLocation();
    const { username = "" } = queryString.parse(search);


    const setData = (e) => {
        dispatch(reducerFormChangePassword({
            key: e.target.name,
            value: e.target.value,
        }))
    }

    const verifyToken = async () => {
        const service = new GeneralService("user/check-token");
        const res = await service.post({ token });
        if (!res.is_ok) {
            await MessageError(res.message);
            history.push("/auth/login");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (changePassword.password !== changePassword.confirm_password) {
            toast(dispatch, "Las contraseñas no coinciden", ALERT_DANGER);
            return;
        }

        const service = new GeneralService("user/change-password");
        const res = await service.post({
            token,
            password: changePassword.password,
            nick_name: username,
        });
        if (res.is_ok) {
            MessageSuccess(res.message, 3000);
            history.push("/auth/login");
            return;
        }
        MessageError(res.message);
    }

    useEffect(() => {
        verifyToken();
    }, [token]);

    return (
        <div className="container-fluid p-0">
            <div className="stack">
                <BackgroundResetPassword />

                <div className="floating-container">
                    <div className="form-style">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <img src={Change} alt="" height={250} />
                            </div>
                            <div className="row">                                
                                <p className="important-message">Para cambiar tu contraseña, digita tu nueva contraseña, confírmala y ya está, el proceso estaría completado. Asegúrate de que sea una contraseña segura y cumpla con los requerimientos.</p>
                            </div>
                            <div className="row">
                                <div className='col'>
                                    <label>Nueva contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control py-2 px-3 mt-1 rounded-5"
                                        name="password"
                                        value={changePassword.password}
                                        maxLength={100}
                                        minLength={3}
                                        placeholder="Ingresa la nueva contraseña"
                                        autoComplete="off"
                                        onChange={setData}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className='col'>
                                    <label>Repetir contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control py-2 px-3 mt-1 rounded-5"
                                        name="confirm_password"
                                        value={changePassword.confirm_password}
                                        maxLength={100}
                                        minLength={3}
                                        placeholder="Ingresa la nueva contraseña"
                                        autoComplete="off"
                                        onChange={setData}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="row mt-2">
                                <div className="col">
                                    <button type="submit" className="btn bg-purple text-white d-block mx-auto rounded-5 py-2 px-3 my-2">
                                        <i className="fa-solid fa-paper-plane me-2" style={{ fontSize: '16px' }}></i>
                                        Enviar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword;