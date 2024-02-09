import React from "react";
import "../../../css/Schedule/ScheduleInstructorWatch.css";
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
                    />
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="search-icon"
                    />
                </div>
            </div>{/*Titulo y buscador*/}
            <div className="main-container">
                {horarioInstructor && horarioInstructor.map((horarios) => (
                    <Link to={`/HorarioInstructor/${horarios.idUsuario}`}>
                        <div className="schedule-instructor">
                            <div className="instructor-name">
                                <h3>Instructor</h3>
                                <h4>{horarios.nombreCompleto}</h4>
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