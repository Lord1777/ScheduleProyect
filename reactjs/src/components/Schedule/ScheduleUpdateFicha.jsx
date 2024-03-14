import React, { useState, useEffect, useContext } from 'react';
import { ModalAsignar } from '../Modals/ModalAsignar';
import { useFetchPutScheduleRecord } from '../../hooks/FetchPUT/useFetchPutScheduleRecord';
import { useFetchGetOneQuarter } from '../../hooks/FetchGET/useFetchGetOneQuarter';
import { Loading } from '../Loading/Loading';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { initialsName } from '../../hooks/useObjectFunction';
import { ContinuoModal } from '../Modals/ContinuoModal'
import useSelectedBoxes from '../../hooks/useSelectedBoxes';
import useModalAsignar from '../../hooks/useModalAsignar';
import useValidationForm from '../../hooks/useValidationForm';
import warning from '../../assets/img/warning.png';
import '../../../css/Schedule/ScheduleAdd.css';
import exito from '../../assets/img/Exito.png'
import error from '../../assets/img/Advertencia.png'
import useFetchGetScheduleRecord from '../../hooks/FetchSchedule/useFetchGetScheduleRecord';
import FilterScheduleFichaContext from '../../context/FilterScheduleFichaContext';
import useFetchGetInfoBarRecord from '../../hooks/FetchSchedule/useFetchGetInfoBarRecord';
import { Modal } from '../Modals/Modal';
import { useFetchGetCreateAndUpdateSchedule } from '../../hooks/FetchGET/useFetchGetCreateAndUpdateSchedule';


