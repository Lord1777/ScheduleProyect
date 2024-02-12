import React, { useState } from "react";
import "../../../css/Schedule/ScheduleWatch.css";
import '../../../css/Cards/CardHorarios.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from "react-router-dom";
import useFetchGetSchedule from '../../hooks/FetchGET/useFetchGetSchedule';
import { Loading } from '../Loading/Loading';

export const ScheduleWatch = () => {

    const { idHorario } = useParams();
    const { horarios, loading } = useFetchGetSchedule();
    const [searchFicha, setSearchFicha] = useState("");
    console.log(horarios)

    const filteredFicha = horarios.filter(horario =>
        `${horario.ficha}`.toString().startsWith(searchFicha)
    );

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <div className="Space"></div>{/*Espacio creado para separar el contenido*/}
            <div className="title-and-search">
                <h2>Horarios Académicos</h2>
                <div className="search-input">
                    <input
                        type="search"
                        name="search"
                        id="search"
                        placeholder="Buscar"
                        autoComplete="off"
                        value={searchFicha}
                        onChange={(e) => setSearchFicha(e.target.value)}
                    />
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="search-icon"
                    />
                </div>
            </div>{/*Titulo y buscador*/}

            <div className="contenedor">

                {filteredFicha.map((horario) => (
                    <Link to={`/HorarioAprendiz/${horario.idFicha}`}>
                        <div className="card">
                            <span class="material-symbols-outlined icon">
                                calendar_month
                            </span>
                            <div className="text-car">
                                <h2>Ficha</h2>
                                <span>{horario.ficha}</span>
                            </div>
                        </div>
                    </Link>
                ))}

            </div>

            {/* <div className="Space"></div> */}
        </>
    );
};

export default ScheduleWatch;
