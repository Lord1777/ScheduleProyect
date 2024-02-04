import React from 'react'
import '../../../css/Tooltips/TooltipHorario.css'
import { FaCalendarCheck } from "react-icons/fa";
import { Tooltip } from 'react-tooltip';
import { Link } from 'react-router-dom';

export const TooltipHorario = () => {
    return (
        <>
            <div className="container-logo-caledario">
                <Link to={'/ConsultaAprendiz'} >
                    <FaCalendarCheck style={{ color: 'white', fontSize: '2rem' }} />
                </Link>
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
