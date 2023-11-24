import React from 'react'
import '../../../css/NavBar/NavBar.css'
import toggle from '../../assets/icons/Toggler.png'
import calendar from '../../assets/icons/calendar3.png'
import panel from '../../assets/icons/PanelAdmin.png'
import ShowNavBar from '../../hooks/ShowNavBar'


export const NavBar = () => {

    const { isNavOpen, showToggleNav } = ShowNavBar();

    return (
        <header className='header-nav'>
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
                    <li><img src={calendar} alt="calendar"/>Horario Instructores</li>
                    <li><img src={calendar} alt="calendar"/>Horario Fichas</li>
                    <li><img src={panel} alt="panel" />Panel de Control</li>
                    <li><img src="" alt="" />Instructores</li>
                    <li><img src="" alt="" />Fichas</li>
                    <li><img src="" alt="" />Ambientes</li>
                    <li>Trimestres</li>
                    <li>Cerrar Sesión</li>
                </ul>
            </div>
        </header>

    )
}
