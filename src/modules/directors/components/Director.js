import React, { useState } from "react";
import { useDispatch } from "react-redux";

import SearchDocument from './SearchDocument';
import ModalDirector from './ModalDirector';
import ListDirector from './ListDirector';
import BreadcrumbCustom from "../../../app/components/BreadcrumCustom";

import { cleanData } from "../../../reducers/director/reducerDirector";

const Director = () => {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    return (
        <div className="container-fluid max-height-overflow-y">
            <div className="row">
                <div className="col">
                    <BreadcrumbCustom
                        title="Directores"
                        activeRoute="Listar directores"
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-5 p-0 mt-1">
                    <SearchDocument />
                </div>
                <div className="col-4">
                    <button title="Crear nuevo director" className="btn btn-success mt-1" type="button" onClick={() => { dispatch(cleanData()); setShow(true) }}>
                        <i className="fa-solid fa-plus text-white me-2" style={{ fontSize: '16px' }} />
                        Crear director
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="table-data">
                        <ListDirector setShow={setShow} show={show} />
                    </div>
                </div>
            </div>

            <ModalDirector show={show} setShow={setShow} />
        </div >
    )
};

export default Director;