import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import IconButton from "../../../app/components/IconButton";

import { MessageError, MessageSuccess } from "../../../utils/message";
import serviceUsers from '../services/serviceUsers';
import { setUsers, deleteUsers, cleanData } from '../../../reducers/user/reducerUsers';
import confirmDelete from "../../../utils/confirmDelete";

const ListUsers = () => {
    const users = useSelector(state => state.userSlice);
    const { nick_name } = useSelector(state => state.loginSlice.auth);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const response = await serviceUsers.getList();
        const { user = [] } = response;
        dispatch(setUsers({ value: user }));
    }

    const deleObject = async (id) => {
        const res = await serviceUsers.delete(id);
        if (res.is_ok) {
            MessageSuccess('¡El usuario ha sido elimiado exitosamente!');
            dispatch(deleteUsers({ value: id }));
            return;
        }
        MessageError("No fue posible eliminar el usuario");
    }

    const handleEdit = (id) => {
        dispatch(cleanData());
        history.push(`/users/edit/${id}`)
    }

    return (
        <>
            <div className="order">
                {users.listFilter?.length === 0 ?
                    <div className="alert alert-warning text-center mt-2" role="alert">
                        No hay usuarios que mostrar {":)"}
                    </div>
                    :
                    <div className="d-block rounded-3 clip-hide">
                        <table className={`table table-responsive table-header-custom animate__animated animate__fadeIn ${users.listFilter?.length > 0 && "table-striped"}`}>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>#</th>
                                    <th>Documento</th>
                                    <th>Nombre</th>
                                    <th>Usuario</th>
                                    <th>Acceso</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.listFilter?.map((user, i) => (
                                        <tr key={user.id}>
                                            <td></td>
                                            <td>{i + 1}.</td>
                                            <td>{user.num_document}</td>
                                            <td>{user.name}</td>
                                            <td>{user.nick_name}</td>
                                            <td>{user.level.name}</td>
                                            <td>
                                                <IconButton
                                                    icon="fa-solid fa-pen-to-square text-green"
                                                    title="Editar usuario"
                                                    onClick={() => handleEdit(user.id)}
                                                />
                                                {
                                                    nick_name !== user.nick_name && <IconButton
                                                        icon="fa-solid fa-trash-can text-red"
                                                        title="Eliminar tipo de persona"
                                                        onClick={async () => await confirmDelete(() => deleObject(user.id))}
                                                    />
                                                }
                                            </td>
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

export default ListUsers