import React from 'react';
import '../../../css/Schedule/ScheduleAdd.css';
import useSelectedBoxes from '../../hooks/useSelectedBoxes';


export const ScheduleAdd = () => {
    
    const { selectedBoxes, handleBoxClick, resetSelectedBoxes } = useSelectedBoxes();

    return (
        <>
            <div className="containergrid-buttons">
                <div className="grid_schedule">
                    <div className="horas-dias">Horas</div>
                    <div className="horas-dias">Lunes</div>
                    <div className="horas-dias">Martes</div>
                    <div className="horas-dias">Miércoles</div>
                    <div className="horas-dias">Jueves</div>
                    <div className="horas-dias">Viernes</div>
                    <div className="horas-dias">Sábado</div>

                    {Array.from({ length: 14 }, (_, rowIndex) => (
                        <React.Fragment key={rowIndex}>
                            <div className="hour">
                                <span>{`${6 + rowIndex}:00`}</span>
                                <span>{`${7 + rowIndex}:00`}</span>
                            </div>
                            {Array.from({ length: 6 }, (_, colIndex) => (
                                <div
                                    key={colIndex}
                                    className={`box ${selectedBoxes.has(rowIndex * 6 + colIndex) ? 'selected' : ''}`}
                                    onClick={() => handleBoxClick(rowIndex * 6 + colIndex)}
                                >
                                    <span></span>
                                    <span></span>
                                </div>
                            ))}
                        </React.Fragment>
                    ))}
                </div>

                <div className="container-buttons">
                    {selectedBoxes.size > 0 && (
                        <button className='asignar' onClick={resetSelectedBoxes}>
                            Asignar
                        </button>
                    )}
                    <button className='guardar'>Guardar</button>
                </div>
            </div>
        </>
    );
};
