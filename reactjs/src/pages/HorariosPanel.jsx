import React from 'react'
import { NavBar } from '../components/NavBar/NavBar'
import S from '../assets/img/S.jpg'
import IN from '../assets/img/IN.jpg'
import AM from '../assets/img/AM.jpg'
import { Link } from 'react-router-dom'
import { CardPControlPanel } from '../components/Cards/CardPControlPanel'

export const HorariosPanel = () => {
    return (
        <>
            <NavBar />
            <div className="container-all-panel">

                <h2>Panel Horarios</h2>

                <div className="container-cardsPanel">

                    <Link to={'/HorariosFichas'} >
                        <CardPControlPanel
                            img={S}
                            text="Horarios Fichas"
                        />
                    </Link>

                    <Link to={'/HorariosInstructores'} >
                        <CardPControlPanel
                            img={IN}
                            text="Horarios Instructores"
                        />
                    </Link>

                    <Link to={'/HorariosAmbientes'} >
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
