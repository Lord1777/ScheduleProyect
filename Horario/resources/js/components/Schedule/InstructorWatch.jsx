import React from "react";
import "../../../css/Schedule/ScheduleInstructorWatch.css";
import '../../../css/Cards/CardHorarios.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { Loading } from '../Loading/Loading';
import useFetchGetScheduleInstructor from "../../hooks/FetchGET/useFetchGetScheduleInstructor";

export const InstructorWatch = () => {


    const { horarioInstructor, loading } = useFetchGetScheduleInstructor();
    console.log(horarioInstructor);

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
                    />
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="search-icon"
                    />
                </div>
            </div>{/*Titulo y buscador*/}
            <div className="contenedor">
                {horarioInstructor && horarioInstructor.map((horarios) => (
                    <Link to={`/HorarioInstructor/${horarios.idUsuario}`}>
                        <div className="card">
                            <span class="material-symbols-outlined icon">
                                calendar_month
                            </span>
                            <div className="text-car">
                                <h2>Instructor</h2>
                                <span>{horarios.nombreCompleto}</span>
                                <span>Trimestre {horarios.trimestre}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="Space"></div>
        </>
    )
}

export default InstructorWatch;