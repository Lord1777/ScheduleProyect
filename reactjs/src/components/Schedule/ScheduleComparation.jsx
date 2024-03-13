import React, { useState, useEffect } from 'react'
import { generateRandomColors } from '../../hooks/useObjectFunction';
import '../../../css/Schedule/ComparationsSchedule.css'

export const ScheduleComparation = ({ funcionFecth }) => {
    const [scheduleData, setScheduleData] = useState([])
    const [globalStoreBoxes, setGlobalStoreBoxes] = useState(new Set());
    const [newHorasAsignadasPorDia, setNewHorasAsignadasPorDia] = useState([]);
    const diaSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
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

    

    useEffect(() => {
        // Inicializa las horas asignadas a 0 para cada día de la semana para cada instructor
        const initialHorasPorDia = {};

        globalStoreBoxes.forEach(box => {
            const dia = diaSemana[box.boxIndex % 7];
            initialHorasPorDia[dia] = 0;
        });

        // dataSchedule.forEach(infoSchedule => {
        //     const dia = diaSemana[infoSchedule.boxIndex % 7];
        //     initialHorasPorDia[dia] = (initialHorasPorDia[dia] || 0) + 1;
        // });

        setNewHorasAsignadasPorDia(initialHorasPorDia);


        // Actualiza el registro de horas asignadas por día
        const newHorasAsignadasPorDia = { ...initialHorasPorDia };
        globalStoreBoxes.forEach(box => {
            const dia = diaSemana[box.boxIndex % 7];
            if (!newHorasAsignadasPorDia[dia]) {
                newHorasAsignadasPorDia[dia] = 0;
                console.log("condicional")
            }
            setNewHorasAsignadasPorDia[dia] += 1;
        });

        //console.log(newHorasAsignadasPorDia)

        // Verifica si se excede el límite diario de 10 horas
        const idInstructorExcedido = Object.keys(newHorasAsignadasPorDia).find(idInstructor => {
            const horasPorDia = newHorasAsignadasPorDia[idInstructor];
            return Object.values(horasPorDia).some(horas => horas > 8);
        });

        if (idInstructorExcedido) {
            setMessageAlert('Se ha detectado que un instructor ha superado el límite diario de 8 horas en al menos uno de los días.');
            setAlertShowModal(true);
        }
        setNewHorasAsignadasPorDia(newHorasAsignadasPorDia);
    }, [globalStoreBoxes, newHorasAsignadasPorDia]);

    return (
        <>
            <div className="contenedor-horario">

                <div className="item-horario">Hor</div>
                <div className="item-horario">Lun: {newHorasAsignadasPorDia.Lunes || 0}</div>
                <div className="item-horario">Mar: {newHorasAsignadasPorDia.Martes || 0}</div>
                <div className="item-horario">Mie: {newHorasAsignadasPorDia.Miércoles || 0}</div>
                <div className="item-horario">Jue: {newHorasAsignadasPorDia.Jueves || 0}</div>
                <div className="item-horario">Vie: {newHorasAsignadasPorDia.Viernes || 0}</div>
                <div className="item-horario">Sab: {newHorasAsignadasPorDia.Sábado || 0}</div>
                <div className="item-horario">Dom: {newHorasAsignadasPorDia.Domingo || 0}</div>

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
