import React, { useEffect, useState } from 'react';
import toggle from '../../assets/icons/Toggler.png';
import calendar from '../../assets/icons/calendar3.png';
import panel from '../../assets/icons/PanelAdmin.png';
import instructores from '../../assets/icons/Instructores.png';
import fichas from '../../assets/icons/Fichas.png';
import ambientes from '../../assets/icons/Ambientes.png';
import trimestres from '../../assets/icons/Trimestres.png';
import Logout from '../../assets/icons/Logout.png';
import perfil from '../../assets/icons/perfil.png';
import ShowNavBar from '../../hooks/ShowNavBar';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import '../../../css/NavBar/NavBar.css';
import { ModalConfirmLogout } from '../Modals/ModalConfirmLogout';
import useModal from '../../hooks/useModal';


export const NavBar = () => {

    const { isNavOpen, showToggleNav } = ShowNavBar();
    const navigate = useNavigate();
    const { user, logout } = useUser();
    const userRole = user ? user.role : null;
    const userName = user && user.userData ? user.userData.nombreCompleto : null;
    const { isModal, ShowOpenModal, ShowCloseModal } = useModal();
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleResize = () => {
            setWindowHeight(window.innerHeight);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate('/');
    }

    return (
        <>
            <nav className='nav-bar'>
                <div className="name-proyect-toggle">
                    <div className='title-btn'>
                        <h2 className='Title'>ASPS - CBI</h2>
                        <button className='toggle-nav' onClick={showToggleNav}>
                            <img src={toggle} alt="toggle" />
                        </button>
                    </div>

                    <div className='rol-name'>
                        {userRole && <h3 className='user-rol'>{`${userRole}:`}</h3>}
                        <h3 className='username'>{userName}</h3>
                    </div>
                </div>
            </nav>
            <div className={`options-nav ${isNavOpen ? 'open' : ''}`}>
                <ul className={`options-list ${isNavOpen ? 'open' : ''}`}>


                    {(userRole === 'coordinador') && (
                        <>
                            <Link to={'/PerfilCoordinador'}>
                                <li><img src={perfil} alt="perfil" />Perfil</li>
                            </Link>

                            <Link to={'/PanelHorarios'}>
                                <li><img src={calendar} alt="calendar" />Horarios</li>
                            </Link>

                            <Link to={'/Panel'}>
                                <li><img src={panel} alt="panel" />Panel de Control</li>
                            </Link>

                            {
                                windowHeight > 700 &&
                                <>

                                    <Link to={'/CrudInstructor'}>
                                        <li><img src={instructores} alt="instructores" />Instructores</li>
                                    </Link>

                                    <Link to={'/CrudCoordinadores'}>
                                        <li><img src={instructores} alt="instructores" />Coordinadores</li>
                                    </Link>

                                    <Link to={'/CrudAmbientes'}>
                                        <li><img src={ambientes} alt="ambientes" />Ambientes</li>
                                    </Link>

                                    <Link to={'/CrudFichas'}>
                                        <li><img src={fichas} alt="fichas" />Fichas</li>
                                    </Link>

                                    <Link to={'/CrudProgramas'}>
                                        <li><img src={fichas} alt="fichas" />Programas</li>
                                    </Link>

                                    <Link to={'/CrudTrimestres'}>
                                        <li><img src={trimestres} alt="trimestres" />Trimestres</li>
                                    </Link>
                                </>
                            }

                            <Link onClick={ShowOpenModal}>
                                <li><img src={Logout} alt="logout" />Cerrar Sesión</li>
                            </Link>
                        </>
                    )}

                    {(userRole === 'instructor') && (
                        <>
                            <Link to={'/PerfilInstructor'}>
                                <li><img src={perfil} alt="perfil" />Perfil</li>
                            </Link>

                            <Link onClick={ShowOpenModal}>
                                <li><img src={Logout} alt="logout" />Cerrar Sesión</li>
                            </Link>
                        </>
                    )}
                </ul>
            </div>
            <ModalConfirmLogout
                open={isModal}
                close={ShowCloseModal}
                action={handleLogout}
            />
        </>


    )
}
