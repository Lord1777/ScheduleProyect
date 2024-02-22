import { useState, useEffect } from 'react';
import { API_URL } from '../../const/api';
import { useNavigate } from 'react-router-dom';

const useFetchGetSchedule = (route) => {

  const userToken = localStorage.getItem('access_token');

  // const fetchDataRef = useRef(() => {});
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}${route}`, {
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
        const result = await response.json();
        setHorarios(result);
      } catch (err) {
        console.error('Error al obtener datos:', err);
      }
      finally {
        setLoading(false);
      }
    }

    // // Asignar la función fetchData al ref
    // fetchDataRef.current = fetchData;

    fetchData();
  }, [route]);

  return {
    horarios,
    loading,
    setLoading,
    // fetchData: () => fetchDataRef.current(), // Llamada a la función fetchData almacenada en el ref
  }
};


export default useFetchGetSchedule;
