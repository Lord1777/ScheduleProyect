import React, { createContext, useState } from 'react';

const FilterScheduleInstructorContext = createContext();

export const FilterScheduleInstructorContextProvider = ({ children }) => {
  const [idTrimestre, setIdTrimestre] = useState(null);
  const [idFicha, setIdFicha] = useState(null);
  const [horasAsignadas, setHorasAsignadas] = useState(0);

  const setIdTrimestreValue = (trimestre) => {
    setIdTrimestre(trimestre);
  };

  const setIdFichaValue = (ficha) => {
    setIdFicha(ficha);
  };

  const setHorasAsignadasValue = (horasAsignadas) => {
    setHorasAsignadas(horasAsignadas);
  };

  const contextValue = {
    idTrimestre,
    idFicha,
    setIdTrimestreValue,
    setIdFichaValue,
    horasAsignadas,
    setHorasAsignadasValue, 
  };

  return (
    <FilterScheduleInstructorContext.Provider value={contextValue}>
      {children}
    </FilterScheduleInstructorContext.Provider>
  );
};

export default FilterScheduleInstructorContext;