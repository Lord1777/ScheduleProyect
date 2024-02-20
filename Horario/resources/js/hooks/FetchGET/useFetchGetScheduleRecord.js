import React, { useState, useEffect, useRef } from 'react';
import { API_URL } from '../../const/api';
import { useNavigate } from 'react-router-dom';

export const useFetchGetScheduleRecord = (idHorario) => {

    const userToken = localStorage.getItem('access_token');

    const [scheduleData, setScheduleData] = useState([]);
    const fetchDataRef = useRef(() => {});
    const [loading, setLoading] = useState(true);
    const Navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}/getScheduleRecord/${idHorario}`, {
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
                setScheduleData(result);
            } catch (err) {
                console.error('Error al obtener datos:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDataRef.current = fetchData;

        fetchData();
    }, [idHorario]);

    return {
        scheduleData,
        fetchData: () => fetchDataRef.current(), // Llamada a la función fetchData almacenada en el ref
        loading,
    };
};

export default useFetchGetScheduleRecord;