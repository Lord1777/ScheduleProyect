import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useDropdown from '../../hooks/useDropdown';
import useValidationForm from '../../hooks/useValidationForm';
import useFetchPostProgram from '../../hooks/FetchPOST/useFetchPostProgram';
import exito from '../../assets/img/Exito.png'
import error from '../../assets/img/Advertencia.png'
import { ContinuoModal } from '../Modals/ContinuoModal';
import { Link } from 'react-router-dom';
import { Loading } from '../Loading/Loading';

export const FormAddPrograma = () => {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const dropdown1 = useDropdown(setValue, 'nivelDeFormacion');
    const { DURACION, PROGRAMA, NIVEL_FORMACION } = useValidationForm();
    const [ loading, setLoading ] = useState(false);

    const { 
        fetchSubmitProgram, 
        successModalOpen, 
        errorModalOpen, 
        closeSuccessModal, 
        closeErrorModal, 
        alertMessage, 
        ruta } = useFetchPostProgram('/createProgram');

    const onSubmit = async (data) => {
        setLoading(true);
        await fetchSubmitProgram(
            data.programa,
            data.duracion,
            data.nivelDeFormacion,
        )
        setLoading(false);
    }

    if(loading){
        return <Loading/>
    }

    return (
        <>
            <main className='container_all_form'>
                <div className='box_form'>
                    <h2 className='title_underline'>Añadir Programa</h2>
                    <div className='container_form_add'>
                        <form method='POST' onSubmit={handleSubmit(onSubmit)}>
                            <div className='grid-column'>
                                <div>
                                    <input
                                        type='text'
                                        name='programa'
                                        id='long'
                                        placeholder='Nombre del programa'
                                        autoComplete='off'
                                        {...register("programa", PROGRAMA)}
                                    />
                                    {errors.programa && <p className='errors_forms'>{errors.programa.message}</p>}
                                </div>

                                <div>
                                    <input
                                        type='number'
                                        name='duracion'
                                        placeholder='Horas de duración'
                                        {...register("duracion", DURACION)}
                                    />
                                    {errors.duracion && <p className='errors_forms'>{errors.duracion.message}</p>}
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
                                    {errors.nivelDeFormacion && <p className='errors_forms'>{errors.nivelDeFormacion.message}</p>}
                                </div>
                            </div>
                            <div className="container-btns">
                                <button className='guardar' type="submit">Guardar</button>
                                <Link to={'/CrudProgramas'}>
                                    <button className='cancelar'>Cancelar</button>
                                </Link>

                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <ContinuoModal
                tittle="¡Error!"
                imagen={error}
                message={alertMessage}
                open={errorModalOpen}
                close={closeErrorModal}
                route={ruta}
            />
            <ContinuoModal
                tittle="¡Exito!"
                imagen={exito}
                message="Los datos se guardaron correctamente."
                open={successModalOpen}
                close={closeSuccessModal}
                route="/CrudProgramas"
            />
        </>
    )
}
