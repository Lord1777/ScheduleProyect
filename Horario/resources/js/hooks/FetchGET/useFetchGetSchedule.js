import { useState, useEffect } from 'react';
import { API_URL } from '../../const/api';

const useFetchGetSchedule = (idHorario) => {

  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);

    const fetchSchedule = async () => {
      try {
        const response = await fetch(`${API_URL}/getScheduleRecord/${idHorario}`);

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        setHorarios(data);
        console.log(data)

      } catch (error) {
        console.error("Error getting schedule:", error);
        setLoading(false);
      }
    };


    useEffect(() => {
        if(idHorario) {
            fetchSchedule(); 
        }
    }, [idHorario]);


  return {
    horarios,
    loading,
  };
};

export default useFetchGetSchedule;
