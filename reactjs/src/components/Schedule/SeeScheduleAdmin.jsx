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
    const [globalStoreBoxes, setGlobalStoreBoxes] = useState(new Set());
    const [newHorasAsignadasPorDia, setNewHorasAsignadasPorDia] = useState([]);
    const diaSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    const { setHorasAsignadasValue, setTotalSeleccionadoValue, setInstructorColorValue, setHorasAsignadasPorDiaValue } = useContext(FilterScheduleFichaContext);

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
    }, [dataSchedule, setTotalSeleccionadoValue, setHorasAsignadasValue, isInitialized, setHorasAsignadasPorDiaValue]);


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
                                    className={`cuadricula ${infoSchedule ? 'selected' : ''}`}
                                    style={{ backgroundColor: infoSchedule ? colorMap[infoSchedule.nombreCompleto] : '#D9D9D9' }}
                                    onClick={() => handleAssignedBoxClick(boxIndex)}
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
