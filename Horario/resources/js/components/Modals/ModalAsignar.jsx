import React, { useState } from 'react'
import '../../../css/Modals/ModalAsignar.css'
import useDropdownGet from '../../hooks/useDropdownGet'
import { useForm } from 'react-hook-form'
import useValidationForm from '../../hooks/useValidationForm'
import useModalAsignar from '../../hooks/useModalAsignar'
import useSelectedBoxes from '../../hooks/useSelectedBoxes'
import { useFetchGetInstructors } from '../../hooks/FetchGetResources/useFetchGetInstructors'
import { useFetchGetEnvironments } from '../../hooks/FetchGetResources/useFetchGetEnvironments'

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

    const dropdown1 = useDropdownGet(setValue, "instructor");
    const dropdown2 = useDropdownGet(setValue, "ambiente");

    const { dataInstructors } = useFetchGetInstructors('/getInstructors');
    const { dataEnvironments } = useFetchGetEnvironments('/getEnvironments');

    //Funciones para obtener el id del instructor y del ambiente en base al parametro recibido
    const getInstructorId = (nombreInstructor) => {
        const instructor = dataInstructors.find((instructor) => instructor.nombreCompleto === nombreInstructor);
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
                const newStoreBoxes = new Set(prevStoreBoxes);
                newStoreBoxes.add({
                    boxIndex,
                    idInstructor: getInstructorId(data.instructor),
                    idAmbiente: getAmbienteId(parseInt(data.ambiente)),
                });
                return newStoreBoxes;
            });

            setAsignaciones((prevAsignaciones) => ({
                ...prevAsignaciones,
                [boxIndex]: {
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

    console.log(storeBoxes);

    return (
        <>
            <div className="shadow_box">
                <div className="box-modal-asignar">
                    <h3>Asignar Instructores y Ambientes</h3>
                    <form method='POST' onSubmit={handleSubmit(onSubmit)} >

                        <div className={`desplegable ${dropdown1.isDropdown ? 'open' : ''}`}>
                            <input
                                type="text"
                                className='textBox'
                                name='Instructores'
                                placeholder='Seleccionar Instructor'
                                readOnly
                                onClick={dropdown1.handleDropdown}
                                value={dropdown1.selectedOption}
                                {...register("instructor", INSTRUCTOR)}
                            />
                            <div className={`desplegable-options ${dropdown1.isDropdown ? 'open' : ''}`}>
                                { dataInstructors && dataInstructors.length > 0 && dataInstructors.map((instructor) => (
                                    <div key={instructor.idUsuario}
                                    onClick={() => dropdown1.handleOptionClick(`${instructor.nombreCompleto}`)}
                                    >{instructor.nombreCompleto}</div>
                                ))} 
                            </div>
                        </div>

                        <div className={`desplegable ${dropdown2.isDropdown ? 'open' : ''}`}>
                            <input
                                type="text"
                                className='textBox'
                                name='Ambiente'
                                placeholder='Seleccionar Ambientes'
                                readOnly
                                onClick={dropdown2.handleDropdown}
                                value={dropdown2.selectedOption}
                                {...register("ambiente", AMBIENTE)}
                            />
                            <div className={`desplegable-options ${dropdown2.isDropdown ? 'open' : ''}`}>
                            { dataEnvironments && dataEnvironments.length > 0 && dataEnvironments.map((environment) => (
                                    <div key={environment.idAmbiente}
                                    onClick={() => dropdown2.handleOptionClick(`${environment.ambiente}`)}
                                    >{environment.ambiente}</div>
                                ))} 
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
