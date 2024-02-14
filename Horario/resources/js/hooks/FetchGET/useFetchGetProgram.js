import React, { useState, useEffect, useRef } from 'react';
import { API_URL } from '../../const/api';

const useFetchGetProgram = (route, page, search) => {

    const userToken = localStorage.getItem('access_token');

    const [dataProgram, setDataProgram] = useState([]);
    const fetchDataRef = useRef(() => {});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}${route}?page=${page}&search=${search}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userToken}`,
                    },
                    redirect: "follow",
                });
                const result = await response.json();
                setDataProgram(result);
            } catch (error) {
                console.error('Error al obtener datos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDataRef.current = fetchData;
        fetchData(); // Llama a fetchData al inicio
    }, [route, page, search]);

    return {
        dataProgram,
        fetchData: () => fetchDataRef.current(), // Ahora esto está fuera del efecto
        loading,
        setLoading
    };
};

export default useFetchGetProgram;
