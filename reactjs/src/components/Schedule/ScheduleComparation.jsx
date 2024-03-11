import React, { useState, useEffect } from 'react'
import { generateRandomColors } from '../../hooks/useObjectFunction';
import '../../../css/Schedule/ComparationsSchedule.css'

export const ScheduleComparation = ({ funcionFecth }) => {
    const [scheduleData, setScheduleData] = useState([])
    const [colorMap, setColorMap] = useState({});
    //bandera
    const [isInitialized, setIsInitialized] = useState(false);
    if (funcionFecth) {

        useEffect(() => {
            if (funcionFecth && Array.isArray(funcionFecth)) {
                setScheduleData(funcionFecth);
            }

            const localScheduleData = scheduleData;

            if (!isInitialized && localScheduleData && localScheduleData.length > 0) {
                const uniqueFichas = Array.from(new Set(localScheduleData.map(infoSchedule => infoSchedule.ficha)));
                const colors = generateRandomColors(uniqueFichas.length);
                const colorMapping = {};
                uniqueFichas.forEach((ficha, index) => {
                    colorMapping[ficha] = colors[index];
                });
                setColorMap(colorMapping);
                setIsInitialized(true);
            }

        }, [funcionFecth, scheduleData, isInitialized]);

    }


    return (
        <>
            <div className="contenedor-horario">

                <div className="item-horario">Hor</div>
                <div className="item-horario">Lun</div>
                <div className="item-horario">Mar</div>
                <div className="item-horario">Mie</div>
                <div className="item-horario">Jue</div>
                <div className="item-horario">Vie</div>
                <div className="item-horario">Sab</div>
                <div className="item-horario">Dom</div>

                {Array.from({ length: 16 }, (_, rowIndex) => (
                    <React.Fragment key={rowIndex}>
                        <div className="hora-horario">
                            <span>{`${6 + rowIndex}:00`}</span>
                            <span>{`${7 + rowIndex}:00`}</span>
                        </div>
                        {Array.from({ length: 7 }, (_, colIndex) => {
                            const boxIndex = rowIndex * 7 + colIndex;
                            // Busca la información específica para este índice en la solicitud del backend
                            const infoSchedule = scheduleData.find((data) => data.boxIndex === boxIndex);

                            return (
                                <div
                                    className={`cuadriculaHorario ${infoSchedule ? 'tooltipVisible' : ''}`}
                                    key={colIndex}
                                    style={{ backgroundColor: infoSchedule ? colorMap[infoSchedule.ficha] : '#D9D9D9' }}>
                                    {infoSchedule ? (
                                        <>
                                            <div className="tooltip-horario"
                                                style={{ backgroundColor: infoSchedule ? colorMap[infoSchedule.ficha] : '#D9D9D9' }}>
                                                {infoSchedule.ficha ? (
                                                    <span className="tooltiptext">Ficha: {infoSchedule.ficha}</span>
                                                ) : (
                                                    <>
                                                    </>
                                                )}
                                                {infoSchedule.ambiente ? (
                                                    <span className="tooltiptext">Ambiente:{infoSchedule.ambiente}</span>
                                                ) : (
                                                    <>
                                                    </>
                                                )}
                                                {infoSchedule.nombreCompleto ? (
                                                    <span className="tooltiptext">Instructor: {infoSchedule.nombreCompleto}</span>
                                                ) : (
                                                    <>
                                                    </>
                                                )}

                                            </div>
                                        </>
                                    ) : (
                                        (
                                            <>
                                            </>
                                        )
                                    )}
                                </div>
                            )

                        })}

                    </React.Fragment>
                ))}
            </div>
        </>
    )
}
