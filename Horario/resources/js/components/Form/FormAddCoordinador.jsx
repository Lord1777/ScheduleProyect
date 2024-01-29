import React, { useState } from 'react';
import logoSena from '../../assets/img/LogoSena.png';
import useFetchPostCoordinator from '../../hooks/FetchPOST/useFetchPostCoordinator';
import useValidationForm from '../../hooks/useValidationForm';
import useDropdown from '../../hooks/useDropdown';
import { useForm } from 'react-hook-form';

export const FormAddCoordinador = () => {

    const { register, setValue, handleSubmit, formState: { errors } } = useForm();
    const { NOMBRE,
        TIPO_DOCUMENTO,
        DOCUMENTO,
        TIPO_CONTRATO,
        EMAIL,
        TELEFONO_CELULAR,
        CIUDAD,
        PROFESION,
        EXPERIENCIA,
        SEDE } = useValidationForm();
    const dropdown1 = useDropdown(setValue, "TipoDocumento");
    const dropdown2 = useDropdown(setValue, "TipoContrato");
    const dropdown3 = useDropdown(setValue, "Sede");

    const { fetchSubmitCoordinator } = useFetchPostCoordinator('/register');

    const onSubmit = async (data) => {

        await fetchSubmitCoordinator(
            data.Sede,
            data.TipoContrato,
            data.TipoDocumento,
            data.ciudad,
            data.documento,
            data.email,
            data.experiencia,
            data.nombreCompleto,
            data.profesion,
            data.telefono
        );
    }

    return (
        <>
            {/* //FormAddCoordinador usa las mismas clases que FormAddInstructor
                //La interfaz es igual */}
            <main className='container_form_add_instructor'>
                <div className='box_form_instructor'>
                    <div className='container_form_add_elements'>
                        <div className='container_image_form_instructor'>
                            <img src={logoSena} alt='Logo SENA' />

                            <form method='POST' onSubmit={handleSubmit(onSubmit)}>
                                <div className="grid-column-add">

                                    <div className='container-input-error'>
                                        <input
                                            type="text"
                                            name="nombreCompleto"
                                            className='long'
                                            placeholder='Nombre Completo'
                                            {...register("nombreCompleto", NOMBRE)}
                                        />
                                        {errors.nombreCompleto && <p className='errors_forms'>{errors.nombreCompleto.message}</p>}
                                    </div>

                                    
                                        <div className='container-input-error'>
                                            <div className={`Dropdown ${dropdown1.isDropdown ? 'open' : ''}`} id='widthDropdown'>
                                                <input
                                                    type='text'
                                                    name='TipoDocumento'
                                                    className='textBox'
                                                    placeholder='Tipo de Documento'
                                                    readOnly
                                                    onClick={dropdown1.handleDropdown}
                                                    value={dropdown1.selectedOption}
                                                    {...register("TipoDocumento", TIPO_DOCUMENTO)}
                                                />
                                                <div className={`options ${dropdown1.isDropdown ? 'open' : ''}`}>
                                                    <div onClick={() => dropdown1.handleOptionClick('tarjeta identidad', setValue, 'TipoDocumento')}>Tarjeta Identidad</div>
                                                    <div onClick={() => dropdown1.handleOptionClick('cedula ciudadania', setValue, 'TipoDocumento')}>Cédula Ciudadanía</div>
                                                    <div onClick={() => dropdown1.handleOptionClick('cedula extrangeria', setValue, 'TipoDocumento')}>Cédula Extranjería</div>
                                                </div>
                                            </div>
                                            {errors.TipoDocumento && <p className='errors_forms'>{errors.TipoDocumento.message}</p>}
                                        </div>

                                        <div className='container-input-error'>
                                            <input
                                                type="number"
                                                name="documento"
                                                id=""
                                                placeholder='Número de Documento'
                                                {...register("documento", DOCUMENTO)}
                                            />
                                            {errors.documento && <p className='errors_forms'>{errors.documento.message}</p>}
                                        </div>
                                    


                                    <div className='container-input-error'>
                                        <input
                                            type="text"
                                            name="email"
                                            className='long'
                                            placeholder='E-mail'
                                            {...register("email", EMAIL)}
                                        />
                                        {errors.email && <p className='errors_forms'>{errors.email.message}</p>}
                                    </div>

                                    <div className='container-input-error'>
                                        <input
                                            type="number"
                                            name="telefono"
                                            id=""
                                            placeholder='Telefono'
                                            {...register("telefono", TELEFONO_CELULAR)}
                                        />
                                        {errors.telefono && <p className='errors_forms'>{errors.telefono.message}</p>}
                                    </div>

                                    <div className='container-input-error'>
                                        <div className={`Dropdown ${dropdown2.isDropdown ? 'open' : ''}`} id='widthDropdown'>
                                            <input
                                                type='text'
                                                name='TipoContrato'
                                                className='textBox'
                                                placeholder='Tipo de Contrato'
                                                readOnly
                                                onClick={dropdown2.handleDropdown}
                                                value={dropdown2.selectedOption}
                                                {...register("TipoContrato", TIPO_CONTRATO)}
                                            />
                                            <div className={`options ${dropdown2.isDropdown ? 'open' : ''}`}>
                                                <div onClick={() => dropdown2.handleOptionClick('contratista', setValue, 'TipoContrato')}>Contratista</div>
                                                <div onClick={() => dropdown2.handleOptionClick('planta', setValue, 'TipoContrato')}>Planta</div>
                                            </div>
                                        </div>
                                        {errors.TipoContrato && <p className='errors_forms'>{errors.TipoContrato.message}</p>}
                                    </div>

                                    <div className='container-input-error'>
                                        <input
                                            type="text"
                                            name="ciudad"
                                            className='long'
                                            placeholder='Ciudad'
                                            {...register("ciudad", CIUDAD)}
                                        />
                                        {errors.ciudad && <p className='errors_forms'>{errors.ciudad.message}</p>}
                                    </div>

                                    <div className='container-input-error'>
                                        <input
                                            type="text"
                                            name="profesion"
                                            className='long'
                                            placeholder='Profesión'
                                            {...register("profesion", PROFESION)}
                                        />
                                        {errors.profesion && <p className='errors_forms'>{errors.profesion.message}</p>}

                                    </div>

                                    <div className='container-input-error'>
                                        <textarea
                                            name="experiencia"
                                            className='long'
                                            cols="30"
                                            rows="10"
                                            placeholder='Experiencia:'
                                            {...register("experiencia", EXPERIENCIA)}
                                        ></textarea>
                                        {errors.experiencia && <p className='errors_forms'>{errors.experiencia.message}</p>}

                                    </div>


                                    <div className='container-input-error'>
                                        <div className={`Dropdown ${dropdown3.isDropdown ? 'open' : ''}`} id='widthDropdown'>
                                            <input
                                                type='text'
                                                name='Sede'
                                                className='textBox'
                                                placeholder='Sede'
                                                readOnly
                                                onClick={dropdown3.handleDropdown}
                                                value={dropdown3.selectedOption}
                                                {...register("Sede", SEDE)}
                                            />
                                            <div className={`options ${dropdown3.isDropdown ? 'open' : ''}`}>
                                                <div onClick={() => dropdown3.handleOptionClick('cbi', setValue, 'TipoDocumento')}>CBI</div>
                                                <div onClick={() => dropdown3.handleOptionClick('industrial', setValue, 'TipoDocumento')}>Industrial</div>
                                                <div onClick={() => dropdown3.handleOptionClick('ambos', setValue, 'TipoDocumento')}>Ambos</div>
                                            </div>
                                        </div>
                                        {errors.Sede && <p className='errors_forms'>{errors.Sede.message}</p>}
                                    </div>

                                </div>
                                <div className="container-btns">
                                    <button className='guardar' type="submit">Guardar</button>
                                    <button className='cancelar'>Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
