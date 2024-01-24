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
import Director from "../../modules/directors/components/Director";
import Actor from "../../modules/actors/components/Actor";
import Movie from "../../modules/movie/components/Movie";
import FormMovie from "../../modules/movie/components/FormMovie";

import GeneralService from "../../services/GeneralService";
import { setListActor } from "../../reducers/actor/reducerActor";
import { setListDirector } from "../../reducers/director/reducerDirector";
import { setListMovie } from "../../reducers/movie/reducerMovie";
import { setListGenre } from "../../reducers/genre/reducerGenre";
import Genre from "../../modules/genre/components/Genre";

const Home = () => {
    const { show } = useSelector(state => state.toastSlice);
    const { page: pageActor, pageSize: pageSizeActor } = useSelector(state => state.actorSlice);
    const { page: pageDirector, pageSize: pageSizeDirector } = useSelector(state => state.directorSlice);
    const { page: pageGenre, pageSize: pageSizeGenre } = useSelector(state => state.genreSlice);
    const dispatch = useDispatch();

    const loadActor = async () => {
        const service = new GeneralService("actor");
        const res = await service.getList({ page: pageActor, pageSize: pageSizeActor });
        const { actors = [] } = res;
        dispatch(setListActor({ value: actors }));
    }

    const loadDirector = async () => {
        const service = new GeneralService("director");
        const res = await service.getList({ page: pageDirector, pageSize: pageSizeDirector });
        const { directors = [] } = res;
        dispatch(setListDirector({ value: directors }));
    }

    const loadMovie = async () => {
        const service = new GeneralService("movie");
        const res = await service.getList({ page: pageDirector, pageSize: pageSizeDirector });
        const { movies = [] } = res;
        dispatch(setListMovie({ value: movies }));
    }

    const loadGenre = async () => {
        const service = new GeneralService("genre");
        const res = await service.getList({ page: pageDirector, pageSize: pageSizeDirector });
        const { genres = [] } = res;
        dispatch(setListGenre({ value: genres }));
    }

    useEffect(() => {
        loadActor();
        loadDirector();
        loadMovie();
        loadGenre();
    }, []);

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

                                            <Route exact path="/directors/list"> <Director /> </Route>
                                            <Route exact path="/actors/list"> <Actor /> </Route>
                                            <Route exact path="/genres/list"> <Genre /> </Route>

                                            <Route exact path="/movies/list"> <Movie /> </Route>
                                            <Route exact path="/movies/create"> <FormMovie /> </Route>
                                            <Route exact path="/movies/edit/:id"> <FormMovie /> </Route>

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