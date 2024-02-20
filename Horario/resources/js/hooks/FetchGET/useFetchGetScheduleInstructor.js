import { useState, useEffect } from 'react';
import { API_URL } from '../../const/api';
import { useNavigate } from 'react-router-dom';

const useFetchGetScheduleInstructor = (route) => {

  const userToken = localStorage.getItem('access_token');

  const [horarioInstructor, setHorariosInstructor] = useState([]);
  const [loading, setLoading] = useState(true);
  const Navigate = useNavigate();

  const fetchScheduleInstructor = async () => {
    try {
      const response = await fetch(`${API_URL}${route}`,
        {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
          },
          redirect: "follow",
        });
        if (response.status === 401) {
          // Redirigir a la pantalla de Forbidden (403)
          Navigate('/403-forbidden');
          return;
      }
      else if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      setHorariosInstructor(data);

    } catch (error) {
      console.error("Error getting schedule:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchScheduleInstructor();
  }, []);


  return {
    horarioInstructor,
    loading,
  };
};

export default useFetchGetScheduleInstructor;
