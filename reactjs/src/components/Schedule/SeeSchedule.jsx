import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Loading } from '../Loading/Loading';
import { ContinuoModal } from '../Modals/ContinuoModal';
import useFetchGetScheduleRecord from '../../hooks/FetchSchedule/useFetchGetScheduleRecord';
import FilterScheduleFichaContext from '../../context/FilterScheduleFichaContext';
import error from '../../assets/img/Advertencia.png';
import '../../../css/Schedule/SeeSchedule.css';

export const SeeSchedule = () => {

    const { idFicha } = useParams();
    const { setHorasAsignadasValue, setTotalSeleccionadoValue } = useContext(FilterScheduleFichaContext);

    const { dataSchedule,
        loading,
        modalOpen,
        setModalOpen,
        alertMessage } = useFetchGetScheduleRecord('/getScheduleApprentice', idFicha);

    function initialsName(nombreCompleto) {
        const words = nombreCompleto.split(' ');
        const initials = words.map((word) => word.charAt(0).toUpperCase());
        return initials.join('');
    }

    const handleCellClick = (infoSchedule) => {
        //Actualiza el total seleccionado
        const totalSeleccionado = infoSchedule ? infoSchedule.horasAsignadas || 0 : 0;
        setTotalSeleccionadoValue(totalSeleccionado);
    }; 

    useEffect(() => {
        // Supongamos que dataSchedule es la información de los horarios obtenida del componente SeeSchedule
        const selectedSchedules = dataSchedule.filter(infoSchedule => infoSchedule);

        // Calcular la cantidad total de horas semanales
        const totalSeleccionado = selectedSchedules.length;

        // Actualizar el contexto con el total de horas
        setTotalSeleccionadoValue(totalSeleccionado);

    }, [dataSchedule, setTotalSeleccionadoValue, setHorasAsignadasValue,]);

    
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
                <div className="item-encabezado">Domingo</div>

                {Array.from({ length: 16 }, (_, rowIndex) => (
                    <React.Fragment key={rowIndex}>
                        <div className="hora">
                            <span>{`${6 + rowIndex}:00`}</span>
                            <span>{`${7 + rowIndex}:00`}</span>
                        </div>
                        {Array.from({ length: 7 }, (_, colIndex) => {
                            const boxIndex = rowIndex * 7 + colIndex;

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
                                            <span>{initialsName(infoSchedule.nombreCompleto)}</span>
                                            <span>{infoSchedule.ambiente}</span>
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
