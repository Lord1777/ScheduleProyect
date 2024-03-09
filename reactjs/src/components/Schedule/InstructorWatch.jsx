import React, { useState } from "react";
import "../../../css/Schedule/ScheduleInstructorWatch.css";
import '../../../css/Cards/CardHorarios.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { Loading } from '../Loading/Loading';
import useFetchGetScheduleInstructor from "../../hooks/FetchGET/useFetchGetScheduleInstructor";
import { getAñoByDate } from "../../hooks/useObjectFunction";
import gifNoResults from '../../assets/img/no_results.gif'
import useDropdown from "../../hooks/useDropdown";
import { useForm } from "react-hook-form";
import useFetchGetQuarters from "../../hooks/FetchGetResources/useFetchGetQuarters";

export const InstructorWatch = () => {

    const { register, setValue } = useForm();
    const { horarioInstructor, loading } = useFetchGetScheduleInstructor('/getScheduleInstructor');
    const [search, setSearch] = useState("");
    const dropdown2 = useDropdown(setValue, "trimestres");

    const { dataQuarters } = useFetchGetQuarters('/getQuarters');

    const filteredData = horarioInstructor.filter(horario =>
        horario.nombreCompleto.toString().startsWith(search)
    );

    const getQuarterId = (dataTrimestre) => {
        const quarter = dataQuarters.find((quarter) => `${quarter.trimestre} ${quarter.fechaInicio} - ${quarter.fechaFinal}` === dataTrimestre);
        return quarter ? quarter.idTrimestre : null; // Ajustar si el ID no está presente
    }

    const handleOptionClickTrimestre = (selectedOption) => {
        console.log((getQuarterId(selectedOption)));
    }

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <div className="Space"></div>{/*Espacio creado para separar el contenido*/}

            <div className="title-and-search">
                <h2>Horarios Instructores</h2>
                <div className="search-input">
                    <input
                        type="search"
                        name="search"
                        id="search"
                        placeholder="Buscar"
                        autoComplete="off"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="content-icon-bar">
                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    </div>
                </div>

                <div className={`desplegable-trimestre-instructor ${dropdown2.isDropdown ? 'open' : ''}`}>
                        <input
                            type="text"
                            className='textBox'
                            name='trimestres'
                            placeholder='Trimestres'
                            readOnly
                            onClick={dropdown2.handleDropdown}
                            value={dropdown2.selectedOption}
                            {...register("trimestres")}
                        />
                        <div className={`desplegable-options ${dropdown2.isDropdown ? 'open' : ''}`}>
                            {dataQuarters && dataQuarters.length > 0 && dataQuarters.map((quarter) => (
                                <div key={quarter.idTrimestre} onClick={() => {
                                    dropdown2.handleOptionClick(`${quarter.trimestre} ${quarter.fechaInicio} - ${quarter.fechaFinal}`);
                                    handleOptionClickTrimestre(`${quarter.trimestre} ${quarter.fechaInicio} - ${quarter.fechaFinal}`);
                                }}>
                                    {quarter.trimestre} | {quarter.fechaInicio} - {quarter.fechaFinal}
                                </div>
                            ))}
                        </div>
                    </div>

            </div>{/*Titulo y buscador*/}
            <div className="contenedor">

                {filteredData.length === 0 || filteredData.size === 0 ? (
                    <>
                        <div className="no-results">
                            <p>No se encontraron resultados.</p>
                            <img src={gifNoResults} alt="gif" />
                        </div>

                    </>
                ) : (filteredData.map((horarios, index) => (
                    <Link key={index} to={`/HorarioAdminInstructor/${horarios.idUsuario}/${horarios.idTrimestre}`}>
                        <div className="card">
                            <span className="material-symbols-outlined icon">
                                calendar_month
                            </span>
                            <div className="text-car">
                                <h2>Instructor</h2>
                                <span>{horarios.nombreCompleto}</span>
                                <span>Trimestre {horarios.trimestre}</span>
                                <span>Año {getAñoByDate(horarios.fechaInicio)}</span>
                            </div>
                        </div>
                    </Link>
                )))}

            </div>
            <div className="Space"></div>
        </>
    )
}

export default InstructorWatch;