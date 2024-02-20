import React, { useState, useEffect, useRef } from 'react'
import { API_URL } from '../../const/api';
import { useNavigate } from 'react-router-dom';

const useFetchGetEnvironment = (route, page, search) => {

    const userToken = localStorage.getItem('access_token');

    const [dataEnvironment, setDataEnvironment] = useState([]);
    const fetchDataRef = useRef(() => {});
    const [ loading, setLoading ] = useState(true);
    const Navigate = useNavigate()


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_URL}${route}?page=${page}&search=${search}`, {
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
                setDataEnvironment(result);
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


    return ({
        dataEnvironment,
        fetchData: () => fetchDataRef.current(), // Llamada a la función fetchData almacenada en el ref
        loading,
        setLoading,
    })

}

export default useFetchGetEnvironment;
