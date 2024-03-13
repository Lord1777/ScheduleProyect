import React, { useState, useEffect } from 'react';
import { ModalAsignar } from '../Modals/ModalAsignar';
import { useForm } from 'react-hook-form';
import { useFetchPostSchedule } from '../../hooks/FetchPOST/useFetchPostSchedule';
import { useParams } from 'react-router-dom';
import { ContinuoModal } from '../Modals/ContinuoModal'
import { initialsName } from '../../hooks/useObjectFunction';
import { Loading } from '../Loading/Loading';
import useSelectedBoxes from '../../hooks/useSelectedBoxes';
import useModalAsignar from '../../hooks/useModalAsignar';
import useValidationForm from '../../hooks/useValidationForm';
import useFetchGetQuarters from '../../hooks/FetchGetResources/useFetchGetQuarters';
import useDropdown from '../../hooks/useDropdown';
import useFetchGetInfoUnitFicha from '../../hooks/FetchGET/useFetchGetInfoUnitFicha';
import exito from '../../assets/img/Exito.png'
import error from '../../assets/img/Advertencia.png'
import warning from '../../assets/img/warning.png'
import '../../../css/Schedule/ScheduleAdd.css';
import { useFetchGetQuarterScheduleAdd } from '../../hooks/FetchGET/useFetchGetQuarterScheduleAdd';
import { Modal } from '../Modals/Modal';


