import React, { createContext, useState } from 'react';

const FilterScheduleFichaContext = createContext();

export const FilterScheduleFichaContextProvider = ({ children }) => {
  const [totalSeleccionado, setTotalSeleccionado] = useState(0);
  const [horasAsignadas, setHorasAsignadas] = useState("");
  const [manage, setManage] = useState(false);
  const [instructorColors, setInstructorColor] = useState([]);
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

  const setManageValue = (boolean) => {
    setManage(boolean);
  }

  const setInstructorColorValue = (colores) => {
    setInstructorColor(colores);
  }

  const setHorasAsignadasPorDiaValue = (newHorasAsignadasPorDia) => {
    setHorasAsignadasPorDia(newHorasAsignadasPorDia);
  }

  return (
    <FilterScheduleFichaContext.Provider value={{ totalSeleccionado, setTotalSeleccionadoValue, horasAsignadas, setHorasAsignadasValue, manage, setManageValue, instructorColors, setInstructorColorValue, horasAsignadasPorDia, setHorasAsignadasPorDiaValue }}>
      {children}
    </FilterScheduleFichaContext.Provider>
  );
};

export default FilterScheduleFichaContext;