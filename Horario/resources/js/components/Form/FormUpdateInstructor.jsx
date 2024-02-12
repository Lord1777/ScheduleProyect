import React, { useState, useEffect } from 'react'
import { ContinuoModal } from "../Modals/ContinuoModal";
import { useForm } from 'react-hook-form'
import { useFetchPutInstructor } from '../../hooks/FetchPUT/useFetchPutInstructor';
import { Loading } from '../Loading/Loading';
import { API_URL } from '../../const/api';
import { Link, useParams } from 'react-router-dom';
import useValidationForm from '../../hooks/useValidationForm'
import useDropdown from "../../hooks/useDropdown";
import logoSena from "../../assets/img/LogoSena.png";
import exito from '../../assets/img/Exito.png'
import error from '../../assets/img/Advertencia.png'
import '../../../css/Form/FormUpdateInstructor.css'

export const FormUpdateInstructor = () => {

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
        SEDE
    } = useValidationForm();

    const dropdown1 = useDropdown(setValue, "TipoDocumento");
    const dropdown2 = useDropdown(setValue, "TipoContrato");
    const dropdown3 = useDropdown(setValue, "Sede");
    const { id } = useParams();

    const [nombre, setNombre] = useState(null);
    const [tipoDocument, setTipoDocument] = useState(null);
    const [documento, setDocumento] = useState(null);
    const [email, setEmail] = useState(null);
    const [telefono, setTelefono] = useState(null);
    const [tipoContrato, setTipoContrato] = useState(null);
    const [ciudad, setCiudad] = useState(null);
    const [profesion, setProfesion] = useState(null);
    const [experiencia, setExperiencia] = useState(null);
    const [sede, setSede] = useState(null);
    const [loading, setLoading] = useState(true);

    const { fetchPutInstructor, successModalOpen, errorModalOpen, closeSuccessModal, closeErrorModal, } = useFetchPutInstructor(id);

    const fetchData = async () => {
        try {
            const response = await fetch(`${API_URL}/getInstructor/${id}`)
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const Data = await response.json();
            setNombre(Data.nombreCompleto)
            setTipoDocument(Data.tipoDocumento)
            setDocumento(Data.documento)
            setEmail(Data.email)
            setTelefono(Data.telefono)
            setTipoContrato(Data.tipoContrato)
            setCiudad(Data.ciudad)
            setProfesion(Data.profesion)
            setExperiencia(Data.experiencia)
            setSede(Data.sede)
            setValue("nombreCompleto", Data.nombreCompleto)
            setValue("TipoDocumento", Data.tipoDocumento)
            setValue("documento", Data.documento)
            setValue("email", Data.email)
            setValue("telefono", Data.telefono)
            setValue("TipoContrato", Data.tipoContrato)
            setValue("ciudad", Data.ciudad)
            setValue("profesion", Data.profesion)
            setValue("experiencia", Data.experiencia)
            setValue("Sede", Data.sede)
            dropdown1.setSelectedOption(Data.tipoDocumento);
            dropdown2.setSelectedOption(Data.tipoContrato);
            dropdown3.setSelectedOption(Data.sede);
            setLoading(false);
        } catch (error) {
            console.error("Error al cargar los detalles instructor:", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id,setValue]);

    if(loading){
        return <Loading/>
    }

    const onSubmit = async (data) => {
        console.log("Valores del formulario:", data);
        await fetchPutInstructor(
            data.nombreCompleto,
            data.TipoDocumento,
            data.documento,
            data.email,
            data.telefono,
            data.TipoContrato,
            data.ciudad,
            data.profesion,
            data.experiencia,
            data.Sede,
        )
    }

    return (
        <>
            <main className='container_form_update_instructor'>
                <div className='box_form_instructor_update'>
                <h3>Editar Instructor</h3>
                    <div className='container_form_update_elements'>
                        <div className='container_image_form_instructor_update'>
                            <img src={logoSena} alt='Logo SENA' />
                            <form method='PUT' onSubmit={handleSubmit(onSubmit)}>
                                <div className="grid-column-update">
                                    <div className='container-input-error-update'>
                                        <input
                                            type="text"
                                            name="nombreCompleto"
                                            className='long'
                                            placeholder='Nombre Completo'
                                            autoComplete='off'
                                            {...register("nombreCompleto", NOMBRE)}
                                            value={nombre}
                                            onChange={(e) =>
                                                setNombre(e.target.value)
                                            }
                                        />
                                        {errors.nombreCompleto && <p className='errors_forms'>{errors.nombreCompleto.message}</p>}
                                    </div>


                                    <div className='container-input-error-update'>
                                        <div className={`Dropdown ${dropdown1.isDropdown ? 'open' : ''}`} id='widthDropdown'>
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
                                            <div className={`options ${dropdown1.isDropdown ? 'open' : ''}`}>
                                                <div onClick={() => dropdown1.handleOptionClick('tarjeta identidad', setValue, 'TipoDocumento')}>Tarjeta Identidad</div>
                                                <div onClick={() => dropdown1.handleOptionClick('cedula ciudadania', setValue, 'TipoDocumento')}>Cédula Ciudadanía</div>
                                                <div onClick={() => dropdown1.handleOptionClick('cedula extrangeria', setValue, 'TipoDocumento')}>Cédula Extranjería</div>
                                            </div>
                                        </div>
                                        {errors.TipoDocumento && <p className='errors_forms'>{errors.TipoDocumento.message}</p>}
                                    </div>

                                    <div className='container-input-error-update'>
                                        <input
                                            type="number"
                                            name="documento"
                                            placeholder='Número de Documento'
                                            autoComplete='off'
                                            {...register("documento", DOCUMENTO)}
                                            value={documento}
                                            onChange={(e) =>
                                                setDocumento(e.target.value)
                                            }
                                        />
                                        {errors.documento && <p className='errors_forms'>{errors.documento.message}</p>}
                                    </div>



                                    <div className='container-input-error-update'>
                                        <input
                                            type="text"
                                            name="email"
                                            className='long'
                                            placeholder='E-mail'
                                            autoComplete='off'
                                            {...register("email", EMAIL)}
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        />
                                        {errors.email && <p className='errors_forms'>{errors.email.message}</p>}
                                    </div>

                                    <div className='container-input-error-update'>
                                        <input
                                            type="text"
                                            name="telefono"
                                            placeholder='Telefono'
                                            autoComplete='off'
                                            {...register("telefono", TELEFONO_CELULAR)}
                                            value={telefono}
                                            onChange={(e) =>
                                                setTelefono(e.target.value)
                                            }
                                        />
                                        {errors.telefono && <p className='errors_forms'>{errors.telefono.message}</p>}
                                    </div>

                                    <div className='container-input-error-update'>
                                        <div className={`Dropdown ${dropdown2.isDropdown ? 'open' : ''}`} id='widthDropdown'>
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
                                            <div className={`options ${dropdown2.isDropdown ? 'open' : ''}`}>
                                                <div onClick={() => dropdown2.handleOptionClick('contratista', setValue, 'TipoContrato')}>Contratista</div>
                                                <div onClick={() => dropdown2.handleOptionClick('planta', setValue, 'TipoContrato')}>Planta</div>
                                            </div>
                                        </div>
                                        {errors.TipoContrato && <p className='errors_forms'>{errors.TipoContrato.message}</p>}
                                    </div>

                                    <div className='container-input-error-update'>
                                        <input
                                            type="text"
                                            name="ciudad"
                                            className='long'
                                            placeholder='Ciudad'
                                            autoComplete='off'
                                            {...register("ciudad", CIUDAD)}
                                            value={ciudad}
                                            onChange={(e) =>
                                                setCiudad(e.target.value)
                                            }
                                        />
                                        {errors.ciudad && <p className='errors_forms'>{errors.ciudad.message}</p>}
                                    </div>

                                    <div className='container-input-error-update'>
                                        <input
                                            type="text"
                                            name="profesion"
                                            className='long'
                                            placeholder='Profesión'
                                            autoComplete='off'
                                            {...register("profesion", PROFESION)}
                                            value={profesion}
                                            onChange={(e) =>
                                                setProfesion(e.target.value)
                                            }
                                        />
                                        {errors.profesion && <p className='errors_forms'>{errors.profesion.message}</p>}

                                    </div>

                                    <div className='container-input-error-update'>
                                        <textarea
                                            name="experiencia"
                                            className='long'
                                            cols="30"
                                            rows="10"
                                            placeholder='Experiencia:'
                                            autoComplete='off'
                                            {...register("experiencia", EXPERIENCIA)}
                                            value={experiencia}
                                            onChange={(e) =>
                                                setExperiencia(e.target.value)
                                            }
                                        ></textarea>
                                        {errors.experiencia && <p className='errors_forms'>{errors.experiencia.message}</p>}

                                    </div>


                                    <div className='container-input-error-update'>
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
                                    <Link to={'/CrudInstructor'}>
                                        <button className='cancelar'>Cancelar</button>
                                    </Link>
                                    
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <ContinuoModal
                tittle="Error en la Actualización"
                imagen={error}
                message="Ocurrió un error al actualizar los datos. Por favor, inténtalo de nuevo."
                open={errorModalOpen}
                close={closeErrorModal}
                route="/CrudInstructor"
            />
            <ContinuoModal
                tittle="Actualización Exitosa"
                imagen={exito}
                message="Los datos se actualizaron correctamente."
                open={successModalOpen}
                close={closeSuccessModal}
                route="/CrudInstructor"
            />
        </>
    )
}
