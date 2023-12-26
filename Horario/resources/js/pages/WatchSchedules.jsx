import React from "react";
import { NavBar } from "../components/NavBar/NavBar";
import "../../css/WatchSchedules/WatchSchedules.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendar } from '@fortawesome/free-solid-svg-icons';



export const WatchSchedules = () => {

  const handleClick = (fichaNumber) => {
    console.log(`Botón de ficha ${fichaNumber} clickeado`);
  };

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
          <button className="schedule1" onClick={() => handleClick(1)}>
            <FontAwesomeIcon icon={faCalendar} className="calendar-icon" />
            <div className="ficha-and-number">
              <h2>Ficha</h2>
              <h2>2560354</h2>
            </div>
          </button>{/*Contenedor de prueba*/}
          <button className="schedule2" onClick={() => handleClick(2)}>
            <FontAwesomeIcon icon={faCalendar} className="calendar-icon" />
            <div className="ficha-and-number">
              <h2>Ficha</h2>
              <h2>2560354</h2>
            </div>
          </button>
          <button className="schedule3" onClick={() => handleClick(3)}>
            <FontAwesomeIcon icon={faCalendar} className="calendar-icon" />
            <div className="ficha-and-number">
              <h2>Ficha</h2>
              <h2>2560354</h2>
            </div>
          </button>
          <button className="schedule4" onClick={() => handleClick(4)}>
            <FontAwesomeIcon icon={faCalendar} className="calendar-icon" />
            <div className="ficha-and-number">
              <h2>Ficha</h2>
              <h2>2560354</h2>
            </div>
          </button>
        </div> {/*Contenedor de los horarios de la fichas*/}
      </div>{/*Contenedor principal*/}
    </>
  );
};
