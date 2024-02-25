import React from 'react'
import { Tooltip } from 'react-tooltip';
import '../../../css/Tooltips/TooltipAbout.css'
import { useNavigate } from 'react-router-dom';

export const TooltipAbout = () => {

    const Navigate = useNavigate();
    const showNavigation = () => {
        Navigate('/Acerca-de')
    }

    return (
        <>
            <div className="container-logo-about" onClick={showNavigation}>
                <span className="material-symbols-outlined">
                    copyright
                </span>
            </div>
            <Tooltip
                anchorSelect='.container-logo-about'
                content='Acerca de'
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
