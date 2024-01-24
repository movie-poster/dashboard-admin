import { useDispatch } from "react-redux";
import { searchTextDirector } from '../../../reducers/director/reducerDirector';

const SearchDocument = () => {
    const dispatch = useDispatch();

    return (
        <>
            <div className="container-fluid m-0 p-0">
                <div className="row m-0 p-0">
                    <div className='col-12'>
                        <input type="text" className="form-control"
                            placeholder="Buscar por nombre"
                            onChange={(e) => dispatch(searchTextDirector({
                                value: e.target.value
                            }))}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default SearchDocument;