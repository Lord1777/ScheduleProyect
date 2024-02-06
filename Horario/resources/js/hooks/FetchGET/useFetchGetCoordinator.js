import React, { useState, useEffect, useRef } from 'react';
import useRequestOptionsGet from './useRequestOptionsGet';
import { API_URL } from '../../const/api';

const useFetchGetCoordinator = (route, page, search) => {
    const { requestOptionsGet } = useRequestOptionsGet();
    const [dataCoordinator, setDataCoordinator] = useState([]);
    const fetchDataRef = useRef();
    const [loading , setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}${route}?page=${page}&search=${search}`, requestOptionsGet);
                const result = await response.json();
                setDataCoordinator(result);
            } 
            catch (err) {
                console.error('Error al obtener datos:', err);
            }
            finally {
                setLoading(false)
            }
        };

        fetchDataRef.current = fetchData;
        fetchData();
    }, [route, page, search]);

    return {
        dataCoordinator,
        fetchData: () => fetchDataRef.current(),
        loading,
    };
};


export default useFetchGetCoordinator;
