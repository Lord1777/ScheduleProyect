import React, { useState, useEffect } from "react";
import "../../../css/Schedule/ScheduleWatch.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from "react-router-dom";
import useFetchGetSchedule from '../../hooks/FetchGET/useFetchGetSchedule';
import { Loading } from '../Loading/Loading';

export const ScheduleWatch = () => {

  const { idHorario } = useParams();
  const { horarios, loading } = useFetchGetSchedule(idHorario);

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
        {loading ? (
          <Loading />
        ) : (
          horarios.map((horario) => {
            <div key={horario.id} className="schedule">
              <FontAwesomeIcon icon={faCalendar} className="calendar-icon" />
              <Link to={`/HorarioAprendiz/${horario.id}`}>
                <div className="ficha-and-number">
                  <h2>Ficha</h2>
                  <h2>{horario.ficha}</h2>
                </div>
              </Link>
            </div>
          })
        )}
      </div>{/*Contenedor principal*/}
      <div className="Space"></div>
    </>
  );
};

export default ScheduleWatch;