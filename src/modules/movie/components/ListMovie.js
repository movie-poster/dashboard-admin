import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import IconButton from "../../../app/components/IconButton";

import GeneralService from "../../../services/GeneralService";
import { MessageError, MessageSuccess } from "../../../utils/message";
import confirmDelete from "../../../utils/confirmDelete";
import { cleanData, deleteMovieList, setListMovie, setSelectedMovie } from "../../../reducers/movie/reducerMovie";

const ListMovie = () => {
    const { filtered } = useSelector(state => state.movieSlice);
    const dispatch = useDispatch();
    const history = useHistory();

    const loadMovie = async () => {
        const service = new GeneralService("movie");
        const res = await service.getList({ page: 0, pageSize: 10 });
        const { movies = [] } = res;
        dispatch(setListMovie({ value: movies }));
    }

    const deleteMovie = async (id) => {
        const service = new GeneralService("movie");
        const res = await service.delete(id);
        if (res.is_ok) {
            MessageSuccess(res.message);
            dispatch(deleteMovieList({ value: id }));
            return;
        }
        MessageError(res.message);
    }

    useEffect(() => {
        loadMovie();
    }, []);

    return (
        <>
            <div className="order">
                {
                    filtered.length === 0 ?
                        <div className="alert alert-warning text-center mt-2" role="alert">
                            No hay películas que mostrar
                        </div>
                        :
                        <div className="d-block rounded-3 clip-hide">
                            <table className={`table table-responsive table-header-custom animate__animated animate__fadeIn ${filtered.length > 0 && "table-striped"}`}>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>#</th>
                                        <th>Título</th>
                                        <th>Año</th>
                                        <th>Duración</th>
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
                                                <td style={{ maxWidth: "300px" }}>{item.title}</td>
                                                <td>{item.year}</td>
                                                <td>{item.duration}</td>

                                                <td>
                                                    {/* <IconButton
                                                        icon="fa-solid fa-pen-to-square text-green"
                                                        title="Editar película"
                                                        onClick={() => {
                                                            dispatch(cleanData());
                                                            dispatch(setSelectedMovie({ value: item }));
                                                            history.push("/movies/edit/"+item.id);
                                                        }}
                                                    /> */}
                                                    <IconButton
                                                        icon="fa-solid fa-trash-can text-red"
                                                        title="Eliminar película"
                                                        onClick={async () => await confirmDelete(() => deleteMovie(item.id))}
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

export default ListMovie;