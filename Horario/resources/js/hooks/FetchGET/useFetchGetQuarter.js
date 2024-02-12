import React, { useState, useEffect, useRef } from 'react'
import { API_URL } from '../../const/api';


export const useFetchGetQuarter = (route, page, search) => {

    const userToken = localStorage.getItem('access_token');

    const [dataQuarter, setDataQuarter] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchDataRef = useRef(() => {});

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
                setDataQuarter(result);
            } catch (err) {
                console.error('Error al obtener datos:', err);
            }
            finally{
                setLoading(false);
            }
        };

        // Asignar la función fetchData al ref
        fetchDataRef.current = fetchData;

        fetchData();
    }, [route, page, search]);


    return (
        {
            dataQuarter,
            fetchData: () => fetchDataRef.current(), // Llamada a la función fetchData almacenada en el ref
            loading,
        }
    )
}

export default useFetchGetQuarter;
