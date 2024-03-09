import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loading } from '../Loading/Loading';
import { ContinuoModal } from '../Modals/ContinuoModal';
import { useFetchGetScheduleAdminInstructor } from '../../hooks/FetchSchedule/useFetchGetScheduleAdminInstructor';
import FilterScheduleInstructorContext from '../../context/FilterScheduleInstructorContext';
import error from '../../assets/img/Advertencia.png';
import { generateRandomColors } from '../../hooks/useObjectFunction';


export const ScheduleAdminInstructor = () => {

    const { idUsuario, idTrimestre } = useParams();
    const navigate = useNavigate();
    const { setHorasAsignadasValue, setTotalSeleccionadoValue, setRecordsColorsValue } = useContext(FilterScheduleInstructorContext);
    const {
        dataSchedule,
        loading,
        modalOpen,
        setModalOpen,
        alertMessage } = useFetchGetScheduleAdminInstructor('/getAdminScheduleInstructor', idUsuario, idTrimestre, setHorasAsignadasValue);

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
            setRecordsColorsValue(colorMap);
        }

        const selectedSchedules = dataSchedule.filter(infoSchedule => infoSchedule);

        const totalSeleccionado = selectedSchedules.length;

        setTotalSeleccionadoValue(totalSeleccionado);

        setHorasAsignadasValue(totalSeleccionado);
    }, [dataSchedule, setHorasAsignadasValue, setTotalSeleccionadoValue, isInitialized]);

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
                                    className={`${infoSchedule ? 'selectedInstructor' : 'cuadricula'}`}
                                    style={{ backgroundColor: infoSchedule ? colorMap[infoSchedule.ficha] : '#D9D9D9' }}
                                    onClick={() => navigate(`/HorarioAdminAprendiz/${infoSchedule.idFicha}/${infoSchedule.idHorario}`)}
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

