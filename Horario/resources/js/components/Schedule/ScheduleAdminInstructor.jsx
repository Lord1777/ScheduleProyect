import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loading } from '../Loading/Loading';
import { ContinuoModal } from '../Modals/ContinuoModal';
import FilterScheduleInstructorContext from '../../context/FilterScheduleInstructorContext';
import error from '../../assets/img/Advertencia.png';
import { useFetchGetScheduleAdminInstructor } from '../../hooks/FetchSchedule/useFetchGetScheduleAdminInstructor';

export const ScheduleAdminInstructor = () => {

    const { idUsuario, idHorario } = useParams();
    const { idTrimestre, setHorasAsignadasValue, setTotalSeleccionadoValue } = useContext(FilterScheduleInstructorContext);
    const {
        dataSchedule,
        loading,
        modalOpen,
        setModalOpen,
        alertMessage } = useFetchGetScheduleAdminInstructor('/getAdminScheduleInstructor', idUsuario, idHorario, idTrimestre, setHorasAsignadasValue);

    
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
                                    onClick={() => handleCellClick(infoSchedule)}
                                >
                                    {infoSchedule ? (
                                        <>
                                            <span>{infoSchedule.ficha}</span>
                                            <span>{infoSchedule.ambiente}</span>
                                            <span>{infoSchedule.nombreCompleto}</span>
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
