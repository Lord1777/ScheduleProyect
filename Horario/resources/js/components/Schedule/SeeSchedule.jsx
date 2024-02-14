import React from 'react';
import '../../../css/Schedule/SeeSchedule.css';
import useFetchGetScheduleRecord from '../../hooks/FetchSchedule/useFetchGetScheduleRecord';
import { useParams } from 'react-router-dom';
import { Loading } from '../Loading/Loading';

export const SeeSchedule = () => {

    const { idFicha } = useParams();

    const { dataSchedule, loading } = useFetchGetScheduleRecord('/getScheduleApprentice', idFicha);

    function initialsName(nombreCompleto) {
        const words = nombreCompleto.split(' ');
        const initials = words.map((word) => word.charAt(0).toUpperCase());
        return initials.join('');
    }

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
        </>
    )
}
