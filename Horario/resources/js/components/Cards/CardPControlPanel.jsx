import React from 'react';
import '../../../css/Cards/CardPControlPanel.css';

export const CardPControlPanel = ({img, text}) => {

    const cardStyle = {
        '--fondo': `url(${img})`,
    };

    return (
        <>
            <div className="cardPanelControl" id='instructores' style={cardStyle}>
                <div className="container-text-card">
                    <h3>{text}</h3>
                </div>
            </div>

        </>
    );
};
