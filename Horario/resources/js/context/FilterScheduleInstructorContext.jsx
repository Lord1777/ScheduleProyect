import React, { createContext, useState } from 'react';

const FilterScheduleInstructorContext = createContext();


export const FilterScheduleInstructorContextProvider = ({ children }) => {
  const [idTrimestre, setIdTrimestre] = useState(null);
  const [idFicha, setIdFicha] = useState(null);
  const [horasAsignadas, setHorasAsignadas] = useState(0);
  const [totalSeleccionado, setTotalSeleccionado] = useState(0);
  const [recordsColors, setRecordsColors] = useState([]);

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

  const setRecordsColorsValue = (colores) =>{
    setRecordsColors(colores);
  }

  const contextValue = {
    idTrimestre,
    idFicha, 
    horasAsignadas,
    totalSeleccionado,
    recordsColors,
    setIdTrimestreValue,
    setIdFichaValue,
    setHorasAsignadasValue, 
    setTotalSeleccionadoValue,
    setRecordsColorsValue,
  };

  return (
    <FilterScheduleInstructorContext.Provider value={contextValue}>
      {children}
    </FilterScheduleInstructorContext.Provider>
  );
};

export default FilterScheduleInstructorContext;