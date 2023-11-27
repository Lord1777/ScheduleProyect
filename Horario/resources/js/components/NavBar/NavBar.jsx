import React from 'react'
import '../../../css/NavBar/NavBar.css'
import toggle from '../../assets/icons/Toggler.png'
import calendar from '../../assets/icons/calendar3.png'
import panel from '../../assets/icons/PanelAdmin.png'
import instructores from '../../assets/icons/Instructores.png'
import fichas from '../../assets/icons/Fichas.png'
import ambientes from '../../assets/icons/Ambientes.png'
import trimestres from '../../assets/icons/Trimestres.png'
import Logout from '../../assets/icons/Logout.png'
import perfil from '../../assets/icons/perfil.png'
import ShowNavBar from '../../hooks/ShowNavBar'


export const NavBar = () => {

    const { isNavOpen, showToggleNav } = ShowNavBar();

    return (
        <>
            <nav className='nav-bar'>
                <div className="name-proyect-toggle">
                    <h2>Nombre del Proyecto</h2>
                    <button className='toggle-nav' onClick={showToggleNav}>
                        <img src={toggle} alt="toggle" />
                    </button>
                </div>
            </nav>
            <div className={`options-nav ${isNavOpen ? 'open' : ''}`}>
                <ul className={`options-list ${isNavOpen ? 'open' : ''}`}>
                    <li><img src={perfil} alt="perfil" />Perfil</li>
                    <li><img src={calendar} alt="calendar" />Horario Instructores</li>
                    <li><img src={calendar} alt="calendar" />Horario Fichas</li>
                    <li><img src={panel} alt="panel" />Panel de Control</li>
                    <li><img src={instructores} alt="instructores" />Instructores</li>
                    <li><img src={fichas} alt="fichas" />Fichas</li>
                    <li><img src={ambientes} alt="ambientes" />Ambientes</li>
                    <li><img src={trimestres} alt="trimestres" />Trimestres</li>
                    <li><img src={Logout} alt="logout" />Cerrar Sesión</li>
                </ul>
            </div>
        </>


    )
}
