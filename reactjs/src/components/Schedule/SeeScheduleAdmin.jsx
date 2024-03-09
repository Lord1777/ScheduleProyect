import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Loading } from '../Loading/Loading';
import { ContinuoModal } from '../Modals/ContinuoModal';
import FilterScheduleFichaContext from '../../context/FilterScheduleFichaContext';
import error from '../../assets/img/Advertencia.png';
import '../../../css/Schedule/SeeSchedule.css';
import useFetchGetScheduleAdminRecord from '../../hooks/FetchSchedule/useFetchGetScheduleAdminRecord';
import { generateRandomColors } from '../../hooks/useObjectFunction';

export const SeeScheduleAdmin = () => {

    const { idFicha, idHorario } = useParams();
    
    const { setHorasAsignadasValue, setTotalSeleccionadoValue, setInstructorColorValue } = useContext(FilterScheduleFichaContext);

    const { dataSchedule,
        loading,
        modalOpen,
        setModalOpen,
        alertMessage } = useFetchGetScheduleAdminRecord('/getScheduleAdminApprentice', idFicha, idHorario);

    function initialsName(nombreCompleto) {
        const words = nombreCompleto.split(' ');
        const initials = words.map((word) => word.charAt(0).toUpperCase());
        return initials.join('');
    }

    const [colorMap, setColorMap] = useState({});
    //bandera
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {

        if (!isInitialized && dataSchedule && dataSchedule.length > 0) {
            const uniqueInstructor = Array.from(new Set(dataSchedule.map(infoSchedule => infoSchedule.nombreCompleto)));
            const colors = generateRandomColors(uniqueInstructor.length);
            const colorMapping = {};
            uniqueInstructor.forEach((ficha, index) => {
                colorMapping[ficha] = colors[index];
            });
            setColorMap(colorMapping);
            setIsInitialized(true); // Marca que la inicialización ha ocurrido
        }

        if (isInitialized) {
            setInstructorColorValue(colorMap);
        }

        // Supongamos que dataSchedule es la información de los horarios obtenida del componente SeeSchedule
        const selectedSchedules = dataSchedule.filter(infoSchedule => infoSchedule);

        // Calcular la cantidad total de horas semanales
        const totalSeleccionado = selectedSchedules.length;

        // Actualizar el contexto con el total de horas
        setTotalSeleccionadoValue(totalSeleccionado);

        setHorasAsignadasValue(totalSeleccionado);
    }, [dataSchedule, setTotalSeleccionadoValue, setHorasAsignadasValue, isInitialized]);

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
                                    style={{ backgroundColor: infoSchedule ? colorMap[infoSchedule.nombreCompleto] : '#D9D9D9' }}
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
