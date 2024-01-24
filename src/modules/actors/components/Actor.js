import React, { useState } from "react";
import { useDispatch } from "react-redux";

import SearchDocument from './SearchDocument';
import ModalActor from './ModalActor';
import ListActor from './ListActor';
import BreadcrumbCustom from "../../../app/components/BreadcrumCustom";

import { cleanData } from "../../../reducers/actor/reducerActor";

const Actor = () => {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    return (
        <div className="container-fluid max-height-overflow-y">
            <div className="row">
                <div className="col">
                    <BreadcrumbCustom
                        title="Actores"
                        activeRoute="Listar actores"
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-5 p-0 mt-1">
                    <SearchDocument />
                </div>
                <div className="col-4">
                    <button title="Crear nuevo actor" className="btn btn-success mt-1" type="button" onClick={() => { dispatch(cleanData()); setShow(true) }}>
                        <i className="fa-solid fa-plus text-white me-2 fs-5" />
                        Crear actor
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="table-data">
                        <ListActor setShow={setShow} show={show} />
                    </div>
                </div>
            </div>

            <ModalActor show={show} setShow={setShow} />
        </div >
    )
};

export default Actor;