import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ContinuoModal } from '../Modals/ContinuoModal';
import { Link } from 'react-router-dom';
import { Loading } from '../Loading/Loading';
import DatePicker from 'react-datepicker';
import useFetchPostQuarter from '../../hooks/FetchPOST/useFetchPostQuarter';
import useValidationForm from '../../hooks/useValidationForm';
import exito from '../../assets/img/Exito.png'
import error from '../../assets/img/Advertencia.png'
import 'react-datepicker/dist/react-datepicker.css';
import '../../../css/Form/FormAddTrimestre.css';

function FormAddTrimestre() {

    const { control, register, handleSubmit, setValue, formState: { errors }, getValues } = useForm();
    const { N_TRIMESTRE, FECHA_INI, FECHA_FIN } = useValidationForm();
    const [loading, setLoading] = useState(false);

    const {
        fetchSubmitQuarter,
        successModalOpen,
        errorModalOpen,
        closeSuccessModal,
        closeErrorModal,
        alertMessage,
        ruta } = useFetchPostQuarter('/createQuarters');

    const onSubmit = async (data) => {
        //console.log(data);
        setLoading(true);
        await fetchSubmitQuarter(
            data.trimestre,
            data.fechaInicio,
            data.fechaFinal,
        );
        setLoading(false);
    }

    const validateFechaFinal = (fechaFinal) => {
        const fechaInicio = getValues("fechaInicio");
        return fechaFinal > fechaInicio || 'La fecha final debe ser posterior a la fecha inicial';
    };

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <main className='container_form_add_trimestre'>
                <div className='box_form_trimestre'>
                    <h2 className='title_underline'>Añadir Trimestre</h2>
                    <div className='container_form_add'>
                        <form method='POST' onSubmit={handleSubmit(onSubmit)} >
                            <div className='grid-column'>
                                <div>
                                    <input
                                        type="number"
                                        name="trimestre"
                                        placeholder='N° Trimestre'
                                        {...register("trimestre", N_TRIMESTRE)}
                                    />
                                    {errors.trimestre && <p className='errors_forms'>{errors.trimestre.message}</p>}
                                </div>

                                <div>
                                    <div className="DatePicker">
                                        <Controller
                                            control={control}
                                            name="fechaInicio"
                                            rules={FECHA_INI}
                                            render={({ field }) => (
                                                <>
                                                    <DatePicker
                                                        {...field}
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

                                <div>
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
                route="/CrudTrimestres"
            />
        </>
    );
}

export default FormAddTrimestre;
