import { useDispatch, useSelector } from "react-redux";
import { searchTextUsers, searchNumberUsers} from '../../../reducers/user/reducerUsers'

const SearchUsers = () => {

    const filtered = useSelector(state => state.userSlice.filterNumDocument)
    const dispatch = useDispatch();

    return (
        <>
            <div className="container-fluid m-0 p-0">
                <div className="row m-0 p-0">

                    <div className='col-6'>
                        <input type="text" className="form-control"
                            placeholder="Buscar por nombre"
                            onChange={(e) => {
                                dispatch(searchTextUsers({
                                    value: e.target.value
                                }))
                            }}
                        />
                    </div>

                    <div className='col-6'>
                        <input type="text" className="form-control"
                            placeholder="Buscar por CC"
                            value={filtered}
                            onChange={(e) => {
                                const NumberRegex = /^[0-9]{0,10}$/;
                                if (NumberRegex.test(e.target.value)){
                                    dispatch(searchNumberUsers({
                                        value: e.target.value
                                    }))
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );

}

export default SearchUsers;