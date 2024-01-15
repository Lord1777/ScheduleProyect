// hooks/useDropdown.js
import React, { useState } from 'react';

const useDropdown = (setValue, valueKey) => {
  const [isDropdown, setIsDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setValue(valueKey, option); // Update the form value using setValue
    setIsDropdown(false); // Close the dropdown after selecting an option
  };

  return {
    isDropdown,
    handleDropdown,
    handleOptionClick,
    selectedOption,
  };
};

export default useDropdown;
