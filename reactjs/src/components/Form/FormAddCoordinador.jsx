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
import '../../../css/Form/DesignAddinstructor.css'


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
    const [loading, setLoading] = useState(false);

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

    if (loading) {
        return <Loading />
    }

    return (
        <>
            {/* //FormAddCoordinador usa las mismas clases que FormAddInstructor
                //La interfaz es igual */}
            <main className='contenedor__formAdd'>
                <div className="container__box_form">
                    <div className="title_form">
                        <h2>
                            Agregar Coordinador
                        </h2>
                    </div>

                    <div className="container_form_instructor">
                        <form method='POST' onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <input
                                    type="text"
                                    name="nombreCompleto"
                                    className='input-large'
                                    placeholder='Nombre Completo'
                                    autoComplete='off'
                                    {...register("nombreCompleto", NOMBRE)}
                                />
                                {errors.nombreCompleto && <p className='errors_forms'>{errors.nombreCompleto.message}</p>}
                            </div>

                            <div className="contenedor_two_inputs">
                                <div>
                                    <div className={`Desplegable__form ${dropdown1.isDropdown ? 'open' : ''}`}>
                                        <input
                                            type='text'
                                            name='tipoDocumento'
                                            className='textBox'
                                            placeholder='Tipo de Documento'
                                            readOnly
                                            onClick={dropdown1.handleDropdown}
                                            value={dropdown1.selectedOption}
                                            {...register("TipoDocumento", TIPO_DOCUMENTO)}
                                        />
                                        <div className={`opciones_form ${dropdown1.isDropdown ? 'open' : ''}`}>
                                            <div onClick={() => dropdown1.handleOptionClick('Tarjeta Identidad', setValue, 'TipoDocumento')}>Tarjeta Identidad</div>
                                            <div onClick={() => dropdown1.handleOptionClick('Cedula Ciudadania', setValue, 'TipoDocumento')}>Cedula Ciudadanía</div>
                                            <div onClick={() => dropdown1.handleOptionClick('Cedula Extrangeria', setValue, 'TipoDocumento')}>Cedula Extranjería</div>
                                        </div>
                                    </div>
                                    {errors.TipoDocumento && <p className='errors_forms'>{errors.TipoDocumento.message}</p>}
                                </div>

                                <div>
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

                            </div>

                            <div>
                                <input
                                    type="text"
                                    name="email"
                                    className='input-large'
                                    placeholder='E-mail'
                                    autoComplete='off'
                                    {...register("email", EMAIL)}
                                />
                                {errors.email && <p className='errors_forms'>{errors.email.message}</p>}
                            </div>

                            <div className="contenedor_two_inputs">
                                <div>
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

                                <div>
                                    <div className={`Desplegable__form ${dropdown2.isDropdown ? 'open' : ''}`}>
                                        <input
                                            type='text'
                                            name='contrato'
                                            className='textBox'
                                            placeholder='Tipo de Contrato'
                                            readOnly
                                            onClick={dropdown2.handleDropdown}
                                            value={dropdown2.selectedOption}
                                            {...register("TipoContrato", TIPO_CONTRATO)}
                                        />
                                        <div className={`opciones_form ${dropdown2.isDropdown ? 'open' : ''}`}>
                                            <div onClick={() => dropdown2.handleOptionClick('Contratista', setValue, 'TipoContrato')}>Contratista</div>
                                            <div onClick={() => dropdown2.handleOptionClick('Planta', setValue, 'TipoContrato')}>Planta</div>
                                        </div>
                                    </div>
                                    {errors.TipoContrato && <p className='errors_forms'>{errors.TipoContrato.message}</p>}
                                </div>

                            </div>

                            <div>
                                <input
                                    type="text"
                                    name="ciudad"
                                    className='input-large'
                                    placeholder='Ciudad'
                                    autoComplete='off'
                                    {...register("ciudad", CIUDAD)}
                                />
                                {errors.ciudad && <p className='errors_forms'>{errors.ciudad.message}</p>}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    name="profesion"
                                    className='input-large'
                                    placeholder='Profesión'
                                    autoComplete='off'
                                    {...register("profesion", PROFESION)}
                                />
                                {errors.profesion && <p className='errors_forms'>{errors.profesion.message}</p>}
                            </div>

                            <div>
                                <textarea
                                    name="experiencia"
                                    className='textArea'
                                    cols="30"
                                    rows="10"
                                    placeholder='Experiencia:'
                                    autoComplete='off'
                                    {...register("experiencia", EXPERIENCIA)}
                                ></textarea>
                                {errors.experiencia && <p className='errors_forms'>{errors.experiencia.message}</p>}
                            </div>

                            <div className="contenedor_two_inputs">
                                <div>
                                    <div className={`Desplegable__form ${dropdown3.isDropdown ? 'open' : ''}`}>
                                        <input
                                            type='text'
                                            name='sede'
                                            className='textBox'
                                            placeholder='Sede'
                                            readOnly
                                            onClick={dropdown3.handleDropdown}
                                            value={dropdown3.selectedOption}
                                            {...register("Sede", SEDE)}
                                        />
                                        <div className={`opciones_form ${dropdown3.isDropdown ? 'open' : ''}`} id='dropdown-form-sede'>
                                            <div onClick={() => dropdown3.handleOptionClick('Cbi', setValue, 'Sede')}>Cbi</div>
                                            <div onClick={() => dropdown3.handleOptionClick('Industrial', setValue, 'Sede')}>Industrial</div>
                                            <div onClick={() => dropdown3.handleOptionClick('Ambos', setValue, 'Sede')}>Ambos</div>
                                        </div>
                                    </div>
                                    {errors.Sede && <p className='errors_forms'>{errors.Sede.message}</p>}
                                </div>

                                <div className="btns-form">
                                    <button className='guardar' type="submit">Guardar</button>
                                    <Link to={'/CrudCoordinadores'}>
                                        <button className='cancelar'>Cancelar</button>
                                    </Link>
                                </div>
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
                route="/CrudCoordinadores"
            />
        </>
    )
}
