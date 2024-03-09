import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loading } from '../Loading/Loading';
import { generateRandomColors, initialsName } from '../../hooks/useObjectFunction';
import { useFetchGetScheduleEnvironment } from '../../hooks/FetchSchedule/useFetchGetScheduleEnvironment';
import '../../../css/Schedule/SeeSchedule.css';

import FilterScheduleAmbienteContext from '../../context/FilterScheduleAmbienteContext';

export const ScheduleEnvironment = () => {

    const { idAmbiente, idTrimestre } = useParams();
    const navigate = useNavigate();

    const { setHorasAsignadasValue, setTotalSeleccionadoValue, setEnvironmentColorsValue } = useContext(FilterScheduleAmbienteContext);

    const { dataSchedule, loading } = useFetchGetScheduleEnvironment('/getScheduleEnvironment', idAmbiente, idTrimestre);

    const [colorMap, setColorMap] = useState({});
    //bandera
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (!isInitialized && dataSchedule && dataSchedule.length > 0) {
            const uniqueFichas = Array.from(new Set(dataSchedule.map(infoSchedule => infoSchedule.ficha)));
            const colors = generateRandomColors(uniqueFichas.length);
            const colorMapping = {};
            uniqueFichas.forEach((ficha, index) => {
                colorMapping[ficha] = colors[index];
            });
            setColorMap(colorMapping);
            setIsInitialized(true); // Marca que la inicialización ha ocurrido
        }

        if (isInitialized) {
            setEnvironmentColorsValue(colorMap);
        }


        const selectedSchedules = dataSchedule.filter(infoSchedule => infoSchedule);
    
        const totalSeleccionado = selectedSchedules.length;
    
        setTotalSeleccionadoValue(totalSeleccionado);
    
        setHorasAsignadasValue(totalSeleccionado);
    }, [dataSchedule, setHorasAsignadasValue, setTotalSeleccionadoValue]);


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
                                    className={`${infoSchedule ? 'selectedAmbiente' : 'cuadricula'}`}
                                    style={{ backgroundColor: infoSchedule ? colorMap[infoSchedule.ficha] : '#D9D9D9' }}
                                    onClick={() => navigate(`/HorarioAdminAprendiz/${infoSchedule.idFicha}/${infoSchedule.idHorario}`)}
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
