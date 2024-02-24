import {useState} from 'react'

const useSelectedBoxes = () => {

    const [selectedBoxes, setSelectedBoxes] = useState(new Set());
    const [totalHoras, setTotalHoras] = useState(0);


    const handleBoxClick = (index) => {
        const updatedSelectedBoxes = new Set(selectedBoxes);

        if (updatedSelectedBoxes.has(index)) {
            updatedSelectedBoxes.delete(index);
            setTotalHoras((prevTotal) => Math.max(prevTotal - 1, 0));
        } else {
            updatedSelectedBoxes.add(index);
            setTotalHoras((prevTotal) => prevTotal + 1);
        }

        setSelectedBoxes(updatedSelectedBoxes);
    };

    const resetSelectedBoxes = () => {
        setSelectedBoxes(new Set());
    };


  return {
    selectedBoxes,
    totalHoras,
    handleBoxClick,
    resetSelectedBoxes,
  }
}

export default useSelectedBoxes