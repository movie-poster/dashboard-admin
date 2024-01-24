import React, { useState } from "react";
import { useDispatch } from "react-redux";

import SearchDocument from './SearchDocument';
import ModalGenre from './ModalGenre';
import ListGenre from './ListGenre';
import BreadcrumbCustom from "../../../app/components/BreadcrumCustom";

import { cleanData } from "../../../reducers/actor/reducerActor";

const Genre = () => {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    return (
        <div className="container-fluid max-height-overflow-y">
            <div className="row">
                <div className="col">
                    <BreadcrumbCustom
                        title="Géneros"
                        activeRoute="Listar géneros"
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-5 p-0 mt-1">
                    <SearchDocument />
                </div>
                <div className="col-4">
                    <button title="Crear nuevo género" className="btn btn-success mt-1" type="button" onClick={() => { dispatch(cleanData()); setShow(true) }}>
                        <i className="fa-solid fa-plus text-white me-2 fs-5" />
                        Crear género
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="table-data">
                        <ListGenre setShow={setShow} show={show} />
                    </div>
                </div>
            </div>

            <ModalGenre show={show} setShow={setShow} />
        </div >
    )
};

export default Genre;