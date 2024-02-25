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
import '../../../css/Schedule/ScheduleAdd.css';


export const ScheduleAdd = () => {

    const [horasAsignadas, setHorasAsignadas] = useState(0);
    const { selectedBoxes, totalHoras, handleBoxClick, resetSelectedBoxes } = useSelectedBoxes();

    const { isModal, openModal, closeModal, asignaciones, setAsignaciones } = useModalAsignar();
    const [ alertShowModal, setAlertShowModal ] = useState(false);
    const [ messageAlert, setMessageAlert ] = useState('');
    const { TRIMESTRE } = useValidationForm();
    const { register, setValue, handleSubmit } = useForm();
    const { isDropdown, selectedOption, handleDropdown, handleOptionClick } = useDropdown(setValue, "trimestre");
    //const [loading, setLoading] = useState(false);

    const { fetchSubmitSchedule, duplicatesBox, setDuplicatesBox, modalOpen, setModalOpen, alertMessage, succesfullyModal, setSuccesfullyModal } = useFetchPostSchedule('/createSchedule');
    const { dataQuarters } = useFetchGetQuarters('/getQuarters');
    const { id } = useParams();
    const { dataFicha, loading, setLoading, fetchData } = useFetchGetInfoUnitFicha("/GetFicha", id);

    // Almacena todos los índices, id-instructor, id-ambiente asignados,
    const [globalStoreBoxes, setGlobalStoreBoxes] = useState(new Set());

    // Inicializa el registro de horas asignadas por día para cada instructor
    const [horasAsignadasPorDia, setHorasAsignadasPorDia] = useState({})
    const diaSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    console.log(duplicatesBox);

    //Funcion que retorna el id del trimestre
    const getQuarterId = (dataTrimestre) => {
        const quarter = dataQuarters.find((quarter) => `${quarter.trimestre} ${quarter.fechaInicio} - ${quarter.fechaFinal}` === dataTrimestre);
        return quarter ? quarter.idTrimestre : null; // Ajustar si el ID no está presente
    };

    // Función para des-asignar un instructor y ambiente al hacer clic en una casilla asignada
    // El original
    // const handleAssignedBoxClick = (boxIndex) => {
    //     setGlobalStoreBoxes(prevStoreBoxes => {
    //         const newStoreBoxes = prevStoreBoxes.filter(box => box.boxIndex !== boxIndex);
    //         return newStoreBoxes;
    //     });
        
    //     setAsignaciones(prevAsignaciones => {
    //         const newAsignaciones = { ...prevAsignaciones };
    //         delete newAsignaciones[boxIndex];
    //         return newAsignaciones;
    //     });
    // };
    
    
    // const handleAssignedBoxClick = (boxIndex) => {
    //     console.log("handleAssignedBoxClick called for boxIndex:", boxIndex);
    
    //     // ... el resto de tu código ...
        
    //     if (boxData) {
    //         setGlobalStoreBoxes(prevStoreBoxes => {
    //             const newStoreBoxes = prevStoreBoxes.filter(box => box.boxIndex !== boxIndex);
    //             return newStoreBoxes;
    //         });
    
    //         setAsignaciones(prevAsignaciones => {
    //             const newAsignaciones = { ...prevAsignaciones };
    //             delete newAsignaciones[boxIndex];
    //             return newAsignaciones;
    //         });
    
    //         // Resta las horas asignadas solo si la casilla estaba asignada y las horas asignadas son mayores a 0
    //         if (horasAsignadas > 0) {
    //             setHorasAsignadas((prevHoras) => prevHoras - 1);
    //         }
    //     }
    // };
    
    // const handleAssignedBoxClick = (boxIndex) => {
    //     console.log("handleAssignedBoxClick called for boxIndex:", boxIndex);
    
    //     // ... el resto de tu código ...
    //     const boxData = asignaciones[boxIndex];
    
    //     if (boxData) {
    //         setGlobalStoreBoxes(prevStoreBoxes => {
    //             const newStoreBoxes = prevStoreBoxes.filter(box => box.boxIndex !== boxIndex);
    //             return newStoreBoxes;
    //         });
    
    //         setAsignaciones(prevAsignaciones => {
    //             const newAsignaciones = { ...prevAsignaciones };
    //             delete newAsignaciones[boxIndex];
    //             return newAsignaciones;
    //         });
    
    //         // Resta las horas asignadas solo si la casilla estaba asignada y las horas asignadas son mayores a 0
    //         if (horasAsignadas > 0) {
    //             setHorasAsignadas((prevHoras) => Math.max(prevHoras - 1, 0));
    //         }
    //     }
    // };

    const handleAssignedBoxClick = (boxIndex) => {
        console.log("handleAssignedBoxClick called for boxIndex:", boxIndex);
    
        const boxData = asignaciones[boxIndex];
    
        if (boxData) {
            setGlobalStoreBoxes(prevStoreBoxes => {
                const newStoreBoxes = prevStoreBoxes.filter(box => box.boxIndex !== boxIndex);
                return newStoreBoxes;
            });
    
            setAsignaciones(prevAsignaciones => {
                const newAsignaciones = { ...prevAsignaciones };
                delete newAsignaciones[boxIndex];
                return newAsignaciones;
            });
    
            // Resta las horas asignadas solo si la casilla estaba asignada y las horas asignadas son mayores a 0
            setHorasAsignadas((prevHoras) => Math.max(prevHoras - 1, 0));
        }
    };
    
    // useEffect(() => {
    //     // Calcular las horas asignadas al cargar el componente
    //     const horasIniciales = Object.values(asignaciones).length;
    //     setHorasAsignadas(horasIniciales);
    // }, [asignaciones]);
    

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

            // Verificar si se excede el límite diario de 10 horas
            const idInstructorExcedido = Object.keys(newHorasAsignadasPorDia).find(idInstructor => {
                const horasPorDia = newHorasAsignadasPorDia[idInstructor];
                return Object.values(horasPorDia).some(horas => horas > 10);
            });

            if (idInstructorExcedido) {
                setMessageAlert('Se ha detectado que un instructor ha superado el límite diario de 10 horas en al menos uno de los días.');
                setAlertShowModal(true);
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

    useEffect(() => {
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
        setHorasAsignadasPorDia(initialHorasPorDia);


        if (duplicatesBox.length > 0 || duplicatesBox.size > 0) {

            const timer = setTimeout(() => {
                setDuplicatesBox([]);
            }, 8000);

            // Limpieza del temporizador cuando el componente se desmonta o cuando duplicatesBox cambia nuevamente
            return () => clearTimeout(timer);
        }
    }, [duplicatesBox, globalStoreBoxes]);

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
                    <h3>Horas Asignadas: <span>{totalHoras}</span></h3>
                </div>
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
                        {...register("trimestre", TRIMESTRE)}
                    />
                    <div className={`desplegable-options ${isDropdown ? 'open' : ''}`}>
                        {dataQuarters && dataQuarters.length > 0 && dataQuarters.map((quarter) => (
                            <div key={quarter.idTrimestre} onClick={() =>
                                handleOptionClick(`${quarter.trimestre} ${quarter.fechaInicio} - ${quarter.fechaFinal}`)}>
                                {quarter.trimestre} | {quarter.fechaInicio} - {quarter.fechaFinal}
                            </div>
                        ))}
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
                                                setHorasAsignadas((prevHoras) => prevHoras + 1);
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
                route="/CrudFichas"
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
