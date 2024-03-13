import React, { useState } from 'react'
import '../../../css/Modals/ModalAsignar.css'
import useDropdown from '../../hooks/useDropdown'
import { useForm } from 'react-hook-form'
import useValidationForm from '../../hooks/useValidationForm'
import { useFetchGetInstructors } from '../../hooks/FetchGetResources/useFetchGetInstructors'
import { useFetchGetEnvironments } from '../../hooks/FetchGetResources/useFetchGetEnvironments'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { initialsName } from '../../hooks/useObjectFunction'

export const ModalAsignar = ({
    openModal,
    closeModal,
    currentBoxIndex,
    asignaciones,
    setAsignaciones,
    selectedBoxes,
    resetSelectedBoxes,
    storeBoxes,
    setStoreBoxes
}) => {

    if (!openModal) return null;

    const { register, setValue, handleSubmit } = useForm();
    const { INSTRUCTOR, AMBIENTE } = useValidationForm();

    const dropdown1 = useDropdown(setValue, "instructor");
    const dropdown2 = useDropdown(setValue, "ambiente");

    const { dataInstructors } = useFetchGetInstructors('/getInstructors');
    const { dataEnvironments } = useFetchGetEnvironments('/getEnvironments');

    //Funciones para obtener el id del instructor y del ambiente en base al parametro recibido
    const getInstructorId = (nombreInstructor) => {
        const instructor = dataInstructors.find((instructor) => `${instructor.nombreCompleto}` === `${nombreInstructor}`);
        return instructor ? instructor.idUsuario : null; // Ajustar si el ID no está presente
    };
    const getAmbienteId = (numeroAmbiente) => {
        const ambiente = dataEnvironments.find((environment) => environment.ambiente === numeroAmbiente);
        return ambiente ? ambiente.idAmbiente : null; // Ajustar si el ID no está presente
    };

    const onSubmit = async (data) => {

        const updateStateRecursively = async (boxIndexArray) => {

            //Funcion que se cumple despues de que se hayan procesado todos los indices 
            //del array: selectedBoxes
            if (boxIndexArray.length === 0) {
                closeModal();
                resetSelectedBoxes();
                return;
            }

            const boxIndex = boxIndexArray[0];

            setStoreBoxes((prevStoreBoxes) => {
                // Cambiando de Set a Array
                const newStoreBoxes = [...prevStoreBoxes];
                newStoreBoxes.push({
                    boxIndex,
                    idInstructor: getInstructorId(data.instructor),
                    instructor: data.instructor,
                    idAmbiente: getAmbienteId(parseInt(data.ambiente)),
                    ambiente: data.ambiente,
                });
                return newStoreBoxes;
            });

            setAsignaciones((prevAsignaciones) => ({
                ...prevAsignaciones,
                [boxIndex]: {
                    idInstructor: getInstructorId(data.instructor),
                    instructor: data.instructor,
                    ambiente: data.ambiente,
                },
            }));

            // Llama recursivamente para procesar el próximo índice
            await updateStateRecursively(boxIndexArray.slice(1));
        };

        // Llama a la función recursiva con los índices seleccionados
        await updateStateRecursively([...selectedBoxes]);
    };

    const [searchInstructor, setSearchInstructor] = useState("");
    const [searchAmbiente, setSearchAmbiente] = useState("");

    const matchFilter = (searchText, instructor) => {
        const fullName = instructor.nombreCompleto.toLowerCase();
        const initials = initialsName(instructor.nombreCompleto).toLowerCase();
      
        return fullName.startsWith(searchText.toLowerCase()) || initials.startsWith(searchText.toLowerCase());
      };

    return (
        <>
            <div className="shadow_box">
                <div className="box-modal-asignar">
                    <h3>Asignar Instructores y Ambientes</h3>
                    <form method='POST' onSubmit={handleSubmit(onSubmit)} >

                        <div className={`desplegable1 ${dropdown1.isDropdown ? 'open' : ''}`}>
                            <input
                                type="text"
                                className='textBox'
                                name='Instructores'
                                placeholder='Seleccionar Instructor'
                                readOnly
                                onClick={dropdown1.handleDropdown}
                                value={dropdown1.selectedOption}
                                autoComplete='off'
                                {...register("instructor", INSTRUCTOR)}
                            />
                            <div className={`desplegable-options1 ${dropdown1.isDropdown ? 'open' : ''}`} id='instructores'>
                                <div className="search-bar">
                                    <input
                                        type="text"
                                        className='buscador-desplegables'
                                        id='buscador'
                                        value={searchInstructor}
                                        onChange={(e) => setSearchInstructor(e.target.value)}
                                    />
                                    <div className="icon-search-bar">
                                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                                    </div>
                                </div>

                                <div className="contenedor-options">
                                    {dataInstructors && dataInstructors.length > 0 && dataInstructors
                                        .filter((instructor) => matchFilter(searchInstructor, instructor))
                                        .map((instructor) => (
                                            <div key={instructor.idUsuario}
                                                onClick={() => dropdown1.handleOptionClick(`${instructor.nombreCompleto}`)}
                                            >
                                                {instructor.nombreCompleto} - {initialsName(instructor.nombreCompleto)}
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>

                        <div className={`desplegable1 ${dropdown2.isDropdown ? 'open' : ''}`}>
                            <input
                                type="text"
                                className='textBox'
                                name='Ambiente'
                                placeholder='Seleccionar Ambientes'
                                readOnly
                                autoComplete='off'
                                onClick={dropdown2.handleDropdown}
                                value={dropdown2.selectedOption}
                                {...register("ambiente", AMBIENTE)}
                            />
                            <div className={`desplegable-options1 ${dropdown2.isDropdown ? 'open' : ''}`}>
                                <div className="search-bar">
                                    <input
                                        type="text"
                                        className='buscador-desplegables'
                                        id='buscador'
                                        value={searchAmbiente}
                                        onChange={(e) => setSearchAmbiente(e.target.value)}
                                    />
                                    <div className="icon-search-bar">
                                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                                    </div>
                                </div>

                                <div className="contenedor-options">
                                    {dataEnvironments && dataEnvironments.length > 0 && dataEnvironments
                                        .filter((environment) =>
                                            String(environment.ambiente).toLowerCase().startsWith(searchAmbiente.toLowerCase())
                                        )
                                        .map((environment) => (
                                            <div key={environment.idAmbiente}
                                                onClick={() => dropdown2.handleOptionClick(`${environment.ambiente}`)}
                                            >{environment.ambiente}</div>
                                        ))}
                                </div>
                            </div>
                        </div>

                        <div className="container-buttons-modal">
                            <button className='Guardar' type='submit'>Guardar</button>
                            <button className='Cancelar' onClick={closeModal}>Cancelar</button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}
