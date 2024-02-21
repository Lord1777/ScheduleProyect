import React, { createContext, useState } from 'react';

const FilterScheduleFichaContext = createContext();

export const FilterScheduleFichaContextProvider = ({ children }) => {
    // const [idBoxIndex, setIdBoxIndex] = useState(null);
    const [totalSeleccionado, setTotalSeleccionado] = useState(0);
    const [horasAsignadas, setHorasAsignadas] = useState("");
    const [manage, setManage] = useState(false);
    

    const setHorasAsignadasValue = (horasAsignadas) => {
      setHorasAsignadas(horasAsignadas);
    };

    const setTotalSeleccionadoValue = (total) => {
      setTotalSeleccionado(total);
    };

    const setManageValue = (boolean) =>{
      setManage(boolean);
    }
    
  
    
  
    return (
      <FilterScheduleFichaContext.Provider value={{  totalSeleccionado, setTotalSeleccionadoValue, horasAsignadas, setHorasAsignadasValue, manage, setManageValue }}>
        {children}
      </FilterScheduleFichaContext.Provider>
    );
  };
  
  export default FilterScheduleFichaContext;