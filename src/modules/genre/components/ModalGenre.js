import { Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import GeneralService from '../../../services/GeneralService';
import { MessageError, MessageSuccess } from '../../../utils/message';
import { cleanData, insertGenre, reducerForm } from '../../../reducers/genre/reducerGenre';

const ModalGenre = ({ show, setShow }) => {
    const { selectedGenre } = useSelector(state => state.genreSlice);

    const dispatch = useDispatch();

    const setData = (e) => {
        dispatch(reducerForm({
            key: e.target.name,
            value: e.target.value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const service = new GeneralService("genre");

        const res = await service.post(selectedGenre);
        if (res.is_ok) {
            MessageSuccess(res.message);
            dispatch(insertGenre({ value: res.genre }));
            setShow(false);
            dispatch(cleanData());
            return;
        }
        MessageError(res.message);
        return;
    }

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <form onSubmit={handleSubmit} autoCorrect="on">
                <Modal.Header className='bg-green pe-4' closeButton>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-1'>
                                <i className="fa-solid fa-circle-plus mt-2 animate__animated animate__backInRight fs-4"></i>
                            </div>
                            <div className='col'>
                                <h5 className="mt-2">Crear Género</h5>
                            </div>
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="card-body">

                        <div className="row">
                            <div className="col">
                                <label>Nombre:</label>
                                <input
                                    type="text"
                                    className="form-control mt-1"
                                    name="name"
                                    value={selectedGenre.name}
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
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="submit" className={`btn btn-success mx-auto rounded-3 button-save-document'`}>
                        <i className="fa-solid fa-paper-plane me-2" style={{ fontSize: '16px' }}></i>
                        Agregar
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default ModalGenre;