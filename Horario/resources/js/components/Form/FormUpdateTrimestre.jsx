import React, { useState, useEffect } from 'react';
import { ContinuoModal } from '../Modals/ContinuoModal';
import { useForm, Controller } from 'react-hook-form';
import { useFetchPutQuarter } from '../../hooks/FetchPUT/useFetchPutQuarter';
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_URL, csrf_token } from '../../const/api';
import { Loading } from '../Loading/Loading';
import DatePicker from 'react-datepicker';
import useValidationForm from '../../hooks/useValidationForm';
import exito from '../../assets/img/Exito.png'
import error from '../../assets/img/Advertencia.png';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../css/Form/FormAddTrimestre.css';


export const FormUpdateTrimestre = () => {

    const userToken = localStorage.getItem('access_token');

    const { control, register, handleSubmit, setValue, formState: { errors }, getValues } = useForm();

    const { N_TRIMESTRE, FECHA_INI, FECHA_FIN } = useValidationForm();

    const { id } = useParams();
    const [trimestre, setTrimestre] = useState("");
    const [fechaIni, setFechaIni] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [loading, setLoading] = useState("");

    const { fetchPutQuarter, successModalOpen, errorModalOpen, closeSuccessModal, closeErrorModal, } = useFetchPutQuarter(id);
    const Navigate = useNavigate();

    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${API_URL}/GetTrimestre/${id}`, {
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
            setTrimestre(Data.trimestre)
            setFechaIni(Data.fechaInicio);
            setFechaFin(Data.fechaFinal)
            setValue('N_TRIMESTRE', Data.trimestre);
            setValue('fechaInicio', new Date(Data.fechaInicio));
            setValue('fechaFinal', new Date(Data.fechaFinal));
        } catch (error) {
            console.error("Error al cargar los detalles ficha:", error);
            setLoading(false);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id, setValue]);

    if (loading) {
        return <Loading />
    }

    const onSubmit = async (data) => {
        console.log(data)
        await fetchPutQuarter(
            id,
            data.N_TRIMESTRE,
            data.fechaInicio,
            data.fechaFinal,
        );
    }

    const validateFechaFinal = (fechaFinal) => {
        const fechaInicio = getValues("fechaInicio");
        return fechaFinal > fechaInicio || 'La fecha final debe ser posterior a la fecha inicial';
    };

    return (
        <>
            <main className='container_form_add_trimestre'>
                <div className='box_form_trimestre'>
                    <h2 className='title_underline'>Detalles del Trimestre</h2>
                    <div className='container_form_add'>
                        <form method='PUT' onSubmit={handleSubmit(onSubmit)} >
                            <div className='grid-column'>

                            <div className="container-label-input">
                                    <label>N° Trimestre</label>
                                    <input
                                        type="number"
                                        name="N_TRIMESTRE"
                                        placeholder='N° Trimestre'
                                        value={trimestre}
                                        {...register("N_TRIMESTRE", N_TRIMESTRE)}
                                        onChange={(e) => setTrimestre(e.target.value)}
                                    />
                                    {errors.N_TRIMESTRE && <p className='errors_forms'>{errors.N_TRIMESTRE.message}</p>}
                                </div>

                                <div className="container-label-input">
                                    <label>Fecha Inicial</label>
                                    <div className="DatePicker">
                                        <Controller
                                            control={control}
                                            name="fechaInicio"
                                            rules={FECHA_INI}
                                           
                                            render={({ field }) => (
                                                <>
                                                    <DatePicker
                                                        {...field}
                                                        //value={fechaIni}
                                                        popperPlacement='bottom'
                                                        autoComplete='off'
                                                        placeholderText='Fecha Inicial'
                                                        selected={field.value}
                                                        onChange={(date) => {
                                                            setValue('fechaInicio', date);
                                                            field.onChange(date);
                                                        }}
                                                    />
                                                </>
                                            )}
                                        />
                                    </div>
                                    {errors.fechaInicio && <p className='errors_forms'>{errors.fechaInicio.message}</p>}
                                </div>

                                <div className="container-label-input">
                                    <label>Fecha Final</label>
                                    <div className="DatePicker">
                                        <Controller
                                            control={control}
                                            name="fechaFinal"
                                            rules={{
                                                required: 'Fecha Final es requerida',
                                                validate: validateFechaFinal
                                            }}
                                            
                                            render={({ field }) => (
                                                <>
                                                    <DatePicker
                                                        {...field}
                                                        //value={fechaFin}
                                                        placeholderText='Fecha Final'
                                                        popperPlacement='bottom'
                                                        autoComplete='off'
                                                        selected={field.value}
                                                        onChange={(date) => {
                                                            setValue('fechaFinal', date);
                                                            field.onChange(date);
                                                        }}
                                                    />
                                                </>
                                            )}
                                        />
                                    </div>
                                    {errors.fechaFinal && <p className='errors_forms'>{errors.fechaFinal.message}</p>}
                                </div>

                            </div>
                            <div className="container-btns">
                                <button className='guardar' type="submit">Guardar</button>
                                <Link to={'/CrudTrimestres'}>
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
                message="Ocurrió un error al actualizar los datos. Por favor, inténtalo de nuevo."
                open={errorModalOpen}
                close={closeErrorModal}
                route="/CrudTrimestres"
            />
            <ContinuoModal
                tittle="Actualización Exitosa"
                imagen={exito}
                message="Los datos se actualizaron correctamente."
                open={successModalOpen}
                close={closeSuccessModal}
                route="/CrudTrimestres"
            />
        </>
    );
}

export default FormUpdateTrimestre;