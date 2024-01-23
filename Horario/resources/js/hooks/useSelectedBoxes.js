import React, {useState} from 'react'

const useSelectedBoxes = () => {

    const [selectedBoxes, setSelectedBoxes] = useState(new Set());

    const handleBoxClick = (index) => {
        const updatedSelectedBoxes = new Set(selectedBoxes);

        if (updatedSelectedBoxes.has(index)) {
            updatedSelectedBoxes.delete(index);
        } else {
            updatedSelectedBoxes.add(index);
        }

        setSelectedBoxes(updatedSelectedBoxes);
    };

    const resetSelectedBoxes = () => {
        setSelectedBoxes(new Set());
    };


  return {
    selectedBoxes,
    handleBoxClick,
    resetSelectedBoxes,
  }
}

export default useSelectedBoxes