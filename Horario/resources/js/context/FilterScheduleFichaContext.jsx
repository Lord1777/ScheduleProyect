import React, { createContext, useState } from 'react';

const FilterScheduleFichaContext = createContext();

export const FilterScheduleFichaContextProvider = ({ children }) => {
    const [idBoxIndex, setIdBoxIndex] = useState(null);
    // const [idFicha, setIdFicha] = useState(null);
  
    const setIdBoxIndexValue = (boxIndex) => {
        setIdBoxIndex(boxIndex);
    };
  
    // const setIdFichaValue = (ficha) => {
    //   setIdFicha(ficha);
    // };
  
    return (
      <FilterScheduleFichaContext.Provider value={{ idBoxIndex,setIdBoxIndexValue }}>
        {children}
      </FilterScheduleFichaContext.Provider>
    );
  };
  
  export default FilterScheduleFichaContext;