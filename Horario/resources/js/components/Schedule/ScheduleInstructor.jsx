import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchGetScheduleInstructor } from '../../hooks/FetchSchedule/useFetchGetScheduleInstructor';
import { Loading } from '../Loading/Loading';
import { ContinuoModal } from '../Modals/ContinuoModal';
import FilterScheduleInstructorContext from '../../context/FilterScheduleInstructorContext';

import error from '../../assets/img/Advertencia.png'
import { initialsName } from '../../hooks/useObjectFunction';

export const ScheduleInstructor = () => {

    const { idUsuario } = useParams();
    
    const { idTrimestre, idFicha, setHorasAsignadasValue, setTotalSeleccionadoValue } = useContext(FilterScheduleInstructorContext);
    const {
        dataSchedule,
        loading,
        modalOpen,
        setModalOpen,
        alertMessage } = useFetchGetScheduleInstructor('/getScheduleInstructor', idUsuario, idTrimestre, idFicha, setHorasAsignadasValue);

        useEffect(() => {
            const selectedSchedules = dataSchedule.filter(infoSchedule => infoSchedule);
        
            const totalSeleccionado = selectedSchedules.length;
        
            setTotalSeleccionadoValue(totalSeleccionado);
        
            setHorasAsignadasValue(totalSeleccionado);
        }, [dataSchedule, setHorasAsignadasValue, setTotalSeleccionadoValue]);

    if (loading) {
        return <Loading />
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
                                >
                                    {infoSchedule ? (
                                        <>
                                            <span>{infoSchedule.ficha}</span>
                                            <span>{infoSchedule.ambiente}</span>
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
            <ContinuoModal
                tittle="Error"
                imagen={error}
                message={alertMessage}
                open={modalOpen}
                close={() => setModalOpen(false)}
            />
        </>
    )
}
