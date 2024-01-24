import { Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import GeneralService from '../../../services/GeneralService';
import { MessageError, MessageSuccess } from '../../../utils/message';
import { cleanData, insertActor, reducerForm, updateActor } from '../../../reducers/actor/reducerActor';
import { ID_NOT_DEFINED } from '../../../constant/constant';
import { encodeFileBase64, isURL } from '../../../utils/encodeFile';

import Profile from '../../../assets/profile-pic.svg';
import { hideLoading, showLoading } from '../../../reducers/main/loadingReducer';

const ModalActor = ({ show, setShow }) => {
    const { selectedActor } = useSelector(state => state.actorSlice);

    const dispatch = useDispatch();

    const setData = (e) => {
        dispatch(reducerForm({
            key: e.target.name,
            value: e.target.value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const service = new GeneralService("actor");

        dispatch(showLoading());
        if (selectedActor.id === ID_NOT_DEFINED) {
            const res = await service.post(selectedActor);
            dispatch(hideLoading());
            if (res.is_ok) {
                MessageSuccess(res.message);
                dispatch(insertActor({ value: res.actor }));
                setShow(false);
                dispatch(cleanData());
                return;
            }
            MessageError(res.message);
            return;
        }
        const res = await service.update(selectedActor);
        dispatch(hideLoading());
        if (res.is_ok) {
            MessageSuccess(res.message);
            dispatch(updateActor({ value: res.actor }));
            setShow(false);
            dispatch(cleanData());
            return;
        }
        MessageError(res.message);
        return;
    }

    const encodeImage = async (e) => {
        const base64 = await encodeFileBase64(e.target.files[0]);
        if (base64) {
            dispatch(reducerForm({
                key: "avatar",
                value: base64
            }));
            return;
        }
    }

    const showImage = () => {
        if (selectedActor.id === ID_NOT_DEFINED || !isURL(selectedActor.avatar)) {
            return selectedActor.avatar === '' ?
                <img className="animate__animated animate__fadeIn animate__slow" src={Profile} style={{ width: '100px', height: '100px' }} alt="" />
                :
                <img className="animate__animated animate__fadeIn animate__slow" src={`data:image/png;base64,${selectedActor.avatar}`} style={{ width: '100px', height: '100px' }} alt="" />
        }
        return (<img className="animate__animated animate__fadeIn animate__slow" src={selectedActor.avatar} style={{ width: '100px', height: '100px' }} alt={selectedActor.name} />);
    }

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <form onSubmit={handleSubmit} autoCorrect="on">
                <Modal.Header className='bg-green pe-4' closeButton>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-1'>
                                {
                                    selectedActor.id === ID_NOT_DEFINED ?
                                        <i className="fa-solid fa-circle-plus mt-2 animate__animated animate__backInRight fs-4"></i>
                                        :
                                        <i className="fa-solid fa-pen-to-square mt-2 animate__animated animate__backInRight fs-4"></i>
                                }
                            </div>
                            <div className='col'>
                                <h5 className="mt-2">
                                    {
                                        selectedActor.id === ID_NOT_DEFINED ?
                                            "Crear Actor"
                                            :
                                            "Editar Actor"
                                    }
                                </h5>
                            </div>
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="card-body">

                        <div className="row">
                            <div className="col">
                                <div className="upload mx-auto mb-3">
                                    {showImage()}
                                    <div className="round">
                                        <input
                                            type="file"
                                            accept="image/png,image/jpeg"
                                            onChange={encodeImage}
                                        />
                                        <i className="fa fa-camera text-white"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label>Nombre:</label>
                                <input
                                    type="text"
                                    className="form-control mt-1"
                                    name="name"
                                    value={selectedActor.name}
                                    maxLength={50}
                                    minLength={3}
                                    placeholder="Ingrese un nombre"
                                    autoComplete="off"
                                    autoCapitalize="words"
                                    onChange={setData}
                                    required
                                />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col">
                                <label>Fecha de nacimiento:</label>
                                <input
                                    type="date"
                                    className="form-control mt-1"
                                    name="birthdate"
                                    value={selectedActor.birthdate}
                                    onChange={setData}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="submit" className={`btn btn-success mx-auto rounded-3 button-save-document'`}>
                        <i className="fa-solid fa-paper-plane me-2" style={{ fontSize: '16px' }}></i>
                        {
                            selectedActor.id === ID_NOT_DEFINED ?
                                "Agregar"
                                :
                                "Actualizar"
                        }
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default ModalActor;