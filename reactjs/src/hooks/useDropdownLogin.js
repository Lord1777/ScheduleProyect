import React, { useState } from 'react';

const useDropdown = (setValue, valueKey) => {
  const [isDropdown, setIsDropdown] = useState(false);

  const handleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  const handleOptionClick = (option, setInputValue) => {
    setInputValue(option);
    setValue(valueKey, option); // Set the form value dynamically
    setIsDropdown(false);
  };

  return {
    isDropdown,
    handleDropdown,
    handleOptionClick,
  };
};

export default useDropdown;
