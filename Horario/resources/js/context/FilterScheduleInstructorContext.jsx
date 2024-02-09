import React, { createContext, useState } from 'react';

const FilterScheduleInstructorContext = createContext();

export const FilterScheduleInstructorContextProvider = ({ children }) => {
  const [idTrimestre, setIdTrimestre] = useState(null);
  const [idFicha, setIdFicha] = useState(null);

  const setIdTrimestreValue = (trimestre) => {
    setIdTrimestre(trimestre);
  };

  const setIdFichaValue = (ficha) => {
    setIdFicha(ficha);
  };

  return (
    <FilterScheduleInstructorContext.Provider value={{ idTrimestre, idFicha, setIdTrimestreValue, setIdFichaValue }}>
      {children}
    </FilterScheduleInstructorContext.Provider>
  );
};

export default FilterScheduleInstructorContext;

