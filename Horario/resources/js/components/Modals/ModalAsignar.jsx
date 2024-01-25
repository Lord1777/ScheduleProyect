import React, { useState } from 'react'
import '../../../css/Modals/ModalAsignar.css'
import useDropdownGet from '../../hooks/useDropdownGet'
import { useForm } from 'react-hook-form'
import useValidationForm from '../../hooks/useValidationForm'
import useModalAsignar from '../../hooks/useModalAsignar'
import useSelectedBoxes from '../../hooks/useSelectedBoxes'

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
                    instructor: data.instructor,
                    ambiente: data.ambiente,
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

    // console.log(storeBoxes);

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
                                <div onClick={() => dropdown1.handleOptionClick('N/A')}>N/A</div>
                                <div onClick={() => dropdown1.handleOptionClick('AGP')}>AGP</div>
                                <div onClick={() => dropdown1.handleOptionClick('DHM')}>DHM</div>
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
                                <div onClick={() => dropdown2.handleOptionClick('N/A')}>N/A</div>
                                <div onClick={() => dropdown2.handleOptionClick('115')}>115</div>
                                <div onClick={() => dropdown2.handleOptionClick('120')}>120</div>
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
