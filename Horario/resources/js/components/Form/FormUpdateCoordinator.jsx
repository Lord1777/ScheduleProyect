import React, { useState, useEffect } from 'react';
import { useFetchPutCoordinator } from '../../hooks/FetchPUT/useFetchPutCoordinator';
import { Loading } from '../Loading/Loading';
import { useForm } from 'react-hook-form'
import { API_URL, csrf_token } from '../../const/api';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ContinuoModal } from '../Modals/ContinuoModal';
import useValidationForm from '../../hooks/useValidationForm'
import useDropdown from "../../hooks/useDropdown";
import exito from '../../assets/img/Exito.png'
import error from '../../assets/img/Advertencia.png'
import '../../../css/Form/FormUpdateCoordinator.css'
import '../../../css/Form/DesignAddinstructor.css'


export const FormUpdateCoordinator = () => {

    const userToken = localStorage.getItem('access_token');

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

    const { fetchPutCoordinator, successModalOpen, errorModalOpen, closeErrorModal, closeSuccessModal, alertMessage, ruta } = useFetchPutCoordinator(id);
    const Navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await fetch(`${API_URL}/getCoordinator/${id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`,
                    'Cookie': csrf_token,
                },
                redirect: "follow",
            });
            if (response.status === 401) {
                // Redirigir a la pantalla de Forbidden (403)
                Navigate('/403-forbidden');
                return;
            }
            else if (!response.ok) {
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
            console.error("Error al cargar los detalles coordinador:", error);
            setLoading(false);
        }
    }
    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id, setValue]);

    const onSubmit = async (data) => {
        // console.log("Valores del formulario:", data);
        setLoading(true);
        await fetchPutCoordinator(
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
        setLoading(false);
    }

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <main className='contenedor__formAdd'>
                <div className="container__box_form">
                    <div className="title_form">
                        <h2>
                            Editar Coordinador
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
                                    value={nombre}
                                    onChange={(e) =>
                                        setNombre(e.target.value)
                                    }
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
                                            <div onClick={() => dropdown1.handleOptionClick('tarjeta identidad', setValue, 'TipoDocumento')}>Tarjeta Identidad</div>
                                            <div onClick={() => dropdown1.handleOptionClick('cedula ciudadania', setValue, 'TipoDocumento')}>Cédula Ciudadanía</div>
                                            <div onClick={() => dropdown1.handleOptionClick('cedula extrangeria', setValue, 'TipoDocumento')}>Cédula Extranjería</div>
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
                                            value={documento}
                                            onChange={(e) =>
                                                setDocumento(e.target.value)
                                            }
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
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
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
                                            value={telefono}
                                            onChange={(e) =>
                                                setTelefono(e.target.value)
                                            }
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
                                            <div onClick={() => dropdown2.handleOptionClick('contratista', setValue, 'TipoContrato')}>Contratista</div>
                                            <div onClick={() => dropdown2.handleOptionClick('planta', setValue, 'TipoContrato')}>Planta</div>
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
                                            value={ciudad}
                                            onChange={(e) =>
                                                setCiudad(e.target.value)
                                            }
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
                                            value={profesion}
                                            onChange={(e) =>
                                                setProfesion(e.target.value)
                                            }
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
                                            value={experiencia}
                                            onChange={(e) =>
                                                setExperiencia(e.target.value)
                                            }
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
                                        <div className={`opciones_form ${dropdown3.isDropdown ? 'open' : ''}`}>
                                            <div onClick={() => dropdown3.handleOptionClick('cbi', setValue, 'Sede')}>CBI</div>
                                            <div onClick={() => dropdown3.handleOptionClick('industrial', setValue, 'Sede')}>Industrial</div>
                                            <div onClick={() => dropdown3.handleOptionClick('ambos', setValue, 'Sede')}>Ambos</div>
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
                tittle="Error en la Actualización"
                imagen={error}
                message={alertMessage}
                open={errorModalOpen}
                close={closeErrorModal}
                route={ruta}
            />
            <ContinuoModal
                tittle="Actualización Exitosa"
                imagen={exito}
                message="Los datos se actualizaron correctamente."
                open={successModalOpen}
                close={closeSuccessModal}
                route="/CrudCoordinadores"
            />
        </>
    )
}
