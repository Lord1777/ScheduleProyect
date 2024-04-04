import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ContinuoModal } from '../Modals/ContinuoModal';
import { Link } from 'react-router-dom';
import { Loading } from '../Loading/Loading';
import useDropdown from '../../hooks/useDropdown';
import useValidationForm from '../../hooks/useValidationForm';
import useFetchPostRecord from '../../hooks/FetchPOST/useFetchPostRecord';
import useFetchGetPrograms from '../../hooks/FetchGetResources/useFetchGetPrograms';
import exito from '../../assets/img/Exito.png'
import error from '../../assets/img/Advertencia.png';
import '../../../css/Form/BoxContainerFormAdd.css';
import '../../../css/Form/FormAddFicha.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


export const FormAddFicha = () => {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const dropdown1 = useDropdown(setValue, 'modalidad');
    const dropdown2 = useDropdown(setValue, 'programa');
    const dropdown3 = useDropdown(setValue, 'jornada');
    const { PROGRAMA, PROGRAMA2, NFICHA, MODALIDAD, JORNADA_ACADEMICA } = useValidationForm();
    const [searchProgram, setSearchPogram] = useState('');
    const [loading, setLoading] = useState(false);

    const {
        fetchSubmitRecord,
        successModalOpen,
        errorModalOpen,
        closeSuccessModal,
        closeErrorModal,
        alertMessage,
        ruta } = useFetchPostRecord('/createRecord');
    const { dataPrograms } = useFetchGetPrograms('/getPrograms');

    const getProgramId = (programName) => {
        const programa = dataPrograms.find((programa) => programa.nombre === programName);
        return programa ? programa.idPrograma : null
    }

    const onSubmit = async (data) => {
        setLoading(true);
        await fetchSubmitRecord(
            parseInt(data.ficha),
            getProgramId(data.programa),
            data.modalidad,
            data.jornada,
        );
        setLoading(false);
    }

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <main className='container_all_form'>
                <div className='box_form'>
                    <h2 className='title_underline'>Añadir Ficha</h2>
                    <div className='container_form_add'>
                        <form method='POST' onSubmit={handleSubmit(onSubmit)}>
                            <div className='grid-column'>
                                <div>
                                    <input type='number' name='ficha' placeholder='N° Ficha' autoComplete='off' {...register("ficha", NFICHA)} />
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
                                    <div className={`desplegable-form ${dropdown2.isDropdown ? 'open' : ''}`}>
                                        <input
                                            type='text'
                                            className='textBox'
                                            placeholder='Programa de Formación'
                                            name='programa'
                                            readOnly
                                            onClick={dropdown2.handleDropdown}
                                            value={dropdown2.selectedOption}
                                            {...register("programa", PROGRAMA2)}
                                        />
                                        <div className={`desplegable-options-form ${dropdown2.isDropdown ? 'open' : ''}`}>
                                            <div className="search-bar">
                                                <input
                                                    type="text"
                                                    className='buscador-desplegables-form'
                                                    id='buscador-form'
                                                    value={searchProgram}
                                                    onChange={(e) => setSearchPogram(e.target.value)}
                                                />
                                                <div className="icon-search-bar-form">
                                                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                                                </div>
                                            </div>

                                            <div className="contenedor-options-form">
                                                {
                                                    dataPrograms && dataPrograms.length > 0 && dataPrograms
                                                        .filter((program) =>
                                                            program.nombre.toLowerCase().startsWith(searchProgram.toLowerCase())
                                                        )
                                                        .map((program) => (
                                                            <div key={program.idPrograma} onClick={() => dropdown2.handleOptionClick(`${program.nombre}`, setValue, 'programa')}>{program.nombre}</div>
                                                        ))
                                                }
                                            </div>

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
                                <Link to={'/CrudFichas'}>
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
                route="/CrudFichas"
            />
        </>
    );
};
