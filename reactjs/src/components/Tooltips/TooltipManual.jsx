import React from 'react'
import { saveAs } from 'file-saver';
import '../../../css/Tooltips/TooltipManual.css'
import { Tooltip } from 'react-tooltip';
import manualUsuarioPDF from '../../PDF/ManualDeUsuario-SoftwareParaLaProgramacionDeHorarios.pdf'


export const TooltipManual = () => {

    const handleDownloadManual = () => {
        // Descargar el PDF usando file-saver
        saveAs(manualUsuarioPDF, 'ManualDeUsuario-SoftwareParaLaProgramacionDeHorarios.pdf');
    };

    return (
        <>
            <div className='C-tooltipManual' onClick={handleDownloadManual}>
                <span class="material-symbols-outlined">
                    file_save
                </span>
            </div>
            <Tooltip
                anchorSelect='.C-tooltipManual'
                content='Descargar Manual de Usuario'
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
