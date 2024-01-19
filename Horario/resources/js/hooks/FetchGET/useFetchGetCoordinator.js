import React, { useState, useEffect, useRef } from 'react';
import useRequestOptionsGet from './useRequestOptionsGet';
import { API_URL } from '../../const/api';

const useFetchGetCoordinator = (route, page) => {

    const { requestOptionsGet } = useRequestOptionsGet();
    const [dataCoordinator, setDataCooordinator] = useState([]);
    const fetchDataRef = useRef();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}${route}?page=${page}`, requestOptionsGet);
                const result = await response.json();
                setDataCooordinator(result);
            } catch (err) {
                console.error('Error al obtener datos:', err);
            }
        }
        // Asignar la función fetchData al ref
        fetchDataRef.current = fetchData;
        fetchData();
    }, [route, page]);

    return (
        {
            dataCoordinator,
            fetchData: () => fetchDataRef.current(),
        }
    )
}

export default useFetchGetCoordinator;
