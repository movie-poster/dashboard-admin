import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Header from './layouts/Header';
import Menu from "./layouts/Menu";
import ToastNotify from "./ToastNotify";
import LoadingCustom from "./LoadingCustom";

//Components Users
import Users from "../../modules/Usuarios/components/users";
import FormUser from "../../modules/Usuarios/components/FormUser";

import GeneralService from "../../services/GeneralService";
import Director from "../../modules/directors/components/Director";

const Home = () => {
    const { show } = useSelector(state => state.toastSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        loadForms();
    }, []);

    const loadForms = async () => {
        /* const service = new GeneralService("form");
        const response = await service.getList(1000);
        const { form = [] } = response;
        dispatch(setListForm({ value: form })); */
    }

    return (
        <>
            <div className="d-flex">
                <Menu />

                {show && <ToastNotify />}
                <LoadingCustom />

                <div className="container-fluid m-0 p-0">
                    {/* Header */}
                    <div className="row m-0 p-0">
                        <div className="col p-0">
                            <Header />
                        </div>
                    </div>
                    {/* Routers */}
                    <div className="row">
                        <div className="col">
                            <Router>
                                <Switch>
                                    <div className='content'>
                                        <main>
                                            {/* <Route exact path="/" > <DashboardView /> </Route> */}

                                            {/* Rutas de usuarios */}
                                            <Route exact path="/directors/list"> <Director /> </Route>
                                            <Route exact path="/directors/create"> <FormUser /> </Route>
                                            <Route exact path="/directors/edit/:id"> <FormUser /> </Route>

                                        </main>
                                    </div>
                                </Switch>
                            </Router>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Home;