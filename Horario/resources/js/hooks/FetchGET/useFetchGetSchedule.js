import { useState, useEffect } from 'react';
import { API_URL } from '../../const/api';

const useFetchGetSchedule = () => {

  const userToken = localStorage.getItem('access_token');

  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);

    const fetchSchedule = async () => {
      try {
        const response = await fetch(`${API_URL}/getScheduleRecord`, {
          method: "GET",
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userToken}`,
          },
          redirect: "follow",
      });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        setHorarios(data);
      
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
    horarios,
    loading,
  };
};

export default useFetchGetSchedule;
