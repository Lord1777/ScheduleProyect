import React, {useState, useEffect} from 'react'
import { API_URL } from '../../const/api';
import { useNavigate } from 'react-router-dom';

export const useFetchGetCreateAndUpdateSchedule = (route, idHorario) => {

    const userToken = localStorage.getItem('access_token');

    const [dataCoordinator, setDataCoordinator] = useState([]);
    const Navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await fetch(`${API_URL}${route}/${idHorario}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + userToken,
                    },
                    redirect: "follow",
                })
                if (response.status === 401) {
                    // Redirigir a la pantalla de Forbidden (403)
                    Navigate('/403-forbidden');
                    return;
                }
                else if (response.ok) {
                    const result = await response.json();
                    setDataCoordinator(result);
                }
            } catch (error) {
                console.log(`Error al obtener informacion del horario academico: ${error}`)
            }
        }

        fetchData();
    }, []);

  return (
    {
        dataCoordinator,
    }
  )
}