export const ScheduleAdd = () => {

    const { id } = useParams();
    const { dataFicha, loading, setLoading, fetchData } = useFetchGetInfoUnitFicha("/GetFicha", id);
    const { isModal, openModal, closeModal, asignaciones, setAsignaciones } = useModalAsignar();
    const { TRIMESTRE_INFO } = useValidationForm();
    const { register, setValue, handleSubmit, formState: { errors }, } = useForm();
    const { fetchSubmitSchedule, duplicatesBox, setDuplicatesBox, modalOpen, setModalOpen, alertMessage, succesfullyModal, setSuccesfullyModal } = useFetchPostSchedule('/createSchedule');
    const { dataQuarters } = useFetchGetQuarterScheduleAdd('/getQuartersSchedule', id);
    const [modalMenosHoras, setModalMenosHoras] = useState(false);
    const [messageAlertHoras, setMessageAlertHoras] = useState('');
    const [formData, setFormData] = useState(null);

    const { selectedBoxes, handleBoxClick, resetSelectedBoxes } = useSelectedBoxes();

    const [horasAsignadas, setHorasAsignadas] = useState(0);
    const [alertShowModal, setAlertShowModal] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const { isDropdown, selectedOption, handleDropdown, handleOptionClick } = useDropdown(setValue, "trimestre");

    // Almacena todos los índices, id-instructor, id-ambiente asignados,
    const [globalStoreBoxes, setGlobalStoreBoxes] = useState(new Set());

    // Inicializa el registro de horas asignadas por día
    const [newHorasAsignadasPorDia, setNewHorasAsignadasPorDia] = useState({});
    const diaSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];



    //Funcion que retorna el id del trimestre
    const getQuarterId = (dataTrimestre) => {
        const quarter = dataQuarters.find((quarter) => `${quarter.trimestre} ${quarter.fechaInicio} - ${quarter.fechaFinal}` === dataTrimestre);
        return quarter ? quarter.idTrimestre : null; // Ajustar si el ID no está presente
    };

    const handleAssignedBoxClick = (boxIndex) => {
        const boxData = asignaciones[boxIndex];

        if (boxData) {
            // Resta las horas asignadas solo si la casilla estaba asignada y las horas asignadas son mayores a 0
            setHorasAsignadas((prevHoras) => {
                const newHoras = Math.max(prevHoras - 1, 0);
                return newHoras;
            });

            // Elimina la asignación de la casilla
            setGlobalStoreBoxes((prevStoreBoxes) => {
                const newStoreBoxes = prevStoreBoxes.filter((box) => box.boxIndex !== boxIndex);
                return newStoreBoxes;
            });

            setAsignaciones((prevAsignaciones) => {
                const newAsignaciones = { ...prevAsignaciones };
                delete newAsignaciones[boxIndex];
                return newAsignaciones;
            });
        }
    };



    useEffect(() => {
        // Calcular las horas asignadas al cargar el componente
        const horasIniciales = Object.values(asignaciones).length;
        setHorasAsignadas(horasIniciales);
    }, [asignaciones]);



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

            // Verificar si se excede el límite diario de 10 horas
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

            setLoading(true);
            await fetchSubmitSchedule({
                idTrimestre: getQuarterId(data.trimestre),
                idFicha: id,
                globalStoreBoxes
            })
            setLoading(false);
        }
    }

    const saveScheduleModal = async (data) => {
        console.log(
            getQuarterId(data.trimestre),
            id,
            globalStoreBoxes
            )
        setLoading(true);
        await fetchSubmitSchedule({
            idTrimestre: getQuarterId(data.trimestre),
            idFicha: id,
            globalStoreBoxes
        });
        setLoading(false);
    };

    useEffect(() => {
        // Inicializa las horas asignadas a 0 para cada día de la semana para cada instructor
        const initialHorasPorDia = {};

        globalStoreBoxes.forEach(box => {
            const dia = diaSemana[box.boxIndex % 7];
            initialHorasPorDia[dia] = 0;
        });

        // Actualiza el registro de horas asignadas por día
        const newHorasAsignadasPorDia = { ...initialHorasPorDia };
        globalStoreBoxes.forEach(box => {
            const dia = diaSemana[box.boxIndex % 7];
            if (!newHorasAsignadasPorDia[dia]) {
                newHorasAsignadasPorDia[dia] = 0;
            }
            newHorasAsignadasPorDia[dia] += 1;
        });

        console.log('horasAsignadasPorDia:', newHorasAsignadasPorDia);

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
    }, [globalStoreBoxes]);

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <div className="information_bar">
                <div className="content-info-ficha">
                    <h3>Ficha: <span>{dataFicha.ficha}</span></h3>
                    <h3>Programa: <span>{dataFicha.nombre}</span></h3>
                    <h3>Limite de horas: <span>{dataFicha.limiteHoras}</span></h3>
                    <h3>Horas Asignadas: <span>{horasAsignadas}</span></h3>
                </div>
                <div>
                    <div className={`desplegable ${isDropdown ? 'open' : ''}`}>
                        <input
                            type="text"
                            className='textBox'
                            name='Trimestres'
                            placeholder='Trimestres'
                            readOnly
                            autoComplete='off'
                            onClick={handleDropdown}
                            value={selectedOption}
                            {...register("trimestre", TRIMESTRE_INFO)}
                        />
                        <div className={`desplegable-options ${isDropdown ? 'open' : ''}`}>
                            {dataQuarters && dataQuarters.length === 0 ? (
                                <div>No hay trimestres disponibles</div>
                            ) : (
                                dataQuarters.map((quarter) => (
                                    <div key={quarter.idTrimestre} onClick={() =>
                                        handleOptionClick(`${quarter.trimestre} ${quarter.fechaInicio} - ${quarter.fechaFinal}`)}>
                                        {quarter.trimestre} | {quarter.fechaInicio} - {quarter.fechaFinal}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                    {errors.trimestre && <p className='errors_forms'>{errors.trimestre.message}</p>}
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
                                        {boxData && (
                                            <>
                                                <span>{initialsName(boxData.instructor)}</span>
                                                <span>{boxData.ambiente}</span>
                                            </>
                                        )}
                                        {/*console.log(`Box at index ${boxIndex} has classes: ${'box'} ${selectedBoxes.has(boxIndex) ? 'selected' : ''} ${duplicateSelectedBoxes.has(boxIndex) ? 'duplicate-box' : ''}`)*/}
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
                        {globalStoreBoxes.size > 0 || globalStoreBoxes.length > 0 && (
                            <button className='guardar' type='submit'>Guardar</button>
                        )}
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
                route="/CrudFichas"
            />
            <ContinuoModal
                tittle="Advertencia"
                imagen={error}
                message={messageAlert}
                open={alertShowModal}
                close={() => setAlertShowModal(false)}
            />
            {/* Modal en caso de que tenga menos de 40  */}
            <Modal
                tittle="Advertencia"
                imagen={warning}
                message={messageAlertHoras}
                open={modalMenosHoras}
                close={() => setModalMenosHoras(false)}
                funcion={() => saveScheduleModal(formData)}
            />
        </>
    );
};