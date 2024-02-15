import { useState, useEffect } from 'react';
import { API_URL } from '../../const/api';

export const useFetchGetScheduleInstructor = (route, idUsuario, idTrimestre, idFicha, setHorasAsignadasValue) => {

    const userToken = localStorage.getItem('access_token');

    const [dataSchedule, setDataSchedule] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}${route}/${idUsuario}/${idTrimestre}/${idFicha}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + userToken,
                    },
                    redirect: "follow",
                })
                const result = await response.json();

                if(response.ok){
                    setDataSchedule(result);

                    // Calcular las horas asignadas
                    const totalHoras = result.reduce((total, scheduleItem) => total + (scheduleItem.horasAsignadas || 0), 0);

                    // Llamar a setHorasAsignadasValue con el valor calculado
                    setHorasAsignadasValue(totalHoras);

                } else if (response.status === 404  || result.length === 0) {
                    setAlertMessage(result.error)
                    setModalOpen(true);
                }

            } catch (error) {
                console.log(`Error al obtener la información: ${error}`)
            }
            finally{
                setLoading(false);
            }
        }

        fetchData();
    }, [idTrimestre, idFicha, setHorasAsignadasValue])

    return {
        dataSchedule,
        loading,
        modalOpen,
        setModalOpen,
        alertMessage
    }
}
