import { useState } from 'react'

const useSelectedBoxes = (initialAsignaciones = {}) => {

    const [selectedBoxes, setSelectedBoxes] = useState(new Set());
    const [horasAsignadas, setHorasAsignadas] = useState(0);
    const [asignaciones, setAsignaciones] = useState(initialAsignaciones);


    const handleBoxClick = (index) => {
        const updatedSelectedBoxes = new Set(selectedBoxes);

        if (updatedSelectedBoxes.has(index)) {
            updatedSelectedBoxes.delete(index);
            const boxData = asignaciones[index];
            if (!boxData) {
              setHorasAsignadas((prevTotal) => Math.max(prevTotal - 1, 0));
            }
        } else {
            updatedSelectedBoxes.add(index);
            setHorasAsignadas((prevTotal) => prevTotal + 1);
        }

        setSelectedBoxes(updatedSelectedBoxes);
    };

      const resetSelectedBoxes = () => {
        setSelectedBoxes(new Set());
      };


  return {
    selectedBoxes,
    horasAsignadas,
    handleBoxClick,
    resetSelectedBoxes,
    setHorasAsignadas,
  };
};

export default useSelectedBoxes