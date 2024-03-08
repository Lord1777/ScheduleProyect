import { useState } from 'react';

const useDropdown = (setValue, valueKey) => {
  const [isDropdown, setIsDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setValue(valueKey, option);
    setIsDropdown(false);
  };

  return {
    isDropdown,
    handleDropdown,
    handleOptionClick,
    selectedOption,
    setSelectedOption,
  };
};

export default useDropdown;
