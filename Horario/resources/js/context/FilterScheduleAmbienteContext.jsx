import React, { createContext, useState } from 'react';

const FilterScheduleAmbienteContext = createContext();

export const FilterScheduleAmbienteContextProvider = ({ children }) => {
  const [horasAsignadas, setHorasAsignadas] = useState("");
  const [totalSeleccionado, setTotalSeleccionado] = useState(0);
  const [environmentColors, setEnvironmentColors] = useState([]);

  const setHorasAsignadasValue = (horasAsignadas) => {
    setHorasAsignadas(horasAsignadas);
  };

  const setTotalSeleccionadoValue = (total) => {
    setTotalSeleccionado(total);
  };

  const setEnvironmentColorsValue = (colores) =>{
    setEnvironmentColors(colores);
  }

  const contextValue = {
    horasAsignadas,
    totalSeleccionado,
    environmentColors,
    setHorasAsignadasValue, 
    setTotalSeleccionadoValue,
    setEnvironmentColorsValue,
  };

  return (
    <FilterScheduleAmbienteContext.Provider value={contextValue}>
      {children}
    </FilterScheduleAmbienteContext.Provider>
  );
};

export default FilterScheduleAmbienteContext;