import React, { useState, useEffect } from 'react';
import { API_URL } from '../../const/api';
import { useNavigate } from 'react-router-dom';

const useFetchGetScheduleRecord = (route, idFicha, setHorasAsignadasValue) => {

    const [dataSchedule, setDataSchedule] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const Navigate = useNavigate();

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

                setDataSchedule(result);
            } catch (error) {
                console.log(`Error al obtener informacion del horario academico: ${error}`)
            }
            finally {
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
