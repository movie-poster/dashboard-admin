import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Select from 'react-select';

import { MessageError, MessageSuccess } from "../../../utils/message";

import GeneralService from "../../../services/GeneralService";
import { cleanData, reducerForm, setCollectionsMovie, setSelectedMovie } from '../../../reducers/movie/reducerMovie';
import { encodeFileBase64, isURL } from '../../../utils/encodeFile';
import { HTTP_OK, ID_NOT_DEFINED } from "../../../constant/constant";
import BreadcrumbCustom from "../../../app/components/BreadcrumCustom";
import Placeholder from '../../../assets/placeholder-200x300px.png';
import { hideLoading, showLoading } from "../../../reducers/main/loadingReducer";

const FormMovie = () => {
    const { selectedMovie } = useSelector(state => state.movieSlice);
    const { filtered } = useSelector(state => state.directorSlice);
    const { filtered: filteredActors } = useSelector(state => state.actorSlice);
    const { filtered: filteredGenres } = useSelector(state => state.genreSlice);
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
        dataUpdate(id);
    }, [id]);

    const dataUpdate = async (id) => {
        if (id !== ID_NOT_DEFINED) {
            const service = new GeneralService("movie");
            const res = await service.getRequest(id);
            if (service.status === HTTP_OK) {
                dispatch(setSelectedMovie({ value: res.movie }));
                return;
            }
            MessageError(res.message);
            history.push("/movies/list");
        }
    }

    const encodeImage = async (e) => {
        const base64 = await encodeFileBase64(e.target.files[0]);
        if (base64) {
            dispatch(reducerForm({
                key: "poster",
                value: base64
            }));
            return;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const service = new GeneralService("movie");

        const data = {
            ...selectedMovie,
            year: parseInt(selectedMovie.year),
            duration: parseInt(selectedMovie.duration),
        }

        let res;

        dispatch(showLoading());
        if (id === ID_NOT_DEFINED) res = await service.post(data);
        else res = await service.update(data);
        dispatch(hideLoading());
        if (res.is_ok) {
            MessageSuccess(res.message);
            dispatch(cleanData());
            history.push("/movies/list");
            return;
        }
        MessageError(res.message);
    }

    const showImage = () => {
        debugger;
        if (id === ID_NOT_DEFINED || !isURL(selectedMovie.poster)) {
            return selectedMovie.poster === '' ?
                <img className="animate__animated animate__fadeIn animate__slow" src={Placeholder} alt="" />
                :
                <img className="animate__animated animate__fadeIn animate__slow" src={`data:image/png;base64,${selectedMovie.poster}`} alt="" />
        }
        return (<img className="animate__animated animate__fadeIn animate__slow" src={selectedMovie.poster} alt={selectedMovie.name} />);
    }

    const handleSelectedDirector = (selected) => {
        dispatch(reducerForm({
            key: "director_id",
            value: selected.value,
        }));
    }

    const onChangeMultiSelect = (newValue, collection) => {
        const data = newValue.map(item => {
            if (collection === "change-actor") {
                return filteredActors.find(actor => actor.id === item.value);
            }
            return filteredGenres.find(genre => genre.id === item.value);
        });

        dispatch(setCollectionsMovie({
            collection,
            value: data,
        }));
    };

    return (
        <div className="container-fluid max-height-overflow-y">
            <div className="row">
                <div className="col">
                    <BreadcrumbCustom
                        title={id === ID_NOT_DEFINED ? "Crear Película" : "Editar Película"}
                        routes={[
                            { name: "Películas", link: "/movies/list" },
                        ]}
                        activeRoute={id === ID_NOT_DEFINED ? "Crear Película" : "Editar Película"}
                    />
                </div>
            </div>

            <form className="mb-3" onSubmit={handleSubmit}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 table-data form-group" >
                            <div className="card card-primary p-4">

                                <div className="card-body mb-4">
                                    <div className="row">
                                        <div className="col">

                                            <div className="row">
                                                <div className="col-10">
                                                    <div className="poster-image">
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
                                                    <label>Título<b><i className="text-red">*</i></b></label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="title"
                                                        placeholder="Digita el título"
                                                        value={selectedMovie.title}
                                                        minLength="3"
                                                        maxLength="100"
                                                        onChange={setData}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <label>Director<b><i className="text-red">*</i></b></label>
                                                    <Select
                                                        options={filtered.map(director => {
                                                            return {
                                                                value: director.id,
                                                                label: <div className="select-label">
                                                                    <span>{director.name}</span>
                                                                    <div className="">
                                                                        <img src={director.avatar} alt={director.name} height="35px" />
                                                                    </div>
                                                                </div>
                                                            }
                                                        })}
                                                        onChange={(newValue, actionMeta) => handleSelectedDirector(newValue, "change-actor")}
                                                        isSearchable={false}
                                                    />
                                                </div>
                                            </div>


                                        </div>
                                        <div className="col">
                                            <div className="row">
                                                <div className="col">
                                                    <div className="row">
                                                        <div className="col">
                                                            <label>Año<b><i className="text-red">*</i></b></label>
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                name="year"
                                                                value={selectedMovie.year}
                                                                onChange={setData}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col">
                                                            <label>Duración (min)<b><i className="text-red">*</i></b></label>
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                name="duration"
                                                                value={selectedMovie.duration}
                                                                minLength="3"
                                                                maxLength="100"
                                                                onChange={setData}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col">
                                                            <label>Sinopsis:</label>
                                                            <textarea
                                                                className="form-control custom-textarea mt-1"
                                                                name="synopsis"
                                                                value={selectedMovie.synopsis}
                                                                maxLength={1000}
                                                                placeholder="Digite la sinopsis"
                                                                onChange={setData}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col">
                                                            <label>Actores<b><i className="text-red">*</i></b></label>
                                                            <Select
                                                                options={filteredActors.map(actor => {
                                                                    return {
                                                                        value: actor.id,
                                                                        label: <div className="select-label">
                                                                            <span>{actor.name}</span>
                                                                            <div className="">
                                                                                <img src={actor.avatar} alt={actor.name} height="35px" />
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                })}
                                                                isMulti
                                                                onChange={(newValue, actionMeta) => onChangeMultiSelect(newValue, "change-actor")}
                                                                isSearchable={false}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col">
                                                            <label>Géneros<b><i className="text-red">*</i></b></label>
                                                            <Select
                                                                options={filteredGenres.map(genre => {
                                                                    return {
                                                                        value: genre.id,
                                                                        label: genre.name,
                                                                    }
                                                                })}
                                                                isMulti
                                                                onChange={(newValue, actionMeta) => onChangeMultiSelect(newValue, "change-genre")}
                                                                isSearchable={true}
                                                            />
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                                <div className="row">
                                    <div className="col">
                                        <button className='btn btn-success d-block ms-auto' type='submit'>
                                            <i className="fa-solid fa-paper-plane me-2" style={{ fontSize: '16px' }}></i>
                                            {id === ID_NOT_DEFINED ? "Crear" : "Editar"}
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

export default FormMovie;