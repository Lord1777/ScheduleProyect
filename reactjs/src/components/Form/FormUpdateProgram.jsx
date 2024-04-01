import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import useDropdown from '../../hooks/useDropdown';
import useValidationForm from '../../hooks/useValidationForm';
import exito from '../../assets/img/Exito.png'
import error from '../../assets/img/Advertencia.png'
import { Loading } from '../Loading/Loading';
import { API_URL, csrf_token } from '../../const/api';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFecthPutProgram } from '../../hooks/FetchPUT/useFecthPutProgram';
import { ContinuoModal } from '../Modals/ContinuoModal';

export const FormUpdateProgram = () => {

    const userToken = localStorage.getItem('access_token');

    const [nombrePrograma, setNombrePrograma] = useState('')
    const [duracion, setDuracion] = useState(0)
    const [nivelFormacion, setNivelFormacion] = useState(null)
    const [loading, setLoading] = useState(true);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const dropdown1 = useDropdown(setValue, 'nivelDeFormacion');
    const { DURACION, PROGRAMA, NIVEL_FORMACION } = useValidationForm();
    const { id } = useParams();

    const { fetchPutProgram,
        successModalOpen,
        errorModalOpen,
        closeSuccessModal,
        closeErrorModal,
        alertMessage,
        ruta } = useFecthPutProgram(id);
    
    const Navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await fetch(`${API_URL}/GetProgram/${id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`,
                    'Cookie': csrf_token,
                },
                redirect: "follow",
            })
            if (response.status === 401) {
                // Redirigir a la pantalla de Forbidden (403)
                Navigate('/403-forbidden');
                return;
            }
            else if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const Data = await response.json();
            setNombrePrograma(Data.nombre);
            setDuracion(Data.duracion);
            setNivelFormacion(Data.nivel);

            setValue("programa", Data.nombre);
            setValue("duracion", Data.duracion);
            setValue("nivelDeFormacion", Data.nivel)

            dropdown1.setSelectedOption(Data.nivel);
            setLoading(false);
        } catch (error) {
            console.error("Error al cargar los detalles ficha:", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id, setValue]);

    const onSubmit = async (data) => {
        setLoading(true);
        await fetchPutProgram(
            data.programa,
            data.duracion,
            data.nivelDeFormacion
        )
        setLoading(false)
    }

    if (loading) {
        return <Loading />
    };

    return (
        <>
            <main className='container_all_form'>
                <div className='box_form'>
                    <h2 className='title_underline'>Detalles del Programa</h2>
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
                                        value={nombrePrograma}
                                        onChange={(e) => setNombrePrograma(e.target.value)}
                                    />
                                    {errors.programa && <p className='errors_forms'>{errors.programa.message}</p>}
                                </div>

                                <div>
                                    <input
                                        type='number'
                                        name='duracion'
                                        placeholder='Horas de duración'
                                        {...register("duracion", DURACION)}
                                        value={duracion}
                                        onChange={(e) => setDuracion(e.target.value)}
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
                route="/CrudProgramas"
            />
        </>
    )
}
