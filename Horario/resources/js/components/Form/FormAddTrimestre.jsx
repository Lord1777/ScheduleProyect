import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import '../../../css/Form/FormAddTrimestre.css';
import useFetchPostQuarter from '../../hooks/FetchPOST/useFetchPostQuarter';
import useValidationForm from '../../hooks/useValidationForm';
import { useForm, Controller } from 'react-hook-form';
import exito from '../../assets/img/Exito.png'
import error from '../../assets/img/Advertencia.png'
import { Modal } from '../Modals/Modal';
import { ContinuoModal } from '../Modals/ContinuoModal';

function FormAddTrimestre() {

    const { control, register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { N_TRIMESTRE, FECHA_INI, FECHA_FIN } = useValidationForm();

    const { fetchSubmitQuarter, successModalOpen, errorModalOpen, closeSuccessModal, closeErrorModal, } = useFetchPostQuarter('/createQuarters');

    const onSubmit = async(data) => {
        console.log(data);
        await fetchSubmitQuarter(
            data.trimestre,
            data.fechaInicio,
            data.fechaFinal,
        );
    }

    return (
        <>
            <main className='container_form_add_trimestre'>
                <div className='box_form_trimestre'>
                    <h2 className='title_underline'>Registro de Trimestre</h2>
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
                                                        placeholderText='Fecha Inicial'
                                                        popperPlacement='bottom'
                                                        selected={field.value}
                                                        onChange={(date) => {
                                                            setValue('fechaInicio', date);
                                                            field.onChange(date);
                                                        }}
                                                        className="custom-datepicker"
                                                    />
                                                    <FontAwesomeIcon icon={faCalendar} className='icon-calendar' />
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
                                            rules={{ required: 'Fecha Final es requerida' }}
                                            render={({ field }) => (
                                                <>
                                                    <DatePicker
                                                        {...field}
                                                        placeholderText='Fecha Final'
                                                        popperPlacement='bottom'
                                                        selected={field.value}
                                                        onChange={(date) => {
                                                            setValue('fechaFinal', date);
                                                            field.onChange(date);
                                                        }}
                                                        className="custom-datepicker"
                                                    />
                                                    <FontAwesomeIcon icon={faCalendar} className='icon-calendar' />
                                                </>
                                            )}
                                        />
                                    </div>
                                    {errors.fechaFinal && <p className='errors_forms'>{errors.fechaFinal.message}</p>}
                                </div>



                            </div>
                            <div className="container-btns">
                                <button className='guardar' type="submit">Guardar</button>
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
                open={errorModalOpen}
                close={closeErrorModal}
                route="/CrudInstructor"
            />
            <ContinuoModal
                tittle="¡Exito!"
                imagen={exito}
                message="Los datos se guardaron correctamente."
                open={successModalOpen}
                close={closeSuccessModal}
                route="/CrudInstructor"
            />
        </>
    );
}

export default FormAddTrimestre;
