import React, { useState } from 'react'

const useDropdown = () => {

    const [ isDropdown, setDropdown ] = useState(false);
    const [ selectedOption, setSelectedOption] = useState(''); //Estado para guardar la opción seleccionada

    const handleDropdown = () =>{
        setDropdown(!isDropdown);
    }

    const handleOptionClick = (option) =>{
        setSelectedOption(option)
        setDropdown(false) //Cierra el select
    }

  return {
    isDropdown,
    selectedOption,
    handleDropdown,
    handleOptionClick
  }
}

export default useDropdown