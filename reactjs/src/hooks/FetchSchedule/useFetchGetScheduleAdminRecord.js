import React, { useState, useEffect } from 'react';
import { API_URL } from '../../const/api';
import { useNavigate } from 'react-router-dom';

const useFetchGetScheduleAdminRecord = (route, idFicha, idHorario/*setHorasAsignadasValue*/) => {

    const userToken = localStorage.getItem('access_token');

    const [dataSchedule, setDataSchedule] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const Navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await fetch(`${API_URL}${route}/${idFicha}/${idHorario}`, {
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
                } else if (response.status === 404 || result.length === 0) {
                    const result = await response.json();
                    setAlertMessage(result.error)
                    setModalOpen(true);
                }
                
            } catch (error) {
                console.log(`Error al obtener informacion del horario academico: ${error}`)
            }
            finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [/*setHorasAsignadasValue*/]);

    return {
        dataSchedule,
        loading,
        modalOpen,
        setModalOpen,
        alertMessage
    }
}

export default useFetchGetScheduleAdminRecord
