import React, { useState, useEffect } from 'react'
import { API_URL } from '../../const/api';
import { useNavigate } from 'react-router-dom';

const useFetchGetScheduleAmbiente = () => {

    const userToken = localStorage.getItem('access_token');

    const [dataHorarios, setDataHorarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const Navigate = useNavigate();

    const fetchSchedule = async () => {
        try {
            const response = await fetch(`${API_URL}/getSchedulesEnvironments`, {
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
            // if (!response.ok) {
            //   throw new Error(`Network response was not ok: ${response.statusText}`);
            // }
            const data = await response.json();
            setDataHorarios(data);
            // console.log(data.error);

        } catch (error) {
            console.error("Error getting schedule:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSchedule();
    }, []);

    return {
        loading,
        dataHorarios
    }
}

export default useFetchGetScheduleAmbiente