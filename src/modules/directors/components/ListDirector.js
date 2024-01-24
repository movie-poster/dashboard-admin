import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import IconButton from "../../../app/components/IconButton";

import GeneralService from "../../../services/GeneralService";
import { MessageError, MessageSuccess } from "../../../utils/message";
import confirmDelete from "../../../utils/confirmDelete";
import { cleanData, deleteDirectorList, setListDirector, setSelectedDirector } from "../../../reducers/director/reducerDirector";
import { formatDate } from "../../../utils/formatDate";

const ListDirector = ({ setShow }) => {
    const { filtered } = useSelector(state => state.directorSlice);
    const dispatch = useDispatch();

    const loadDirector = async () => {
        const service = new GeneralService("director");
        const res = await service.getList({ page: 0, pageSize: 10 });
        const { directors = [] } = res;
        dispatch(setListDirector({ value: directors }));
    }

    const deleteDirector = async (id) => {
        const service = new GeneralService("director");
        const res = await service.delete(id);
        if (res.is_ok) {
            MessageSuccess(res.message);
            dispatch(deleteDirectorList({ value: id }));
            return;
        }
        MessageError(res.message);
    }

    useEffect(() => {
        loadDirector();
    }, []);

    return (
        <>
            <div className="order">
                {
                    filtered.length === 0 ?
                        <div className="alert alert-warning text-center mt-2" role="alert">
                            No hay directores que mostrar
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
                                                        title="Editar director"
                                                        onClick={() => {
                                                            dispatch(cleanData());
                                                            dispatch(setSelectedDirector({ value: item }));
                                                            setShow(true);
                                                        }}
                                                    />
                                                    <IconButton
                                                        icon="fa-solid fa-trash-can text-red"
                                                        title="Eliminar director"
                                                        onClick={async () => await confirmDelete(() => deleteDirector(item.id))}
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

export default ListDirector;