import { useDispatch, useSelector } from "react-redux";

import IconButton from "../../../app/components/IconButton";

import GeneralService from "../../../services/GeneralService";
import { MessageError, MessageSuccess } from "../../../utils/message";
import confirmDelete from "../../../utils/confirmDelete";
import { cleanData, deleteActorList, setSelectedActor } from "../../../reducers/actor/reducerActor";
import { formatDate } from "../../../utils/formatDate";

const ListActor = ({ setShow }) => {
    const { filtered } = useSelector(state => state.actorSlice);
    const dispatch = useDispatch();

    const deleteActor = async (id) => {
        const service = new GeneralService("actor");
        const res = await service.delete(id);
        if (res.is_ok) {
            MessageSuccess(res.message);
            dispatch(deleteActorList({ value: id }));
            return;
        }
        MessageError(res.message);
    }

    return (
        <>
            <div className="order">
                {
                    filtered.length === 0 ?
                        <div className="alert alert-warning text-center mt-2" role="alert">
                            No hay actores que mostrar
                        </div>
                        :
                        <div className="d-block rounded-3 clip-hide">
                            <table className={`table table-responsive table-header-custom animate__animated animate__fadeIn ${filtered.length > 0 && "table-striped"}`}>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>#</th>
                                        <th>Nombre</th>
                                        <th>Fecha de nacimiento</th>
                                        <th>avatar</th>
                                        <th>Acciones</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        filtered.map((item, i) => (
                                            <tr key={item.id}>
                                                <td></td>
                                                <td>{i + 1}.</td>
                                                <td style={{ maxWidth: "300px" }}>{item.name}</td>
                                                <td>{formatDate(item.birthdate)}</td>
                                                <td>
                                                    <div className="avatar-table">
                                                        <img src={item.avatar} alt={item.name}/>
                                                    </div>
                                                </td>

                                                <td>
                                                    <IconButton
                                                        icon="fa-solid fa-pen-to-square text-green"
                                                        title="Editar actor"
                                                        onClick={() => {
                                                            dispatch(cleanData());
                                                            dispatch(setSelectedActor({ value: item }));
                                                            setShow(true);
                                                        }}
                                                    />
                                                    <IconButton
                                                        icon="fa-solid fa-trash-can text-red"
                                                        title="Eliminar actor"
                                                        onClick={async () => await confirmDelete(() => deleteActor(item.id))}
                                                    />
                                                </td>
                                                <td></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                }
            </div>
        </>
    );


}

export default ListActor;