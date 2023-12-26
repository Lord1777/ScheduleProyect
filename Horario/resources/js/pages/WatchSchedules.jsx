import React from "react";
import { NavBar } from "../components/NavBar/NavBar";
import "../../css/WatchSchedules/WatchSchedules.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserPen, faUserSlash } from '@fortawesome/free-solid-svg-icons';
import IconSchedule from '../assets/img/IconSchedule.png'

export const WatchSchedules = () => {
  return (
    <>
      <NavBar></NavBar>
      <div className="Space"></div>{/*Espacio creado para separar el contenido*/}
      <div className="main-container">
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
        <div className="container-schedules">
          <div className="schedule1">
              <img src={IconSchedule} alt="Icono de horario" />
          </div>
        </div> {/*Contenedor de los horarios*/}
      </div>{/*Contenedor principal*/}
    </>
  );
};
