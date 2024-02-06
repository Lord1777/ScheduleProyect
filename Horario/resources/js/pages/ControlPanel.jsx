import React from 'react'
import { CardPControlPanel } from '../components/Cards/CardPControlPanel'
import { NavBar } from '../components/NavBar/NavBar'
import Instructores from '../assets/img/Instructores.jpg'
import Fichas from '../assets/img/Fichas.jpg'
import Coordinadores from '../assets/img/Coordinadores.jpg'
import Ambientes from '../assets/img/Ambiente.jpg'
import Tiempo from '../assets/img/Tiempo.jpg'
import { Link } from 'react-router-dom'

export const ControlPanel = () => {
    return (
        <>
            <NavBar />
            <div className="container-all-panel">
                <h2>Panel de Control</h2>
                <div className="container-cardsPanel">

                    <Link to='/CrudInstructor' >
                        <CardPControlPanel
                            img={Instructores}
                            text="Instructores"
                        />
                    </Link>

                    <Link to={'/CrudCoordinadores'} >
                        <CardPControlPanel
                            img={Coordinadores}
                            text="Coordinadores"
                        />
                    </Link>

                    <Link to={'/CrudAmbientes'} >
                        <CardPControlPanel
                            img={Ambientes}
                            text="Ambientes"
                        />
                    </Link>

                    <Link to={'/CrudFichas'} >
                        <CardPControlPanel
                            img={Fichas}
                            text="Fichas"
                        />
                    </Link>

                    <Link to={'/CrudTrimestres'} >
                        <CardPControlPanel
                            img={Tiempo}
                            text="Trimestres"
                        />
                    </Link>

                    <Link to={'/HorariosFichas'}>
                        <div className='btn-horarios'>
                            <button>
                                <h3 className='horario'>Horarios académicos</h3>
                            </button>
                        </div>
                    </Link>

                </div>
            </div>


        </>
    )
}
