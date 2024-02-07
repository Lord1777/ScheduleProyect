import React from 'react';
import { useState } from 'react';
import '../../../css/Form/BoxContainerFormAdd.css';
import '../../../css/Form/FormAddFicha.css';
import useDropdown from '../../hooks/useDropdown';
import useValidationForm from '../../hooks/useValidationForm';
import { useForm } from 'react-hook-form';
import useFetchPostRecord from '../../hooks/FetchPOST/useFetchPostRecord';
import useFetchGetPrograms from '../../hooks/FetchGetResources/useFetchGetPrograms';
import exito from '../../assets/img/Exito.png'
import error from '../../assets/img/Advertencia.png'
import { Modal } from '../Modals/Modal';

export const FormAddFicha = () => {
    
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const dropdown1 = useDropdown(setValue, 'modalidad');
    const dropdown2 = useDropdown(setValue, 'programa');
    const dropdown3 = useDropdown(setValue, 'jornada');
    const { PROGRAMA, NFICHA, MODALIDAD, JORNADA_ACADEMICA } = useValidationForm();

    const { fetchSubmitRecord, successModalOpen, errorModalOpen, closeSuccessModal, closeErrorModal, } = useFetchPostRecord('/createRecord');
    const { dataPrograms } = useFetchGetPrograms('/getPrograms');

    const getProgramId = (programName) => {
        const programa = dataPrograms.find((programa) => programa.nombre === programName);
        return programa ? programa.idPrograma : null
    }

    const onSubmit = async(data) => {
        
        // console.log(data)
        await fetchSubmitRecord(
            parseInt(data.ficha),
            getProgramId(data.programa),
            data.modalidad,
            data.jornada,
        )
    }

    return (
        <>
            <main className='container_all_form'>
                <div className='box_form'>
                    <h2 className='title_underline'>Registro de Ficha</h2>
                    <div className='container_form_add'>
                        <form method='POST' onSubmit={handleSubmit(onSubmit)}>
                            <div className='grid-column'>
                                <div>
                                    <input type='number' name='ficha' placeholder='N° Ficha' {...register("ficha", NFICHA)} />
                                    {errors.ficha && <p className='errors_forms'>{errors.ficha.message}</p>}
                                </div>
                                
                                <div>
                                    <div className={`Dropdown ${dropdown1.isDropdown ? 'open' : ''}`}>
                                        <input
                                            type='text'
                                            className='textBox'
                                            placeholder='Modalidad'
                                            name='modalidad'
                                            readOnly
                                            onClick={dropdown1.handleDropdown}
                                            value={dropdown1.selectedOption}
                                            {...register("modalidad", MODALIDAD)}
                                        />
                                        <div className={`options ${dropdown1.isDropdown ? 'open' : ''}`}>
                                            <div onClick={() => dropdown1.handleOptionClick('Presencial', setValue, 'modalidad')}>Presencial</div>
                                            <div onClick={() => dropdown1.handleOptionClick('Virtual', setValue, 'modalidad')}>Virtual</div>
                                        </div>
                                    </div>
                                    {errors.modalidad && <p className='errors_forms'>{errors.modalidad.message}</p>}
                                </div>

                                <div>
                                    <div className={`Dropdown ${dropdown2.isDropdown ? 'open' : ''}`}>
                                        <input
                                            type='text'
                                            className='textBox'
                                            placeholder='Programa de Formación'
                                            name='programa'
                                            readOnly
                                            onClick={dropdown2.handleDropdown}
                                            value={dropdown2.selectedOption}
                                            {...register("programa", PROGRAMA)}
                                        />
                                        <div className={`options ${dropdown2.isDropdown ? 'open' : ''}`}>
                                            {
                                                dataPrograms && dataPrograms.length > 0 && dataPrograms.map((program) => (
                                                    <div key={program.idPrograma} onClick={() => dropdown2.handleOptionClick(`${program.nombre}`, setValue, 'programa')}>{program.nombre}</div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    {errors.programa && <p className='errors_forms'>{errors.programa.message}</p>}
                                </div>

                                <div>
                                    <div className={`Dropdown ${dropdown3.isDropdown ? 'open' : ''}`}>
                                        <input
                                            type='text'
                                            className='textBox'
                                            placeholder='Jornada Académica'
                                            name='jornada'
                                            readOnly
                                            onClick={dropdown3.handleDropdown}
                                            value={dropdown3.selectedOption}
                                            {...register("jornada", JORNADA_ACADEMICA)}
                                        />
                                        <div className={`options ${dropdown3.isDropdown ? 'open' : ''}`}>
                                            <div onClick={() => dropdown3.handleOptionClick('Diurna', setValue, 'jornada')}>Diurna</div>
                                            <div onClick={() => dropdown3.handleOptionClick('Nocturna', setValue, 'jornada')}>Nocturna</div>
                                        </div>
                                    </div>
                                    {errors.jornada && <p className='errors_forms'>{errors.jornada.message}</p>}
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
            <Modal
                tittle="¡Exito!"
                imagen={exito}
                message="Los datos se guardaron correctamente."
                route="CrudFichas"
                open={successModalOpen}
                close={() => {
                    closeSuccessModal();
                    ShowCloseModal();
                }}
            />
            {/* Modal de error */}
            <Modal
                tittle="¡Error!"
                imagen={error}
                message="Ocurrió un error al guardar los datos. Por favor, inténtalo de nuevo."
                route="CrudFichas"
                open={errorModalOpen}
                close={() => {
                    closeErrorModal();
                    ShowCloseModal();
                }}
            />
        </>
    );
};
