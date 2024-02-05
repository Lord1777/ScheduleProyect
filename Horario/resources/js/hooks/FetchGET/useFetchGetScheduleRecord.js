import React, { useState, useEffect, useRef } from 'react';
import useRequestOptionsGet from './useRequestOptionsGet';
import { API_URL } from '../../const/api';

export const useFetchGetScheduleRecord = (idHorario) => {
    const { requestOptionsGet } = useRequestOptionsGet();
    const [scheduleData, setScheduleData] = useState([]);
    const fetchDataRef = useRef();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}/getScheduleRecord/${idHorario}`);
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