import React, { useState } from "react";
import "../../../css/Schedule/ScheduleWatch.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { Loading } from '../Loading/Loading';
import useFetchGetScheduleAmbiente from "../../hooks/FetchGET/useFetchGetScheduleAmbiente";

export const ScheduleWatchAmbiente = () => {

    const { loading, dataHorarios } = useFetchGetScheduleAmbiente();
    const [search, setSearch] = useState("");

    const filteredData = dataHorarios.filter(horario =>
        horario.ambiente.toString().includes(search)
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
            <div className="main-container">
                {filteredData.map((horario) => (
                    <Link key={horario.idAmbiente} to={`/HorarioAprendiz/${horario.idAmbiente}`}>
                        <div className="schedule">
                            <FontAwesomeIcon icon={faCalendar} className="calendar-icon" />
                            <div className="ficha-and-number">
                                <h3>Ambiente</h3>
                                <h3>{horario.ambiente}</h3>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>{/*Contenedor principal*/}
            <div className="Space"></div>
        </>
    )
}
