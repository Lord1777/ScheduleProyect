import React, { createContext, useState } from 'react';

const FilterScheduleAmbienteContext = createContext();

export const FilterScheduleAmbienteContextProvider = ({ children }) => {
  const [horasAsignadas, setHorasAsignadas] = useState("");
  const [totalSeleccionado, setTotalSeleccionado] = useState(0);
  const [environmentColors, setEnvironmentColors] = useState([]);
  const [horasAsignadasPorDia, setHorasAsignadasPorDia] = useState({
    Lunes: 0,
    Martes: 0,
    Miércoles: 0,
    Jueves: 0,
    Viernes: 0,
    Sábado: 0,
    Domingo: 0,
  });

  const setHorasAsignadasValue = (horasAsignadas) => {
    setHorasAsignadas(horasAsignadas);
  };

  const setTotalSeleccionadoValue = (total) => {
    setTotalSeleccionado(total);
  };

  const setEnvironmentColorsValue = (colores) =>{
    setEnvironmentColors(colores);
  }

  const setHorasAsignadasPorDiaValue = (newHorasAsignadasPorDia) => {
    setHorasAsignadasPorDia(newHorasAsignadasPorDia);
  }

  const contextValue = {
    horasAsignadas,
    totalSeleccionado,
    environmentColors,
    horasAsignadasPorDia,
    setHorasAsignadasValue, 
    setTotalSeleccionadoValue,
    setEnvironmentColorsValue,
    setHorasAsignadasPorDiaValue,
  };

  return (
    <FilterScheduleAmbienteContext.Provider value={contextValue}>
      {children}
    </FilterScheduleAmbienteContext.Provider>
  );
};

export default FilterScheduleAmbienteContext;