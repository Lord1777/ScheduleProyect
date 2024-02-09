import React from 'react'
import { CardPControlPanel } from '../components/Cards/CardPControlPanel'
import { NavBar } from '../components/NavBar/NavBar'
import Instructores from '../assets/img/Instructores.jpg'
import Fichas from '../assets/img/Fichas.jpg'
import Coordinadores from '../assets/img/Coordinadores.jpg'
import Ambientes from '../assets/img/Ambiente.jpg'
import Tiempo from '../assets/img/Tiempo.jpg'
import S from '../assets/img/S.jpg'
import IN from '../assets/img/IN.jpg'
import AM from '../assets/img/AM.jpg'
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

                    <Link to={'/HorariosFichas'} >
                        <CardPControlPanel
                            img={S}
                            text="Horarios Académicos"
                        />
                    </Link>

                    <Link to={'/HorariosInstructores'} >
                        <CardPControlPanel
                            img={IN}
                            text="Horarios Instructores"
                        />
                    </Link>

                    <Link to={''} >
                        <CardPControlPanel
                            img={AM}
                            text="Horarios Ambientes"
                        />
                    </Link>

                </div>
            </div>
        </>
    )
}
