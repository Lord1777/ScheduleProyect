import React, { useState } from 'react'

const useTrimestreDropdown = () => {

    const [showTrimestreDropdown, setShowTrimestreDropdown] = useState(false);

    const toggleTrimestreDropdown = () => {
        setShowTrimestreDropdown(!showTrimestreDropdown);
    };

  return {
    showTrimestreDropdown,
    toggleTrimestreDropdown,
  }
}

export default useTrimestreDropdown