import React, { useState, useEffect } from 'react';
import { API_URL } from '../../const/api';

const useFetchGetScheduleRecord = (route, idFicha, setHorasAsignadasValue) => {

    const [dataSchedule, setDataSchedule] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await fetch(`${API_URL}${route}/${idFicha}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
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

                setDataSchedule(result);
            } catch (error) {
                console.log(`Error al obtener informacion del horario academico: ${error}`)
            }
            finally{
                setLoading(false);
            }
        }

        fetchData();
    }, [setHorasAsignadasValue]);

    return {
        dataSchedule,
        loading, 
        modalOpen, 
        setModalOpen,
        alertMessage
    }
}

export default useFetchGetScheduleRecord
