import React, { createContext, useState } from 'react';

const FilterScheduleInstructorContext = createContext();


export const FilterScheduleInstructorContextProvider = ({ children }) => {
  const [idTrimestre, setIdTrimestre] = useState(null);
  const [idFicha, setIdFicha] = useState(null);
  const [horasAsignadas, setHorasAsignadas] = useState("");
  const [totalSeleccionado, setTotalSeleccionado] = useState(0);

  const setIdTrimestreValue = (trimestre) => {
    setIdTrimestre(trimestre);
  };

  const setIdFichaValue = (ficha) => {
    setIdFicha(ficha);
  };

  const setHorasAsignadasValue = (horasAsignadas) => {
    setHorasAsignadas(horasAsignadas);
  };

  const setTotalSeleccionadoValue = (total) => {
    setTotalSeleccionado(total);
  };

  const contextValue = {
    idTrimestre,
    idFicha, 
    horasAsignadas,
    totalSeleccionado,
    setIdTrimestreValue,
    setIdFichaValue,
    setHorasAsignadasValue, 
    setTotalSeleccionadoValue,
  };

  return (
    <FilterScheduleInstructorContext.Provider value={contextValue}>
      {children}
    </FilterScheduleInstructorContext.Provider>
  );
};

export default FilterScheduleInstructorContext;