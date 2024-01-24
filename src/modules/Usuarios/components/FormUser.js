import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { MessageError, MessageLevels, MessageSuccess } from "../../../utils/message";

import { cleanData, reducerForm, setDataGetById } from '../../../reducers/user/reducerUsers';
import serviceUsers from '../services/serviceUsers';
import { encodeFileBase64, isURL } from "../utils/functions";
import { ID_NOT_DEFINED } from "../../../constant/constant";
import BreadcrumbCustom from "../../../app/components/BreadcrumCustom";
import Profile from '../../../assets/profile-pic.svg';
import '../styles/style-users.css'
import { hideLoading, showLoading } from "../../../reducers/main/loadingReducer";

const CreateUsers = () => {
    const { listTypeDocument, listLevel, dataUser } = useSelector(state => state.userSlice);
    const dispatch = useDispatch();
    const history = useHistory();
    let { id = 0 } = useParams();

    const setData = async (e) => {
        dispatch(reducerForm({
            key: e.target.name,
            value: e.target.value,
        }));
    }

    useEffect(() => {
        if (listLevel?.length === 0 && listTypeDocument?.length === 0) {
            history.push('/users/list');
            return;
        } else if (listLevel?.length === 0 && listTypeDocument.length !== 0) {
            MessageLevels(id, goAccessOrUsers);
        }
    }, [listLevel, listTypeDocument]);


    useEffect(() => {
        dataUpdate(id);
    }, [id]);


    const goAccessOrUsers = (p = true) => {
        if (p) {
            window.location.pathname = "/acces/list";
        } else {
            history.push("/users/list");
        }
    }

    const dataUpdate = async (id) => {
        if (id !== ID_NOT_DEFINED) {
            const res = await serviceUsers.getById(id);
            if (Object.keys(res).length > 0) {
                dispatch(setDataGetById({ value: res }));
                return;
            }
            MessageError("No es un ID de usuario válido");
            history.push("/users/list");
        }
    }

    const encodeDocument = async (e) => {
        const base64 = await encodeFileBase64(e.target.files[0]);
        if (base64) {
            dispatch(reducerForm({
                key: "url_document",
                value: base64
            }));
            return;
        }
        MessageError("No es un documento válido");
    }

    const encodeImage = async (e) => {
        const base64 = await encodeFileBase64(e.target.files[0]);
        if (base64) {
            dispatch(reducerForm({
                key: "url_avatar",
                value: base64
            }));
            return;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            ...dataUser,
            type_document_id: parseInt(dataUser.type_document_id),
            level_id: parseInt(dataUser.level_id),
            can_audit: parseInt(dataUser.can_audit ? dataUser.can_audit : 0),
        }

        let res;

        dispatch(showLoading());
        if (id === ID_NOT_DEFINED) res = await serviceUsers.save(data);
        else res = await serviceUsers.update(data);
        dispatch(hideLoading());
        if (res.is_ok) {
            MessageSuccess(res.message);
            dispatch(cleanData());
            history.push("/users/list");
            return;
        }
        MessageError(res.message);
    }

    const showImage = () => {
        if (id === ID_NOT_DEFINED || !isURL(dataUser.url_avatar)) {
            return dataUser.url_avatar === '' ?
                <img className="animate__animated animate__fadeIn animate__slow" src={Profile} style={{ width: '100px', height: '100px' }} alt="" />
                :
                <img className="animate__animated animate__fadeIn animate__slow" src={`data:image/png;base64,${dataUser.url_avatar}`} style={{ width: '100px', height: '100px' }} alt="" />
        }
        return (<img className="animate__animated animate__fadeIn animate__slow" src={dataUser.url_avatar} style={{ width: '100px', height: '100px' }} alt={dataUser.name} />);
    }

    return (
        <div className="container-fluid max-height-overflow-y">
            <div className="row">
                <div className="col">
                    <BreadcrumbCustom
                        title={id === ID_NOT_DEFINED ? "Crear Usuario" : "Editar Usuario"}
                        routes={[
                            { name: "Usuarios", link: "/users/list" },
                        ]}
                        activeRoute={id === ID_NOT_DEFINED ? "Crear Usuario" : "Editar Usuario"}
                    />
                </div>
            </div>

            <form className="mb-3" onSubmit={handleSubmit}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 table-data form-group" >
                            <div className="card card-primary p-4">

                                <div className="upload">
                                    {showImage()}
                                    <div className="round">
                                        <input
                                            type="file"
                                            accept="image/png,image/jpeg"
                                            onChange={encodeImage}
                                        />
                                        <i className="fa fa-camera" style={{ color: "#fff" }}></i>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <div className="row">

                                        <div className="col-md-3">
                                            <label>Nombre<b><i className="text-red">*</i></b></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                placeholder="Digita nombre(s)"
                                                value={dataUser.name}
                                                minLength="3"
                                                maxLength="25"
                                                pattern="^([a-zA-ZÀ-ÿ\u00f1\u00d1\s]{3,25})$"
                                                onChange={setData}
                                                required
                                            />
                                        </div>

                                        <div className="col-md-3">
                                            <label>Apellido<b><i className="text-red">*</i></b></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="surname"
                                                placeholder="Digita apellido(s)"
                                                value={dataUser.surname}
                                                minLength="3"
                                                maxLength="25"
                                                pattern="^([a-zA-ZÀ-ÿ\u00f1\u00d1\s]{3,25})$"
                                                onChange={setData}
                                                required
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <label>Tipo de documento<b><i className="text-red">*</i></b></label>
                                            <select
                                                className="form-select"
                                                name="type_document_id"
                                                value={dataUser.type_document_id}
                                                onChange={setData}
                                                required
                                            >
                                                <option value="">
                                                    Selecciona el tipo de documento
                                                </option>
                                                {
                                                    listTypeDocument.map((item) => (
                                                        <option value={item.id} key={item.id}>
                                                            {item.name}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mt-3">
                                            <label>Numero de documento<b><i className="text-red">*</i></b></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="num_document"
                                                placeholder="Digita número de documento"
                                                value={dataUser.num_document}
                                                maxLength="12"
                                                onChange={setData}
                                                required
                                            />
                                        </div>

                                        {
                                            id === ID_NOT_DEFINED && !isURL(dataUser.url_document)
                                                ?
                                                <div className="col-md-6 mt-3" style={{ width: "50%", height: "10px" }}>
                                                    <label>Cargue documento<b><i className="text-red">*</i></b></label>
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        accept='application/pdf'
                                                        onChange={encodeDocument}
                                                        required={id === 0}
                                                    />
                                                </div>
                                                :
                                                <>
                                                    <div className="col-md-4 mt-3" style={{ height: "10px" }}>
                                                        <label>Cargue documento<b><i className="text-red">*</i></b></label>
                                                        <input
                                                            type="file"
                                                            className="form-control"
                                                            accept='application/pdf'
                                                            onChange={encodeDocument}
                                                            required={id === 0}
                                                        />
                                                    </div>
                                                    <div className="col-md-2">
                                                        <b><a href={dataUser.url_document} rel="noreferrer" className="d-block mt-5" target="_blank">Ver actual</a></b>
                                                    </div>
                                                </>
                                        }


                                        <div className="col-md-6 mt-3">
                                            <label>Nombre de usuario<b><i className="text-red">*</i></b></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="nick_name"
                                                placeholder="Digita nombre de usuario"
                                                value={dataUser.nick_name}
                                                minLength="2"
                                                maxLength="25"
                                                onChange={setData}
                                                required
                                            />
                                        </div>

                                        <div className="col-md-6 mt-3">
                                            <label>Nivel de usuario<b><i className="text-red">*</i></b></label>
                                            <select
                                                className="form-select"
                                                name="level_id"
                                                value={dataUser.level_id}
                                                onChange={setData}
                                                required
                                            >
                                                <option value="">
                                                    Seleccione un nivel
                                                </option>
                                                {
                                                    listLevel.map((item) => (
                                                        <option value={item.id} key={item.id}>{item.name} - {item.level}</option>
                                                        // <option value={item.id} key={item.id}>{item.name}  -  <b>Nvl: {item.level}</b></option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                        <div className="col-md-6 mt-3">
                                            <label>Correo<b><i className="text-red">*</i></b></label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                name="email"
                                                placeholder="Digita coreo electrónico"
                                                value={dataUser.email}
                                                minLength="4"
                                                maxLength="100"
                                                onChange={setData}
                                                required
                                            />
                                        </div>

                                        <div className="col-md-6 mt-3">
                                            <label>Fecha de nacimiento<b><i className="text-red">*</i></b></label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                name="date_birth"
                                                placeholder="Digita fecha de nacimientoo"
                                                value={dataUser.date_birth}
                                                onChange={setData}
                                                required
                                            />
                                        </div>

                                        <div className="col-md-3 mt-3">
                                            <label>Telefono de contacto<b><i className="text-red">*</i></b></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="phone_contact"
                                                placeholder="Digita telefono de contacto"
                                                value={dataUser.phone_contact}
                                                onChange={setData}
                                                pattern="^[0-9]{0,10}$"
                                                required
                                            />
                                        </div>

                                        <div className="col-md-3 mt-3">
                                            <label>Telefono de contacto 2</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="phone_contact_two"
                                                placeholder="Digita teléfono de contacto alternativo"
                                                value={dataUser.phone_contact_two}
                                                onChange={setData}
                                                pattern="^[0-9]{0,10}$"
                                            />
                                        </div>

                                        <div className="col-md-6 mt-3">
                                            <label>Dirección<b><i className="text-red">*</i></b></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="address"
                                                maxLength={60}
                                                placeholder="Digita una dirección"
                                                value={dataUser.address}
                                                onChange={setData}
                                                required
                                            />
                                        </div>

                                        <div className="mt-3">
                                            <label className="form-check-label">¿Puede auditar?<b><i className="text-red">*</i></b></label>
                                        </div>
                                        <div className="mt-3">
                                            <div className="form-check form-check-inline mt-3">
                                                <label htmlFor="audit_SI" className="form-check-label">Si</label>
                                                <input
                                                    type="radio"
                                                    className="form-check-input"
                                                    name="can_audit"
                                                    id="audit_SI"
                                                    value="1"
                                                    checked={dataUser.can_audit === "1" || dataUser.can_audit === 1}
                                                    onChange={setData}
                                                />
                                            </div>
                                            <div className="form-check form-check-inline mt-3">
                                                <label htmlFor="audit_NO" className="form-check-label">No</label>
                                                <input
                                                    type="radio"
                                                    className="form-check-input"
                                                    name="can_audit"
                                                    id="audit_NO"
                                                    value="0"
                                                    checked={dataUser.can_audit === "0" || dataUser.can_audit === 0}
                                                    onChange={setData}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <hr />
                                <div className="row">
                                    <div className="col">
                                        <button className='btn btn-success d-block ms-auto' type='submit'>
                                            <i className="fa-solid fa-paper-plane me-2" style={{ fontSize: '16px' }}></i>
                                            {id === ID_NOT_DEFINED ? "Crear usuario" : "Editar usuario"}
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </form>
        </div>
    );

}

export default CreateUsers