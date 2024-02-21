import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loading } from '../Loading/Loading';
import { initialsName } from '../../hooks/useObjectFunction';
import { useFetchGetScheduleEnvironment } from '../../hooks/FetchSchedule/useFetchGetScheduleEnvironment';
import '../../../css/Schedule/SeeSchedule.css';

import FilterScheduleAmbienteContext from '../../context/FilterScheduleAmbienteContext';

export const ScheduleEnvironment = () => {

    const { idAmbiente, idTrimestre } = useParams();

    const { setHorasAsignadasValue, setTotalSeleccionadoValue } = useContext(FilterScheduleAmbienteContext);

    const { dataSchedule, loading } = useFetchGetScheduleEnvironment('/getScheduleEnvironment', idAmbiente, idTrimestre);

    useEffect(() => {
        const selectedSchedules = dataSchedule.filter(infoSchedule => infoSchedule);
    
        const totalSeleccionado = selectedSchedules.length;
    
        setTotalSeleccionadoValue(totalSeleccionado);
    
        setHorasAsignadasValue(totalSeleccionado);
    }, [dataSchedule, setHorasAsignadasValue, setTotalSeleccionadoValue]);

    const handleCellClick = (infoSchedule) => {
        //Actualiza el total seleccionado
        const totalSeleccionado = infoSchedule ? infoSchedule.horasAsignadas || 0 : 0;
        setTotalSeleccionadoValue(totalSeleccionado);
    };

    if(loading){
        return <Loading/>
    }

    return (
        <>
            <div className="grid_horario2">

                <div className="item-encabezado">Horas</div>
                <div className="item-encabezado">Lunes</div>
                <div className="item-encabezado">Martes</div>
                <div className="item-encabezado">Miercoles</div>
                <div className="item-encabezado">Jueves</div>
                <div className="item-encabezado">Viernes</div>
                <div className="item-encabezado">Sabado</div>

                {Array.from({ length: 16 }, (_, rowIndex) => (
                    <React.Fragment key={rowIndex}>
                        <div className="hora">
                            <span>{`${6 + rowIndex}:00`}</span>
                            <span>{`${7 + rowIndex}:00`}</span>
                        </div>
                        {Array.from({ length: 6 }, (_, colIndex) => {
                            const boxIndex = rowIndex * 6 + colIndex;

                            // Busca la información específica para este índice en la solicitud del backend
                            const infoSchedule = dataSchedule && Array.isArray(dataSchedule) ? dataSchedule.find((data) => data.boxIndex === boxIndex) : false;

                            return (
                                <div
                                    key={colIndex}
                                    className={`${infoSchedule ? 'selected' : 'cuadricula'}`}
                                    onClick={() => handleCellClick(infoSchedule)}
                                >
                                    {infoSchedule ? (
                                        <>
                                            <span>{infoSchedule.ficha}</span>
                                            <span>{initialsName(infoSchedule.nombreCompleto)}</span>
                                        </>
                                    ) : (
                                        (
                                            <>
                                                <span></span>
                                                <span></span>
                                            </>
                                        )
                                    )}
                                </div>
                            );
                        })}
                    </React.Fragment>
                ))}
            </div>
        </>
    )
}
