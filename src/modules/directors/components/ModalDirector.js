import { Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import GeneralService from '../../../services/GeneralService';
import { MessageError, MessageSuccess } from '../../../utils/message';
import { cleanData, insertDirector, reducerForm, updateDirector } from '../../../reducers/director/reducerDirector';
import { ID_NOT_DEFINED } from '../../../constant/constant';
import { encodeFileBase64, isURL } from '../../Usuarios/utils/functions';

import Profile from '../../../assets/profile-pic.svg';

const ModalDirector = ({ show, setShow }) => {
    const { selectedDirector } = useSelector(state => state.directorSlice);

    const dispatch = useDispatch();

    const setData = (e) => {
        dispatch(reducerForm({
            key: e.target.name,
            value: e.target.value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const service = new GeneralService("director");

        if (selectedDirector.id === ID_NOT_DEFINED) {
            const res = await service.post(selectedDirector);
            if (res.is_ok) {
                MessageSuccess(res.message);
                dispatch(insertDirector({ value: res.director }));
                setShow(false);
                dispatch(cleanData());
                return;
            }
            MessageError(res.message);
            return;
        }

        const res = await service.update(selectedDirector);
        if (res.is_ok) {
            MessageSuccess(res.message);
            dispatch(updateDirector({ value: res.director }));
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
        if (selectedDirector.id === ID_NOT_DEFINED || !isURL(selectedDirector.avatar)) {
            return selectedDirector.avatar === '' ?
                <img className="animate__animated animate__fadeIn animate__slow" src={Profile} style={{ width: '100px', height: '100px' }} alt="" />
                :
                <img className="animate__animated animate__fadeIn animate__slow" src={`data:image/png;base64,${selectedDirector.avatar}`} style={{ width: '100px', height: '100px' }} alt="" />
        }
        return (<img className="animate__animated animate__fadeIn animate__slow" src={selectedDirector.avatar} style={{ width: '100px', height: '100px' }} alt={selectedDirector.name} />);
    }

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <form onSubmit={handleSubmit} autoCorrect="on">
                <Modal.Header className='bg-green pe-4' closeButton>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-1'>
                                {
                                    selectedDirector.id === ID_NOT_DEFINED ?
                                        <i className="fa-solid fa-circle-plus mt-2 animate__animated animate__backInRight fs-4"></i>
                                        :
                                        <i className="fa-solid fa-pen-to-square mt-2 animate__animated animate__backInRight fs-4"></i>
                                }
                            </div>
                            <div className='col'>
                                <h5 className="mt-2">
                                    {
                                        selectedDirector.id === ID_NOT_DEFINED ?
                                            "Crear Director"
                                            :
                                            "Editar Director"
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
                                    value={selectedDirector.name}
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
                                    value={selectedDirector.birthdate}
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
                            selectedDirector.id === ID_NOT_DEFINED ?
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

export default ModalDirector;