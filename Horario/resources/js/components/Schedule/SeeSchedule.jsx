import React from 'react';
import '../../../css/Schedule/SeeSchedule.css';
import useFetchGetScheduleRecord from '../../hooks/FetchSchedule/useFetchGetScheduleRecord';

export const SeeSchedule = (props) => {

    const { idFicha } = props;

    const { dataSchedule } = useFetchGetScheduleRecord('/getscheduleApprentice', idFicha);

    console.log(dataSchedule);

    function initialsName(nombreCompleto) {
        const words = nombreCompleto.split(' ');
        const initials = words.map((word) => word.charAt(0).toUpperCase());
        return initials.join('');
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
                            const infoSchedule = dataSchedule.find((data) => data.boxIndex === boxIndex);

                            return (
                                <div
                                    key={colIndex}
                                    className={`${infoSchedule ? 'selected' : 'cuadricula'}`}
                                >
                                    {infoSchedule ? (
                                        // Si hay información específica del backend
                                        <>
                                            <span>{initialsName(infoSchedule.nombreCompleto)}</span>
                                            <span>{infoSchedule.ambiente}</span>
                                        </>
                                    ) : (
                                        // Si no hay información del backend
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
