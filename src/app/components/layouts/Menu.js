import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { logout } from "../../../reducers/auth/reducerLogin";

import Close from '../../../assets/close.svg';
import MenuButton from '../../../assets/menu.svg';
import { setIsExpanded, setExpandDocument, setExpandDocumentToggle } from '../../../reducers/main/menuReducer';
import ItemNavigation from './ItemNavigation';

const Menu = () => {
    const { isExpanded, expandDocument } = useSelector(state => state.menuSlice);
    const dispatch = useDispatch();

    const openMenu = () => {
        if (isExpanded) {
            dispatch(setExpandDocument({ value: false }));
        }
        dispatch(setIsExpanded());
    }

    const openMenuAndOpcionDocument = () => {
        if (!isExpanded) {
            dispatch(setIsExpanded());
            dispatch(setExpandDocumentToggle());
            return;
        }
        dispatch(setExpandDocumentToggle());
    }

    return (
        <>
            <div className={`border-right sidebar ${isExpanded ? 'change-width' : 'width-sidebar'}`}>
                <div className="container-fluid m-0 p-0">
                    {/* Activar menú*/}
                    <div className='row m-0 p-0 mb-4'>
                        <div className='col p-0'>
                            <button className="button-menu pe-2" type="button"
                                title='Menú'
                                onClick={() => openMenu()}
                            >
                                {
                                    !isExpanded ?
                                        <img className="animate__animated animate__rotateIn animate__slow" src={MenuButton} alt="" />
                                        :
                                        <img className="animate__animated animate__rotateIn animate__slow" src={Close} alt="" />
                                }
                            </button>
                            <hr className="text-white my-2" />
                        </div>
                    </div>

                    {/* Logo de la aplicación y su nombre */}
                    <NavLink to={'#/'} className="text-white">
                        <div className='row m-0 p-0 px-3 mb-5'>
                            {
                                isExpanded &&
                                <>
                                    <div className='col col-name-aplication'>
                                        <i className="fa-solid fa-play text-white fs-4"></i>
                                        <span className='fs-4 font-lilita-one'> <strong> BestMovie </strong></span>
                                    </div>
                                </>
                            }
                        </div>
                    </NavLink>

                    <ItemNavigation
                        icon="fa-solid fa-gauge-high"
                        path="/"
                        title="Panel"
                        isExpanded={isExpanded}
                    />
                    <ItemNavigation
                        icon="fa-solid fa-user"
                        path="/directors/list"
                        title="Directores"
                        isExpanded={isExpanded}
                    />
                    <ItemNavigation
                        icon="fa-solid fa-people-group"
                        path="/actors/list"
                        title="Actores"
                        isExpanded={isExpanded}
                    />
                    <ItemNavigation
                        icon="fa-solid fa-tag"
                        path="/genres/list"
                        title="Géneros"
                        isExpanded={isExpanded}
                    />
                    <ItemNavigation
                        icon="fa-solid fa-video"
                        path="/movies/list"
                        title="Películas"
                        isExpanded={isExpanded}
                    />


                    <hr className="text-white my-3" />

                    <ItemNavigation
                        icon="fa-solid fa-gear"
                        path="/configuration"
                        title="Configuración"
                        isExpanded={isExpanded}
                    />

                    <div
                        role="button"
                        className="d-block p-2 text-white"
                        onClick={() => dispatch(logout())}
                    >
                        {
                            isExpanded
                                ?
                                <>
                                    <i className="fa-solid fa-right-from-bracket fs-5 ms-3 me-2"></i> Salir
                                </>
                                :
                                <i className="fa-solid fa-right-from-bracket fs-5 mx-1"></i>
                        }
                    </div>

                </div>
            </div >
        </>
    )
}

export default Menu;
