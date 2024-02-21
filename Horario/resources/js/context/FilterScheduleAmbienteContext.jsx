import React, { createContext, useState } from 'react';

const FilterScheduleAmbienteContext = createContext();


export const FilterScheduleAmbienteContextProvider = ({ children }) => {
  const [horasAsignadas, setHorasAsignadas] = useState("");
  const [totalSeleccionado, setTotalSeleccionado] = useState(0);

  const setHorasAsignadasValue = (horasAsignadas) => {
    setHorasAsignadas(horasAsignadas);
  };

  const setTotalSeleccionadoValue = (total) => {
    setTotalSeleccionado(total);
  };

  const contextValue = {
    horasAsignadas,
    totalSeleccionado,
    setHorasAsignadasValue, 
    setTotalSeleccionadoValue,
  };

  return (
    <FilterScheduleAmbienteContext.Provider value={contextValue}>
      {children}
    </FilterScheduleAmbienteContext.Provider>
  );
};

export default FilterScheduleAmbienteContext;