export const ScheduleUpdateFicha = () => {

    const { idFicha, idHorario, idTrimestre } = useParams();
    const [horasAsignadas, setHorasAsignadas] = useState(0);
    const { setTotalSeleccionadoValue } = useContext(FilterScheduleFichaContext);
    const { selectedBoxes, handleBoxClick, resetSelectedBoxes } = useSelectedBoxes();
    const { isModal, openModal, closeModal, asignaciones, setAsignaciones } = useModalAsignar();
    const [alertShowModal, setAlertShowModal] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const { TRIMESTRE } = useValidationForm();
    const { register, setValue, handleSubmit } = useForm();
    const [modalMenosHoras, setModalMenosHoras] = useState(false);
    const [messageAlertHoras, setMessageAlertHoras] = useState('');
    const [formData, setFormData] = useState(null);

    const { dataQuarter } = useFetchGetOneQuarter(`/GetTrimestre/${idTrimestre}`);
    const { dataInfoRecord } = useFetchGetInfoBarRecord('/getInfoBarRecord', idFicha);
 
    // Almacena todos los índices, id-instructor, id-ambiente asignados,
    const [globalStoreBoxes, setGlobalStoreBoxes] = useState(new Set());
    const [point, setPoint] = useState(false);

    const { dataSchedule, loading } = useFetchGetScheduleRecord('/getScheduleAdminApprentice', idFicha, idHorario);
    const { dataCoordinator } = useFetchGetCreateAndUpdateSchedule('/createAndUpdateBy', idHorario);

    //bandera
    const [isInitialized, setIsInitialized] = useState(false);

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
    const [newHorasAsignadasPorDia, setNewHorasAsignadasPorDia] = useState({});
    const diaSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    const onSubmit = async (data) => {
        setFormData(data)
        if (globalStoreBoxes.length > 0 || globalStoreBoxes.size) {

            // Reiniciar horasAsignadasPorDia a un estado inicial
            const initialHorasPorDia = {};
            globalStoreBoxes.forEach(box => {
                const idInstructor = box.idInstructor;
                const dia = diaSemana[box.boxIndex % 7];
                if (!initialHorasPorDia[idInstructor]) {
                    initialHorasPorDia[idInstructor] = {};
                }
                initialHorasPorDia[idInstructor][dia] = 0;
            });

            setNewHorasAsignadasPorDia(initialHorasPorDia);

            // Actualizar el registro de horas asignadas por día
            const newHorasAsignadasPorDia = { ...initialHorasPorDia };
            globalStoreBoxes.forEach(box => {
                const idInstructor = box.idInstructor;
                const dia = diaSemana[box.boxIndex % 7];
                if (!newHorasAsignadasPorDia[idInstructor][dia]) {
                    newHorasAsignadasPorDia[idInstructor][dia] = 0;
                }
                newHorasAsignadasPorDia[idInstructor][dia] += 1;
            });

            // Verificar si se excede el límite diario de 10 horas para algún instructor en algún día
            const idInstructorExcedido = Object.keys(newHorasAsignadasPorDia).find(idInstructor => {
                const horasPorDia = newHorasAsignadasPorDia[idInstructor];
                return Object.values(horasPorDia).some(horas => horas > 8);
            });

            if (idInstructorExcedido) {
                setMessageAlert('Se ha detectado que un instructor ha superado el límite diario de 8 horas en al menos uno de los días.');
                setAlertShowModal(true);
                return
            }

            if (globalStoreBoxes.length < 32 || globalStoreBoxes.size < 32) {
                setMessageAlertHoras("El horario de la ficha tiene menos de 32 horas, ¿Quieres continuar?");
                setModalMenosHoras(true);
                return
            }

            if (globalStoreBoxes.length > 32 || globalStoreBoxes.size > 32) {
                setMessageAlertHoras("El horario de la ficha tiene más de 32 horas, ¿Quieres continuar?");
                setModalMenosHoras(true);
                return
            }

            if (globalStoreBoxes.length == 32 || globalStoreBoxes.size == 32) {
                setMessageAlertHoras("El horario de la ficha tiene 32 horas, ¿Quieres continuar?");
                setModalMenosHoras(true);
                return
            }

            await fetchUpdateScheduleRecord({
                idTrimestre: dataQuarter.idTrimestre,
                idFicha: idFicha,
                globalStoreBoxes
            });
        }
    }

    const saveScheduleModal = async () => {
        await fetchUpdateScheduleRecord({
            idTrimestre: dataQuarter.idTrimestre,
            idFicha: idFicha,
            globalStoreBoxes
        });
    };

    useEffect(() => {
        // Supongamos que dataSchedule es la información de los horarios obtenida del componente SeeSchedule
        const selectedSchedules = dataSchedule.filter(infoSchedule => infoSchedule);

        // Calcular la cantidad total de horas semanales
        const totalSeleccionado = selectedSchedules.length;

        // Actualizar el contexto con el total de horas
        setTotalSeleccionadoValue(totalSeleccionado);

    }, [dataSchedule, setTotalSeleccionadoValue]);

    useEffect(() => {

        if (dataSchedule && dataSchedule.length > 0 && globalStoreBoxes.size === 0) {

            if (point === true && globalStoreBoxes.size === 0) {
                alert('No puedes eliminar todas las asignaciones de un horario academico');
            }

            setPoint(true);

            //Inicializar globalStoreBoxes cuando existan los datos suministrados
            const newData = new Set(dataSchedule.map(item => ({
                idInstructor: item.idUsuario,
                instructor: item.nombreCompleto,
                idAmbiente: item.idAmbiente,
                ambiente: item.ambiente,
                boxIndex: item.boxIndex,
            })));
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
            setAsignaciones(newAsignaciones);
        }

        // Limpiar el estado horasAsignadasPorDia
        setNewHorasAsignadasPorDia([]);

        // Inicializa las horas asignadas a 0 para cada día de la semana para cada instructor
        const initialHorasPorDia = {};
        // globalStoreBoxes.forEach(box => {
        //     const dia = diaSemana[box.boxIndex % 7];
        //     initialHorasPorDia[dia] = 0;
        // });
        // setNewHorasAsignadasPorDia(initialHorasPorDia);


            const newHorasAsignadasPorDia = { ...initialHorasPorDia };
            globalStoreBoxes.forEach(box => {
                const dia = diaSemana[box.boxIndex % 7];
                if (!newHorasAsignadasPorDia[dia]) {
                    newHorasAsignadasPorDia[dia] = 0;
                }
                newHorasAsignadasPorDia[dia] += 1;
            });


        //console.log(newHorasAsignadasPorDia)

        if (duplicatesBox.length > 0 || duplicatesBox.size > 0) {

            const timer = setTimeout(() => {
                setDuplicatesBox([]);
            }, 30000);

            // Limpieza del temporizador cuando el componente se desmonta o cuando duplicatesBox cambia nuevamente
            return () => clearTimeout(timer);
        }
        setNewHorasAsignadasPorDia(newHorasAsignadasPorDia)

    }, [duplicatesBox, globalStoreBoxes, dataSchedule]);


    useEffect(() => {
        // Calcular las horas asignadas al cargar el componente
        const horasIniciales = Object.values(asignaciones).length;
        setHorasAsignadas(horasIniciales);
    }, [asignaciones]);


    if (loading) {
        return <Loading />
    }

    return (
        <>
            <div className="information_bar">
                <div className="information-update-bar">
                    <div>
                        <p><b>Programa de Formación:</b> {dataInfoRecord.nombre}</p>
                    </div>
                    <div>
                        <p><b>Ficha:</b> {dataInfoRecord.ficha}</p>
                        <p><b>Horas semanales:</b> {horasAsignadas}</p>
                    </div>
                </div>

                <div className="container-label-input input-laber-bar">
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

                <div className='manage-shedule-coordinator'>
                    <p><b>Creado por: </b> {dataCoordinator.userCreate}</p>
                    <p><b>Última vez actualizado por: </b>{dataCoordinator.userUpdate}</p>
                </div>
            </div>

            <div className="containergrid-buttons">
                <div className="grid_schedule">
                    <div className="horas-dias">Horas</div>
                    <div className="horas-dias">Lunes: {newHorasAsignadasPorDia.Lunes || 0}</div>
                    <div className="horas-dias">Martes: {newHorasAsignadasPorDia.Martes || 0}</div>
                    <div className="horas-dias">Miércoles: {newHorasAsignadasPorDia.Miércoles || 0}</div>
                    <div className="horas-dias">Jueves: {newHorasAsignadasPorDia.Jueves || 0}</div>
                    <div className="horas-dias">Viernes: {newHorasAsignadasPorDia.Viernes || 0}</div>
                    <div className="horas-dias">Sábado: {newHorasAsignadasPorDia.Sábado || 0}</div>
                    <div className="horas-dias">Domingo: {newHorasAsignadasPorDia.Domingo || 0}</div>

                    {Array.from({ length: 16 }, (_, rowIndex) => (
                        <React.Fragment key={rowIndex}>
                            <div className="hour">
                                <span>{`${6 + rowIndex}:00`}</span>
                                <span>{`${7 + rowIndex}:00`}</span>
                            </div>
                            {Array.from({ length: 7 }, (_, colIndex) => {
                                const boxIndex = rowIndex * 7 + colIndex;

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
                                            `box ${selectedBoxes.has(rowIndex * 7 + colIndex) ? 'selected' : ''}
                                             ${duplicatesBox && duplicatesBox.some(item => item.boxIndex === rowIndex * 7 + colIndex) ? 'duplicate-box' : ''}
                                             ${[...globalStoreBoxes].some(item => item.boxIndex === rowIndex * 7 + colIndex) ? 'assignment-box' : ''}
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
            <Modal
                tittle="Advertencia"
                imagen={warning}
                message={messageAlertHoras}
                open={modalMenosHoras}
                close={() => setModalMenosHoras(false)}
                funcion={() => saveScheduleModal()}
            />
        </>
    );
};
