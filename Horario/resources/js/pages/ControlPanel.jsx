import React from 'react'
import { CardPControlPanel } from '../components/Cards/CardPControlPanel'
import Instructores from '../assets/img/Instructores.jpg'
import Fichas from '../assets/img/Fichas.jpg'
import Coordinadores from '../assets/img/Coordinadores.jpg'
import Ambientes from '../assets/img/Ambiente.jpg'
import Tiempo from '../assets/img/Tiempo.jpg'

export const ControlPanel = () => {
    return (
        <>
            <div className="container-all-panel">
                <h2>Panel de Control</h2>
                <div className="container-cardsPanel">
                    <CardPControlPanel
                    img={Instructores}
                    text="Instructores"
                    />
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
