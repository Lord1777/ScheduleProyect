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

                    <CardPControlPanel
                        img={Fichas}
                        text="Fichas"
                    />
                    <CardPControlPanel
                        img={Coordinadores}
                        text="Coordinadores"
                    />
                    <CardPControlPanel
                        img={Ambientes}
                        text="Ambientes"
                    />
                    <CardPControlPanel
                        img={Tiempo}
                        text="Trimestres"
                    />
                </div>
            </div>


        </>
    )
}
