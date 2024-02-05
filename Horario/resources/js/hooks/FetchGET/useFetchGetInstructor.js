import React, { useState, useEffect, useRef } from 'react';
import useRequestOptionsGet from './useRequestOptionsGet';
import { API_URL } from '../../const/api';

const useFetchGetInstructor = (route, page, search) => {
    const { requestOptionsGet } = useRequestOptionsGet();
    const [dataInstructor, setDataInstructor] = useState([]);
    const fetchDataRef = useRef();
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}${route}?page=${page}&search=${search}`, requestOptionsGet);
                const result = await response.json();
                setDataInstructor(result);
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

    return {
        dataInstructor,
        fetchData: () => fetchDataRef.current(), // Llamada a la función fetchData almacenada en el ref
        loading,
    };
};

export default useFetchGetInstructor;
