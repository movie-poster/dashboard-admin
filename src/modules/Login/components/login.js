import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { setUser, loginUser } from "../../../reducers/auth/reducerLogin"
import logo from '../assets/team-login.svg';
import './../styles/style.css';
import RecoverPasswordModal from "./RecoverPasswordModal";
import GeneralService from "../../../services/GeneralService";
import { HTTP_OK } from "../../../constant/constant";
import { MessageError } from "../../../utils/message";
import { toast } from "../../../utils/toast";

const Login = () => {
    const { nick_name, password } = useSelector(state => state.loginSlice.user);
    const [showRecoverModal, setShowRecoverModal] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const setData = (e) => {
        dispatch(setUser({
            key: e.target.name,
            value: e.target.value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const service = new GeneralService("/user/auth");
        const res = await service.post({ nick_name, password });
        if (service.status === HTTP_OK) {
            dispatch(loginUser({ value: res }));
            history.push('/home');
            toast(dispatch, "Bienvenido :)")
            return;
        }
        MessageError("Usuario o contraseña inválidos");
    }

    return (
        <>
            <form className="container-login" onSubmit={handleSubmit}>
                <div className="forms-container">
                    <div className="signin-signup">
                        <div action="#" className="sign-in-form">
                            <h2 className="title">INGRESAR</h2>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input
                                    type="text"
                                    name="nick_name"
                                    value={nick_name}
                                    pattern="^[0-9A-Za-z]{1,25}$"
                                    maxLength="25"
                                    placeholder="Usuario"
                                    onChange={setData}
                                    required
                                />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    placeholder="Contraseña"
                                    onChange={setData}
                                    required
                                />
                            </div>

                            <input type="submit" value="Login" className="btn-login solid" />
                            <div className="pass" onClick={() => setShowRecoverModal(true)}>¿Olvidaste tu usuario o contraseña?</div>
                        </div>
                    </div>
                </div>
            </form>
            <div className="panels-container">
                <div className="panel left-panel">
                    <img src={logo} className="image" alt="" />
                </div>
            </div>

            <RecoverPasswordModal show={showRecoverModal} setShow={setShowRecoverModal} />
        </>
    )
};
export default Login;