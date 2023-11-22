import React from 'react'
import '../../../css/Tooltips/TooltipHorario.css'
import { FaCalendarCheck } from "react-icons/fa";
import { Tooltip } from 'react-tooltip';

export const TooltipHorario = () => {
    return (
        <>
            <div className="container-logo-caledario">
                <a href="#">
                    <FaCalendarCheck style={{ color: 'white', fontSize: '2rem' }} />
                </a>
            </div>
            <Tooltip
                anchorSelect='.container-logo-caledario'
                content='Consultar Horario Aprendiz'
                style={{
                    backgroundColor: '#5CB85C',
                    width: '10rem',
                    textAlign: 'center'
                }}
            />
        </>
    )
}
