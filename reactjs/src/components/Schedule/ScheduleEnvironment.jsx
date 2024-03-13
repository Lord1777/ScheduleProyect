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

    const { setHorasAsignadasValue, setTotalSeleccionadoValue, setEnvironmentColorsValue, setHorasAsignadasPorDiaValue } = useContext(FilterScheduleAmbienteContext);
    const [globalStoreBoxes, setGlobalStoreBoxes] = useState(new Set());
    const [newHorasAsignadasPorDia, setNewHorasAsignadasPorDia] = useState([]);
    const diaSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

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

    useEffect(() => {
        // Inicializa las horas asignadas a 0 para cada día de la semana para cada instructor
        const initialHorasPorDia = {};

        globalStoreBoxes.forEach(box => {
            const dia = diaSemana[box.boxIndex % 7];
            initialHorasPorDia[dia] = 0;
        });

        dataSchedule.forEach(infoSchedule => {
            const dia = diaSemana[infoSchedule.boxIndex % 7];
            initialHorasPorDia[dia] = (initialHorasPorDia[dia] || 0) + 1;
        });

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
        }, [dataSchedule, setTotalSeleccionadoValue, setHorasAsignadasValue, setHorasAsignadasPorDiaValue, newHorasAsignadasPorDia]);

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

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <div className="grid_horario2">

                <div className="item-encabezado">Horas</div>
                <div className="item-encabezado">Lunes: {newHorasAsignadasPorDia.Lunes || 0}</div>
                <div className="item-encabezado">Martes: {newHorasAsignadasPorDia.Martes || 0}</div>
                <div className="item-encabezado">Miércoles: {newHorasAsignadasPorDia.Miércoles || 0}</div>
                <div className="item-encabezado">Jueves: {newHorasAsignadasPorDia.Jueves || 0}</div>
                <div className="item-encabezado">Viernes: {newHorasAsignadasPorDia.Viernes || 0}</div>
                <div className="item-encabezado">Sábado: {newHorasAsignadasPorDia.Sábado || 0}</div>
                <div className="item-encabezado">Domingo: {newHorasAsignadasPorDia.Domingo || 0}</div>

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
