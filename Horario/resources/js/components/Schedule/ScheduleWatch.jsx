import React, { useState, useEffect } from "react";
import "../../../css/Schedule/ScheduleWatch.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendar } from '@fortawesome/free-solid-svg-icons';

export const ScheduleWatch = () => {

    const [fichaInfo, setFichaInfo] = useState(null);

    useEffect(() => {
        
        const fetchFichaInfo = async () => {
          try {
            
            const fichaNumber = 2560354;
    
            const response = await fetch(`/api/schedule/show/${fichaNumber}`);
            const data = await response.json();
    
            setFichaInfo(data);
          } catch (error) {
            console.error('Error fetching ficha information:', error);
          }
        };

        fetchFichaInfo();
      }, []);

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
        <div className="schedule">
          <FontAwesomeIcon icon={faCalendar} className="calendar-icon" />
          <div className="ficha-and-number">
            <h2>Ficha</h2>
            <h2> <h2>{fichaInfo ? fichaInfo.numeroFicha : 'Cargando...'}</h2></h2>
          </div>
        </div>{/*Contenedor de prueba*/}
      </div>{/*Contenedor principal*/}
      <div className="Space"></div>
    </>
  );
};

export default ScheduleWatch;