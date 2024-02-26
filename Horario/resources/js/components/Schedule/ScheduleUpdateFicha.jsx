import React, { useState, useEffect, useContext } from 'react';
import { ModalAsignar } from '../Modals/ModalAsignar';
import { useFetchPutScheduleRecord } from '../../hooks/FetchPUT/useFetchPutScheduleRecord';
import { useFetchGetOneQuarter } from '../../hooks/FetchGET/useFetchGetOneQuarter';
import { NavBar } from '../NavBar/NavBar';
import { Loading } from '../Loading/Loading';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { initialsName } from '../../hooks/useObjectFunction';
import { useFetchGetScheduleInstructor } from '../../hooks/FetchSchedule/useFetchGetScheduleInstructor';
import { ContinuoModal } from '../Modals/ContinuoModal'
import useSelectedBoxes from '../../hooks/useSelectedBoxes';
import useModalAsignar from '../../hooks/useModalAsignar';
import useDropdownGet from '../../hooks/useDropdownGet';
import useValidationForm from '../../hooks/useValidationForm';
import useFetchGetQuarters from '../../hooks/FetchGetResources/useFetchGetQuarters';
import useDropdown from '../../hooks/useDropdown';
import '../../../css/Schedule/ScheduleAdd.css';
import exito from '../../assets/img/Exito.png'
import error from '../../assets/img/Advertencia.png'
import useFetchGetScheduleRecord from '../../hooks/FetchSchedule/useFetchGetScheduleRecord';
import FilterScheduleFichaContext from '../../context/FilterScheduleFichaContext';


