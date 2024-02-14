import React, { useState, useEffect } from 'react';
import { ContinuoModal } from '../Modals/ContinuoModal';
import { useForm, Controller } from 'react-hook-form';
import { useFetchPutQuarter } from '../../hooks/FetchPUT/useFetchPutQuarter';
import { Link, useParams } from "react-router-dom";
import { API_URL, csrf_token } from '../../const/api';
import { Loading } from '../Loading/Loading';
import DatePicker from 'react-datepicker';
import useValidationForm from '../../hooks/useValidationForm';
import useDropdown from "../../hooks/useDropdown";
import exito from '../../assets/img/Exito.png'
import error from '../../assets/img/Advertencia.png';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../css/Form/FormAddTrimestre.css';


export const FormUpdateTrimestre = () => {

    const userToken = localStorage.getItem('access_token');

    const { control, register, handleSubmit, setValue, formState: { errors } } = useForm();

    const { N_TRIMESTRE, FECHA_INI, FECHA_FIN } = useValidationForm();

    const dropdown1 = useDropdown(setValue, "FECHA_INI");
    const dropdown2 = useDropdown(setValue, "FECHA_FIN");

    const { id } = useParams();
    const [trimestre, setTrimestre] = useState(null);
    const [fechaIni, setFechaIni] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);
    const [loading, setLoading] = useState(true);

    const { fetchPutQuarter, successModalOpen, errorModalOpen, closeSuccessModal, closeErrorModal, } = useFetchPutQuarter(id);

    const fetchData = async () => {
        try {
            const response = await fetch(`${API_URL}/GetTrimestre/${id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`,
                    'Cookie': csrf_token,
                },
                redirect: "follow",
            })
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const Data = await response.json();
            setFechaIni(Data.fechaInicio);
            setFechaFin(Data.fechaFinal)
            setValue('N_TRIMESTRE', Data.trimestre);
            setValue('FECHA_INI', Data.fechaIni);
            setValue('FECHA_FIN', Data.fechaFin);
            dropdown1.setSelectedOption(Data.fechaIni);
            dropdown2.setSelectedOption(Data.fechaFin);
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

    if (loading) {
        return <Loading />
    }

    const onSubmit = async (data) => {

        await fetchPutQuarter(
            id,
            data.N_TRIMESTRE,
            data.FECHA_INI,
            data.FECHA_FIN,
        );
    }

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
                                    />
                                    {errors.trimestre && <p className='errors_forms'>{errors.N_TRIMESTRE.message}</p>}
                                </div>

                                <div className="container-label-input">
                                    <label>Fecha Inicial</label>
                                    <div className="DatePicker">
                                        <Controller
                                            control={control}
                                            name="FECHA_INI"
                                            rules={FECHA_INI}
                                            render={({ field }) => (
                                                <>
                                                    <DatePicker
                                                        {...field}
                                                        placeholderText='Fecha Inicial'
                                                        value={fechaIni}
                                                        {...register("FECHA_INI", FECHA_INI)}
                                                        popperPlacement='bottom'
                                                        selected={field.value}
                                                        onChange={(date) => {
                                                            setValue('FECHA_INI', date);
                                                            setFechaIni(date);
                                                            field.onChange(date);
                                                        }}
                                                    />
                                                </>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="container-label-input">
                                    <label>Fecha Final</label>
                                    <div className="DatePicker">
                                        <Controller
                                            control={control}
                                            name="FECHA_FIN"
                                            rules={{ required: 'Fecha Final es requerida' }}
                                            render={({ field }) => (
                                                <>
                                                    <DatePicker
                                                        {...field}
                                                        placeholderText='Fecha Final'
                                                        value={fechaFin}
                                                        {...register("FECHA_FIN", FECHA_FIN)}
                                                        popperPlacement='bottom'
                                                        selected={field.value}
                                                        onChange={(date) => {
                                                            setValue('FECHA_FIN', date);
                                                            setFechaFin(date);
                                                            field.onChange(date);
                                                        }}
                                                    />
                                                </>
                                            )}
                                        />
                                    </div>
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