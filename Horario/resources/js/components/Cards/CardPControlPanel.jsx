import React from 'react'
import '../../../css/Cards/CardPControlPanel.css'
import Fondo from '../../assets/img/Fondo-login.jpg'

export const CardPControlPanel = ({ background, texto }) => {
    return (
        <>

            <div className="cardPanelControl">
                <img src={Fondo} />

                <div className="container-text-card">
                    <h3>hola</h3>
                </div>
            </div>

        </>
    )
}
