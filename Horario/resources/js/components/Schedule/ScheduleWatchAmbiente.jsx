import React, { useState } from "react";
import "../../../css/Schedule/ScheduleWatch.css";
import '../../../css/Cards/CardHorarios.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { Loading } from '../Loading/Loading';
import useFetchGetScheduleAmbiente from "../../hooks/FetchGET/useFetchGetScheduleAmbiente";
import { getAñoByDate } from "../../hooks/useObjectFunction";
import gifNoResults from '../../assets/img/no_results.gif'

export const ScheduleWatchAmbiente = () => {

    const { loading, dataHorarios } = useFetchGetScheduleAmbiente();
    const [search, setSearch] = useState("");

    const filteredData = dataHorarios.filter(horario =>
        horario.ambiente.toString().startsWith(search)
    );

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <div className="Space"></div>{/*Espacio creado para separar el contenido*/}
            <div className="title-and-search">
                <h2>Horarios Ambientes</h2>
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
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="search-icon"
                    />
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
                ) : (filteredData.map((horario, index) => (
                    <Link  key={index} to={`/HorarioAmbiente/${horario.idAmbiente}/${horario.idTrimestre}`}>
                        <div className="card">
                            <span className="material-symbols-outlined icon">
                                calendar_month
                            </span>
                            <div className="text-car">
                                <h2>Ambiente</h2>
                                <span>{horario.ambiente}</span>
                                <span>Trimestre {horario.trimestre}</span>
                                <span>Año {getAñoByDate(horario.fechaInicio)}</span>
                            </div>
                        </div>
                    </Link>
                )))}
            </div>
            
        </>
    )
}
