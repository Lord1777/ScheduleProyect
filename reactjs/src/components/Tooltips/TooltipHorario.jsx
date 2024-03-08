import React from 'react'
import '../../../css/Tooltips/TooltipHorario.css'
import { FaCalendarCheck } from "react-icons/fa";
import { Tooltip } from 'react-tooltip';
import { useNavigate } from 'react-router-dom';


export const TooltipHorario = () => {

    const Navigate = useNavigate();
    const showNavigation = () => {
        Navigate('/ConsultaAprendiz')
    }

    return (
        <>
            <div className="container-logo-caledario" onClick={showNavigation}>
                <FaCalendarCheck style={{ color: 'white', fontSize: '2rem' }} />
            </div>
            <Tooltip
                anchorSelect='.container-logo-caledario'
                content='Consultar Horario Aprendiz'
                style={{
                    backgroundColor: '#5CB85C',
                    width: '10rem',
                    textAlign: 'center',
                    zIndex: '99'
                }}
            />
        </>
    )
}
