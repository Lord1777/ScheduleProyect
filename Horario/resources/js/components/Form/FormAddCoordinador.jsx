import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ContinuoModal } from '../Modals/ContinuoModal';
import { Link } from 'react-router-dom';
import { Loading } from '../Loading/Loading';
import useFetchPostCoordinator from '../../hooks/FetchPOST/useFetchPostCoordinator';
import useValidationForm from '../../hooks/useValidationForm';
import useDropdown from '../../hooks/useDropdown';
import exito from '../../assets/img/Exito.png'
import error from '../../assets/img/Advertencia.png'


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
    const [ loading, setLoading ] = useState(false);

    const { 
        fetchSubmitCoordinator, 
        successModalOpen, 
        errorModalOpen, 
        closeSuccessModal, 
        closeErrorModal, 
        alertMessage, 
        ruta } = useFetchPostCoordinator('/register');

    const onSubmit = async (data) => {
        setLoading(true);
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
        setLoading(false);
    }

    if(loading){
        return <Loading/>
    }

    return (
        <>
            {/* //FormAddCoordinador usa las mismas clases que FormAddInstructor
                //La interfaz es igual */}
            <main className='container_form_add_instructor'>
                <div className='box_form_instructor'>
                    <h2>Añadir Coordinador</h2>
                    <div className='container_form_add_elements'>
                        <div className='container_image_form_instructor'>

                            <form method='POST' onSubmit={handleSubmit(onSubmit)}>
                                <div className="grid-column-add">

                                    <div className='container-input-error'>
                                        <input
                                            type="text"
                                            name="nombreCompleto"
                                            className='long'
                                            placeholder='Nombre Completo'
                                            autoComplete='off'
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
                                            autoComplete='off'
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
                                            autoComplete='off'
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
                                            autoComplete='off'
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
                                            autoComplete='off'
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
                                            autoComplete='off'
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
                                            autoComplete='off'
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
                                                <div onClick={() => dropdown3.handleOptionClick('cbi', setValue, 'Sede')}>CBI</div>
                                                <div onClick={() => dropdown3.handleOptionClick('industrial', setValue, 'Sede')}>Industrial</div>
                                                <div onClick={() => dropdown3.handleOptionClick('ambos', setValue, 'Sede')}>Ambos</div>
                                            </div>
                                        </div>
                                        {errors.Sede && <p className='errors_forms'>{errors.Sede.message}</p>}
                                    </div>

                                </div>
                                <div className="container-btns">
                                    <button className='guardar' type="submit">Guardar</button>
                                    <Link to={'/CrudCoordinadores'}>
                                        <button className='cancelar'>Cancelar</button>
                                    </Link>

                                </div>
                            </form>
                        </div>
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
                route="/CrudCoordinadores"
            />
        </>
    )
}
