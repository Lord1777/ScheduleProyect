import React from "react";
import "../../../css/Schedule/ScheduleWatch.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from "react-router-dom";
import useFetchGetSchedule from '../../hooks/FetchGET/useFetchGetSchedule';
import { Loading } from '../Loading/Loading';

export const ScheduleWatch = () => {

  const { idHorario } = useParams();
  const { horarios, loading } = useFetchGetSchedule(idHorario);
  console.log(horarios);

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
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="search-icon"
          />
        </div>
      </div>{/*Titulo y buscador*/}
      <div className="main-container">
        {horarios && horarios.map((horario) => (
          <Link to={`/HorarioAprendiz/${horario.idFicha}`}>
            <div  className="schedule">
              <FontAwesomeIcon icon={faCalendar} className="calendar-icon" />
              <div className="ficha-and-number">
                <h3>Ficha</h3>
                <h3>{horario.ficha}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>{/*Contenedor principal*/}
      <div className="Space"></div>
    </>
  );
};

export default ScheduleWatch;