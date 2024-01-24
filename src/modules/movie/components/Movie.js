import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import SearchDocument from './SearchDocument';
import ListMovie from './ListMovie';
import BreadcrumbCustom from "../../../app/components/BreadcrumCustom";

import { cleanData } from "../../../reducers/movie/reducerMovie";

const Movie = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleCreate = () => {
        dispatch(cleanData());
        history.push("/movies/create");
    }

    return (
        <div className="container-fluid max-height-overflow-y">
            <div className="row">
                <div className="col">
                    <BreadcrumbCustom
                        title="Películas"
                        activeRoute="Listar películas"
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-5 p-0 mt-1">
                    <SearchDocument />
                </div>
                <div className="col-4">
                    <button title="Crear nuevo director" className="btn btn-success mt-1" type="button" onClick={handleCreate}>
                        <i className="fa-solid fa-plus text-white me-2 fs-5" />
                        Crear película
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="table-data">
                        <ListMovie />
                    </div>
                </div>
            </div>
        </div >
    )
};

export default Movie;