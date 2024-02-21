import { useState, useEffect } from 'react';
import { API_URL } from '../../const/api';
import { useNavigate } from 'react-router-dom';

export const useFetchGetScheduleEnvironment = (route, idAmbiente, idTrimestre) => {

    const userToken = localStorage.getItem('access_token');

    const [dataSchedule, setDataSchedule] = useState([]);
    const [loading, setLoading] = useState(true);
    const Navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}${route}/${idAmbiente}/${idTrimestre}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userToken}`,
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
                    setDataSchedule(result);

                    // Calcular las horas asignadas
                    const totalHoras = result.reduce((total, scheduleItem) => total + (scheduleItem.horasAsignadas || 0), 0);

                    // Llamar a setHorasAsignadasValue con el valor calculado
                    setHorasAsignadasValue(totalHoras);

                } else if (response.status === 404 || result.length === 0) {
                    setAlertMessage(result.error)
                    setModalOpen(true);
                }

            } catch (error) {
                console.log(`Error al obtener la información: ${error}`)
            }
            finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [idAmbiente, idTrimestre])
    return (
        {
            dataSchedule,
            loading,
        }
    )
}
