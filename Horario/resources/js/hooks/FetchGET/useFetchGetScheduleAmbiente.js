import React, { useState, useEffect } from 'react'
import { API_URL } from '../../const/api';

const useFetchGetScheduleAmbiente = () => {

    const [ dataHorarios, setDataHorarios] = useState([]);
    const [loading, setLoading] = useState(true);
  
      const fetchSchedule = async () => {
        try {
          const response = await fetch(`${API_URL}/getSchedulesEnvironments`);
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
          }
          const data = await response.json();
          setDataHorarios(data);
        
        } catch (error) {
          console.error("Error getting schedule:", error);
        }finally{
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchSchedule();
    }, []);

  return {
    loading,
    dataHorarios
  }
}

export default useFetchGetScheduleAmbiente