export const ScheduleUpdateFicha = () => {

    const { idFicha, idHorario, idTrimestre } = useParams();
    const { setTotalSeleccionadoValue, totalSeleccionado } = useContext(FilterScheduleFichaContext);
    const { selectedBoxes, handleBoxClick, resetSelectedBoxes } = useSelectedBoxes();
    const { isModal, openModal, closeModal, asignaciones, setAsignaciones } = useModalAsignar();
    const [alertShowModal, setAlertShowModal] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const { TRIMESTRE } = useValidationForm();
    const { register, setValue, handleSubmit } = useForm();
    const { isDropdown, selectedOption, handleDropdown, handleOptionClick } = useDropdown(setValue, "trimestre");

    const { dataQuarter } = useFetchGetOneQuarter(`/GetTrimestre/${idTrimestre}`);

    // Almacena todos los índices, id-instructor, id-ambiente asignados,
    const [globalStoreBoxes, setGlobalStoreBoxes] = useState(new Set());

    const { dataSchedule, loading } = useFetchGetScheduleRecord('/getScheduleApprentice', idFicha);

    const {
        fetchUpdateScheduleRecord,
        duplicatesBox,
        setDuplicatesBox,
        modalOpen,
        setModalOpen,
        alertMessage,
        succesfullyModal,
        setSuccesfullyModal
    } = useFetchPutScheduleRecord('/updateScheduleRecord', idHorario);

    // Inicializa el registro de horas asignadas por día para cada instructor
    const [horasAsignadasPorDia, setHorasAsignadasPorDia] = useState({})
    const diaSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];


    // Función para des-asignar un instructor y ambiente al hacer clic en una casilla asignada
    const handleAssignedBoxClick = (boxIndex) => {
        setGlobalStoreBoxes(prevStoreBoxes => {
            const newStoreBoxes = new Set(prevStoreBoxes);
            for (const item of newStoreBoxes) {
                if (item.boxIndex === boxIndex) {
                    newStoreBoxes.delete(item);
                    break; // Una vez eliminado, salimos del bucle
                }
            }
            return newStoreBoxes;
        });

        setAsignaciones(prevAsignaciones => {
            const newAsignaciones = { ...prevAsignaciones };
            delete newAsignaciones[boxIndex];
            return newAsignaciones;
        });
    };


    const onSubmit = async (data) => {
        if (globalStoreBoxes.length > 0 || globalStoreBoxes.size) {

            // Reiniciar horasAsignadasPorDia a un estado inicial
            const initialHorasPorDia = {};
            globalStoreBoxes.forEach(box => {
                const idInstructor = box.idInstructor;
                const dia = diaSemana[box.boxIndex % 6];
                if (!initialHorasPorDia[idInstructor]) {
                    initialHorasPorDia[idInstructor] = {};
                }
                initialHorasPorDia[idInstructor][dia] = 0;
            });

            setHorasAsignadasPorDia(initialHorasPorDia);

            // Actualizar el registro de horas asignadas por día
            const newHorasAsignadasPorDia = { ...initialHorasPorDia };
            globalStoreBoxes.forEach(box => {
                const idInstructor = box.idInstructor;
                const dia = diaSemana[box.boxIndex % 6];
                if (!newHorasAsignadasPorDia[idInstructor][dia]) {
                    newHorasAsignadasPorDia[idInstructor][dia] = 0;
                }
                newHorasAsignadasPorDia[idInstructor][dia] += 1;
            });
            console.log('Updated horasAsignadasPorDia:', newHorasAsignadasPorDia);

            // Verificar si se excede el límite diario de 10 horas para algún instructor en algún día
            const idInstructorExcedido = Object.keys(newHorasAsignadasPorDia).find(idInstructor => {
                const horasPorDia = newHorasAsignadasPorDia[idInstructor];
                return Object.values(horasPorDia).some(horas => horas > 10);
            });

            if (idInstructorExcedido) {
                setMessageAlert('Se ha detectado que un instructor ha superado el límite diario de 10 horas en al menos uno de los días.');
                setAlertShowModal(true);
                return
            }

            await fetchUpdateScheduleRecord({
                idTrimestre: dataQuarter.idTrimestre,
                idFicha: idFicha,
                globalStoreBoxes
            });
        }
    }

    useEffect(() => {
        // Supongamos que dataSchedule es la información de los horarios obtenida del componente SeeSchedule
        const selectedSchedules = dataSchedule.filter(infoSchedule => infoSchedule);

        // Calcular la cantidad total de horas semanales
        const totalSeleccionado = selectedSchedules.length;

        // Actualizar el contexto con el total de horas
        setTotalSeleccionadoValue(totalSeleccionado);

    }, [dataSchedule, setTotalSeleccionadoValue]);


    useEffect(() => {
        console.log("Inside useEffect");

        if (dataSchedule && dataSchedule.length > 0 && globalStoreBoxes.size === 0) {
            console.log("Data Schedule:", dataSchedule);

            //Inicializar globalStoreBoxes cuando existan los datos suministrados
            const newData = new Set(dataSchedule.map(item => ({
                idInstructor: item.idUsuario,
                instructor: item.nombreCompleto,
                idAmbiente: item.idAmbiente,
                ambiente: item.ambiente,
                boxIndex: item.boxIndex,
            })));
            console.log("New Data:", newData);
            setGlobalStoreBoxes(newData);

            //Inicializar asignaciones cuando existan los datos suministrados
            const newAsignaciones = {};
            dataSchedule.forEach(item => {
                newAsignaciones[item.boxIndex] = {
                    idInstructor: item.idUsuario,
                    ambiente: item.ambiente,
                    instructor: item.nombreCompleto,
                };
            });
            console.log("New Asignaciones:", newAsignaciones);
            setAsignaciones(newAsignaciones);
        }

        // Limpiar el estado horasAsignadasPorDia
        setHorasAsignadasPorDia({});

        // Inicializa las horas asignadas a 0 para cada día de la semana para cada instructor
        const initialHorasPorDia = {};
        globalStoreBoxes.forEach(box => {
            const idInstructor = box.idInstructor;
            const dia = diaSemana[box.boxIndex % 6];
            if (!initialHorasPorDia[idInstructor]) {
                initialHorasPorDia[idInstructor] = {};
            }
            initialHorasPorDia[idInstructor][dia] = 0;
        });
        console.log("Initial Horas Por Dia:", initialHorasPorDia);
        setHorasAsignadasPorDia(initialHorasPorDia);

        if (duplicatesBox.length > 0 || duplicatesBox.size > 0) {
            console.log("Duplicates Box:", duplicatesBox);

            const timer = setTimeout(() => {
                setDuplicatesBox([]);
            }, 8000);

            // Limpieza del temporizador cuando el componente se desmonta o cuando duplicatesBox cambia nuevamente
            return () => clearTimeout(timer);
        }
    }, [duplicatesBox, globalStoreBoxes, dataSchedule]);


    if (loading) {
        return <Loading />
    }

    return (
        <>
            <div className="information_bar">
                <div className="container-label-input">
                    <label>Trimestre (yyyy-mm-dd):</label>
                    <input type="text"
                        className='info-trimestre'
                        value={`${dataQuarter.trimestre} | ${dataQuarter.fechaInicio} - ${dataQuarter.fechaFinal}`}
                        name='trimestre'
                        autoComplete='off'
                        readOnly
                        disabled={'on'}
                        {...register("trimestre")}
                    />
                </div>
                <div className="trimestre-jornada-horas">
                    <div>
                        <p><b>Horas semanales:</b> {totalSeleccionado}</p>
                    </div>
                </div>
            </div>

            <div className="containergrid-buttons">
                <div className="grid_schedule">
                    <div className="horas-dias">Horas</div>
                    <div className="horas-dias">Lunes</div>
                    <div className="horas-dias">Martes</div>
                    <div className="horas-dias">Miércoles</div>
                    <div className="horas-dias">Jueves</div>
                    <div className="horas-dias">Viernes</div>
                    <div className="horas-dias">Sábado</div>

                    {Array.from({ length: 16 }, (_, rowIndex) => (
                        <React.Fragment key={rowIndex}>
                            <div className="hour">
                                <span>{`${6 + rowIndex}:00`}</span>
                                <span>{`${7 + rowIndex}:00`}</span>
                            </div>
                            {Array.from({ length: 6 }, (_, colIndex) => {
                                const boxIndex = rowIndex * 6 + colIndex;

                                //Evita renderizar un objeto como un hijo directo de react
                                //Si se rederiza(utiliza) directamente boxIndex, genera un error
                                const boxData = asignaciones[boxIndex];
                                const globalBoxData = [...globalStoreBoxes].find(box => box.boxIndex === boxIndex);
                                // // Busca la información específica para este índice en la solicitud del backend
                                // const infoSchedule = dataSchedule && Array.isArray(dataSchedule) ? dataSchedule.find((data) => data.boxIndex === boxIndex) : false;
                                return (
                                    <div
                                        key={colIndex}
                                        className={
                                            `box ${selectedBoxes.has(rowIndex * 6 + colIndex) ? 'selected' : ''}
                                             ${duplicatesBox && duplicatesBox.some(item => item.boxIndex === rowIndex * 6 + colIndex) ? 'duplicate-box' : ''}
                                            `}
                                        onClick={() => {
                                            if (boxData) {
                                                handleAssignedBoxClick(boxIndex);
                                            } else {
                                                handleBoxClick(boxIndex);
                                            }
                                        }}
                                    >
                                        {globalBoxData ? (
                                            <>
                                                <span>{initialsName(globalBoxData.instructor)}</span>
                                                <span>{globalBoxData.ambiente}</span>
                                            </>
                                        ) : boxData ? (
                                            <>
                                                <span>{initialsName(boxData.instructor)}</span>
                                                <span>{boxData.ambiente}</span>
                                            </>
                                        ) : null}
                                        {/* {console.log(`Box at index ${boxIndex} has classes: ${'box'} ${selectedBoxes.has(boxIndex) ? 'selected' : ''} ${duplicateSelectedBoxes.has(boxIndex) ? 'duplicate-box' : ''}`)} */}
                                    </div>
                                );
                            })}
                        </React.Fragment>
                    ))}
                </div>

                <div className="container-buttons">
                    {selectedBoxes.size > 0 && (
                        <button className='asignar' onClick={openModal}>
                            Asignar
                        </button>
                    )}
                    <form method="post" onSubmit={handleSubmit(onSubmit)}>
                        <button className='guardar' type='submit'>Guardar</button>
                    </form>
                </div>

            </div>
            <ModalAsignar
                openModal={isModal}
                closeModal={closeModal}
                asignaciones={asignaciones}
                setAsignaciones={setAsignaciones}
                selectedBoxes={selectedBoxes}
                resetSelectedBoxes={resetSelectedBoxes}
                storeBoxes={globalStoreBoxes}
                setStoreBoxes={setGlobalStoreBoxes}
            />
            <ContinuoModal
                tittle="Error"
                imagen={error}
                message={alertMessage}
                open={modalOpen}
                close={() => setModalOpen(false)}
            />
            <ContinuoModal
                tittle="¡Exito!"
                imagen={exito}
                message={alertMessage}
                open={succesfullyModal}
                close={() => setSuccesfullyModal(false)}
                route={`/HorarioAdminAprendiz/${idFicha}/${idHorario}`}
            />
            <ContinuoModal
                tittle="Advertencia"
                imagen={error}
                message={messageAlert}
                open={alertShowModal}
                close={() => setAlertShowModal(false)}
            />
        </>
    );
};
