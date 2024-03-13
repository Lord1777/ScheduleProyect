import React, { useEffect, useState } from "react";
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
    const [search, setSearch] = useState("");
    const [searchTrimestre1, setSearchTrimestre1] = useState("");
    const dropdown2 = useDropdown(setValue, "trimestres");

    const { dataQuarters } = useFetchGetQuarters('/getQuarters');
    const { horarioInstructor, loading, setLoading, fetchScheduleInstructor } = useFetchGetScheduleInstructor('/getEnableScheduleInstructor');

    const filteredData = horarioInstructor.filter(horario =>
        horario.nombreCompleto.toString().startsWith(search)
    );

    const getQuarterId = (dataTrimestre) => {
        const quarter = dataQuarters.find((quarter) => `${quarter.trimestre} ${quarter.fechaInicio} - ${quarter.fechaFinal}` === dataTrimestre);
        return quarter ? quarter.idTrimestre : null; // Ajustar si el ID no está presente
    }

    const handleOptionClickTrimestre = async (selectedOption) => {
        if (selectedOption) {
            setLoading(true);
            await fetchScheduleInstructor(getQuarterId(selectedOption));
            setLoading(false);
        }
    }

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <div className="Space"></div>{/*Espacio creado para separar el contenido*/}

            <div className="title-and-search">
                <h2>Horarios Instructores</h2>
                <div className="btn-drop-search">

                    <div className={`desplegable-comparacion  ${dropdown2.isDropdown ? 'open' : ''}`} id="horariosAcademicos">
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
                        <div className={`option-drop-comparation ${dropdown2.isDropdown ? 'open' : ''}`}>
                            <div className="search-bar-comparation">
                                <input
                                    type="text"
                                    className='buscador-desplegables'
                                    id='buscador'
                                    value={searchTrimestre1}
                                    onChange={(e) => setSearchTrimestre1(e.target.value)}
                                />
                                <div className="icon-search-comparation">
                                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                                </div>
                            </div>

                            <div className="contenedor-options-comparacion">
                                {dataQuarters && dataQuarters.length > 0 && dataQuarters
                                    .filter((quarter) =>
                                        `${quarter.trimestre}`.toLowerCase().startsWith(searchTrimestre1.toLowerCase()) ||
                                        `${quarter.fechaInicio}`.toLowerCase().startsWith(searchTrimestre1.toLowerCase())
                                    )
                                    .map((quarter) => (
                                        <div key={quarter.idTrimestre} onClick={() => {
                                            dropdown2.handleOptionClick(`${quarter.trimestre} ${quarter.fechaInicio} - ${quarter.fechaFinal}`)
                                            handleOptionClickTrimestre(`${quarter.trimestre} ${quarter.fechaInicio} - ${quarter.fechaFinal}`);
                                        }}>
                                            {quarter.trimestre} | {quarter.fechaInicio} - {quarter.fechaFinal}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>

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