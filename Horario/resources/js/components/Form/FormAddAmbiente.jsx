import React, { useState } from 'react'
import '../../../css/Form/FormAddAmbiente.css'
import { getSedeByName } from '../../hooks/useObjectMapping';
import useDropdown from '../../hooks/useDropdown';
import useFetchPostEnvironment from '../../hooks/FetchPOST/useFetchPostEnvironment';
import { useForm } from 'react-hook-form';
import useValidationForm from '../../hooks/useValidationForm';
import { ContinuoModal } from '../Modals/ContinuoModal';
import exito from '../../assets/img/Exito.png'
import error from '../../assets/img/Advertencia.png'

export const FormAddAmbiente = () => {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const {
        N_AMBIENTE,
        CAPACIDAD_AMBIENTE,
        C_MESAS,
        C_COMPUTADORES,
        AIRE_ACONDICIONADO,
        VIDEO_BEAM,
        SEDE,
        TABLERO
    } = useValidationForm();
    const dropdown1 = useDropdown(setValue, "aireAcondicionados");
    const dropdown2 = useDropdown(setValue, "videoBeams");
    const dropdown3 = useDropdown(setValue, "sede");
    const dropdown4 = useDropdown(setValue, "tableros");

    const { fetchSubmitEnvironment, succesfullyModal, setSuccesfullyModal, errorModal, setErrorModal } = useFetchPostEnvironment('/createEnvironment');

    const onSubmit = async(data) => {

        await fetchSubmitEnvironment(
            data.ambiente,
            data.cantidadMesas,
            data.capacidad,
            data.catidadComputadores,
            data.aireAcondicionados,
            data.tableros,
            data.videoBeams,
            data.sede,
        )
    }


    return (
        <>
            <main className='container_form_add_ambiente'>
                <div className='box_form_ambiente'>
                    <h2 className='title_underline'>Registro de Ambientes</h2>
                    <div className='container_form_add'>
                        <form method="POST" onSubmit={handleSubmit(onSubmit)}>
                            <div className='grid-column'>
                                <div>
                                    <input
                                        type="number"
                                        name='ambiente'
                                        placeholder='Numero del Ambiente'
                                        {...register("ambiente", N_AMBIENTE)}
                                    />
                                    {errors.ambiente && <p className='errors_forms'>{errors.ambiente.message}</p>}
                                </div>

                                <div>
                                    <div className={`Dropdown ${dropdown1.isDropdown ? 'open' : ''}`}>
                                        <input
                                            type='text'
                                            name='aireAcondicionado'
                                            className='textBox'
                                            placeholder='Aire Acondicionado'
                                            readOnly
                                            onClick={dropdown1.handleDropdown}
                                            value={dropdown1.selectedOption}
                                            {...register("aireAcondicionados", AIRE_ACONDICIONADO)}
                                        />
                                        <div className={`options ${dropdown1.isDropdown ? 'open' : ''}`}>
                                            <div onClick={() => dropdown1.handleOptionClick('Si', setValue, 'aireAcondicionado')}>Si</div>
                                            <div onClick={() => dropdown1.handleOptionClick('No', setValue, 'aireAcondicionado')}>No</div>
                                        </div>
                                    </div>
                                    {errors.aireAcondicionado && <p className='errors_forms'>{errors.aireAcondicionado.message}</p>}
                                </div>

                                <div>
                                    <input
                                        type="number"
                                        name="capacidad"
                                        placeholder='Capadidad del Ambiente'
                                        {...register("capacidad", CAPACIDAD_AMBIENTE)}
                                    />
                                    {errors.capacidad && <p className='errors_forms'>{errors.capacidad.message}</p>}
                                </div>

                                <div>
                                    <div className={`Dropdown ${dropdown2.isDropdown ? 'open' : ''}`}>
                                        <input
                                            type='text'
                                            name='videoBeam'
                                            className='textBox'
                                            placeholder='Video Beam'
                                            readOnly
                                            onClick={dropdown2.handleDropdown}
                                            value={dropdown2.selectedOption}
                                            {...register("videoBeams", VIDEO_BEAM)}
                                        />
                                        <div className={`options ${dropdown2.isDropdown ? 'open' : ''}`}>
                                            <div onClick={() => dropdown2.handleOptionClick('Si', setValue, 'videoBeam')}>Si</div>
                                            <div onClick={() => dropdown2.handleOptionClick('No', setValue, 'videoBeam')}>No</div>
                                        </div>
                                    </div>
                                    {errors.videoBeam && <p className='errors_forms'>{errors.videoBeam.message}</p>}
                                </div>

                                <div>
                                    <input
                                        type="number"
                                        name="cantidadMesas"
                                        placeholder='Cantidad Mesas'
                                        {...register("cantidadMesas", C_MESAS)}
                                    />
                                    {errors.cantidadMesas && <p className='errors_forms'>{errors.cantidadMesas.message}</p>}
                                </div>

                                <div>
                                    <div className={`Dropdown ${dropdown3.isDropdown ? 'open' : ''}`}>
                                        <input
                                            type='text'
                                            name='idSede'
                                            className='textBox'
                                            placeholder='Sede'
                                            readOnly
                                            onClick={dropdown3.handleDropdown}
                                            value={dropdown3.selectedOption}
                                            {...register("sede", SEDE)}
                                        />
                                        <div className={`options ${dropdown3.isDropdown ? 'open' : ''}`}>
                                            <div onClick={() => dropdown3.handleOptionClick('cbi', setValue, 'sede')}>CBI</div>
                                            <div onClick={() => dropdown3.handleOptionClick('industrial', setValue, 'sede')}>Industrial</div>
                                        </div>
                                    </div>
                                    {errors.sede && <p className='errors_forms'>{errors.sede.message}</p>}
                                </div>

                                <div>
                                    <input
                                        type="number"
                                        name="cantidadComputadores"
                                        placeholder='Cantidad Computadores'
                                        {...register("catidadComputadores", C_COMPUTADORES)}
                                    />
                                    {errors.cantidadComputadores && <p className='errors_forms'>{errors.cantidadComputadores.message}</p>}
                                </div>

                                <div>
                                    <div className={`Dropdown ${dropdown4.isDropdown ? 'open' : ''}`}>
                                        <input
                                            type='text'
                                            name='tablero'
                                            className='textBox'
                                            placeholder='Tablero'
                                            readOnly
                                            onClick={dropdown4.handleDropdown}
                                            value={dropdown4.selectedOption}
                                            {...register("tableros", TABLERO)}
                                        />
                                        <div className={`options ${dropdown4.isDropdown ? 'open' : ''}`}>
                                            <div onClick={() => dropdown4.handleOptionClick('Si', setValue, 'tablero')}>Si</div>
                                            <div onClick={() => dropdown4.handleOptionClick('No', setValue, 'tablero')}>No</div>
                                        </div>
                                    </div>
                                    {errors.tablero && <p className='errors_forms'>{errors.tablero.message}</p>}
                                </div>


                            </div>
                            <div className="container-btns">
                                <button type='submit' className='guardar'>Guardar</button>
                                <button className='cancelar'>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <ContinuoModal
                tittle="¡Error!"
                imagen={error}
                message="Ocurrió un error al guardar los datos. Por favor, inténtalo de nuevo."
                open={errorModal}
                close={() => setErrorModal(false)}
                route="/CrudAmbientes"
            />
            <ContinuoModal
                tittle="¡Exito!"
                imagen={exito}
                message="Los datos se guardaron correctamente."
                open={succesfullyModal}
                close={() => setSuccesfullyModal(false)}
                route="/CrudAmbientes"
            />
        </>
    )
}
