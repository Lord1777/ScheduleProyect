import React, { useState } from 'react'

const useDropdownUpdate = (setValue, name, initialOptions = []) => {

    const [isDropdown, setIsDropdown] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [options, setOptions] = useState(initialOptions);
  
    const handleDropdown = () => {
      setIsDropdown(!isDropdown);
    };
  
    const handleOptionClick = (option, setValue, name) => {
      setSelectedOption(option);
      setValue(name, option);
      setIsDropdown(false);
    };
  
    return {
      isDropdown,
      handleDropdown,
      handleOptionClick,
      selectedOption,
      options,
      setOptions,
    };
}

export default useDropdownUpdate