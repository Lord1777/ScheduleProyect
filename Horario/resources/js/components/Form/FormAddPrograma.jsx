import React from 'react';
import { useForm } from 'react-hook-form';
import useDropdown from '../../hooks/useDropdown';
import useValidationForm from '../../hooks/useValidationForm';
import useFetchPostProgram from '../../hooks/FetchPOST/useFetchPostProgram';
import exito from '../../assets/img/Exito.png'
import error from '../../assets/img/Advertencia.png'
import { Modal } from '../Modals/Modal';

export const FormAddPrograma = () => {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const dropdown1 = useDropdown(setValue, 'nivelDeFormacion');
    const { DURACION, PROGRAMA, NIVEL_FORMACION } = useValidationForm();

    const { fetchSubmitProgram, successModalOpen, errorModalOpen, closeSuccessModal, closeErrorModal, } = useFetchPostProgram('/createProgram');

    const onSubmit = async(data) => {

        await fetchSubmitProgram(
            data.programa,
            data.duracion,
            data.nivelDeFormacion,
        )
    }

    return (
        <>
            <main className='container_all_form'>
                <div className='box_form'>
                    <h2 className='title_underline'>Registro de Programa</h2>
                    <div className='container_form_add'>
                        <form method='POST' onSubmit={handleSubmit(onSubmit)}>
                            <div className='grid-column'>
                                <div>
                                    <input
                                        type='text'
                                        name='programa'
                                        id='long'
                                        placeholder='Nombre del programa'
                                        {...register("programa", PROGRAMA)}
                                    />
                                    {errors.Programa && <p className='errors_forms'>{errors.Programa.message}</p>}
                                </div>

                                <div>
                                    <input
                                        type='number'
                                        name='duracion'
                                        placeholder='Horas de duración'
                                        {...register("duracion", DURACION)}
                                    />
                                    {errors.Duracion && <p className='errors_forms'>{errors.Duracion.message}</p>}
                                </div>

                                <div>
                                    <div className={`Dropdown ${dropdown1.isDropdown ? 'open' : ''}`}>
                                        <input
                                            type='text'
                                            className='textBox'
                                            placeholder='Nivel de Formación'
                                            name='nivelDeFormacion'
                                            readOnly
                                            onClick={dropdown1.handleDropdown}
                                            value={dropdown1.selectedOption}
                                            {...register("nivelDeFormacion", NIVEL_FORMACION)}
                                        />
                                        <div className={`options ${dropdown1.isDropdown ? 'open' : ''}`}>
                                            <div onClick={() => dropdown1.handleOptionClick('Tecnico')}>Técnico</div>
                                            <div onClick={() => dropdown1.handleOptionClick('Tecnologo')}>Tecnólogo</div>
                                        </div>
                                    </div>
                                    {errors.NivelFormacion && <p className='errors_forms'>{errors.NivelFormacion.message}</p>}
                                </div>
                            </div>
                            <div className="container-btns">
                                <button className='guardar' type="submit">Guardar</button>
                                <button className='cancelar'>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <Modal
                tittle="Actualización Exitosa"
                imagen={exito}
                message="Los datos se actualizaron correctamente."
                route="CrudInstructor"
                open={successModalOpen}
                close={() => {
                    closeSuccessModal();
                    ShowCloseModal();
                }}
            />
            {/* Modal de error */}
            <Modal
                tittle="Error en la Actualización"
                imagen={error}
                message="Ocurrió un error al actualizar los datos. Por favor, inténtalo de nuevo."
                route="CrudInstructor"
                open={errorModalOpen}
                close={() => {
                    closeErrorModal();
                    ShowCloseModal();
                }}
            />
        </>
    )
}
