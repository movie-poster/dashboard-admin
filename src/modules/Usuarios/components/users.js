import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import BreadcrumbCustom from "../../../app/components/BreadcrumCustom";
import ListUsers from "./listUsers";
import SearchUsers from "./searchUsers";

import { setListTypeDocument, setListLevel, cleanData } from "../../../reducers/user/reducerUsers";
import GeneralService from "../../../services/GeneralService";

const Users = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        getTypeDocument();
        getAccess();
    }, []);

    const getTypeDocument = async () => {
        const service = new GeneralService("type_document");
        const data = await service.getList(1000);
        const { type_document = [] } = data;
        dispatch(setListTypeDocument({ value: type_document }));
    }

    const getAccess = async () => {
        const service = new GeneralService("level");
        const data = await service.getList(1000);
        const { level = [] } = data;
        dispatch(setListLevel({ value: level }));
    }

    const handleCreate = () => {
        dispatch(cleanData());
        history.push("/users/create")
    }

    return (
        <div className="container-fluid max-height-overflow-y">
            <div className="row">
                <div className="col">
                    <BreadcrumbCustom
                        title="Usuarios"
                        activeRoute="Listar usuarios"
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-6 p-0 mt-1">
                    <SearchUsers />
                </div>
                <div className="col-6">
                    <button title="Crear nuevo documento" className="btn btn-success mt-1" type="button" onClick={handleCreate}>
                        <i className="fa-solid fa-plus text-white me-2" style={{ fontSize: '16px' }} />
                        Crear usuario
                    </button>
                </div>
            </div>
            <div className="table-data" >
                <ListUsers />
            </div>
        </div >
    );
}

export default Users;