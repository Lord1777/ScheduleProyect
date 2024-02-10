import React, { useState, useEffect, useRef } from 'react'
import useRequestOptionsGet from './useRequestOptionsGet';
import { API_URL } from '../../const/api';

const useFetchGetRecord = (route, page, search) => {

    const { requestOptionsGet } = useRequestOptionsGet();
    const [dataRecord, setDataRecord] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchDataRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}${route}?page=${page}&search=${search}`, requestOptionsGet);
                const result = await response.json();
                setDataRecord(result)
            } catch (error) {
                console.log(`Error al obtener los datos: ${error}`)
            } finally{
                setLoading(false);
            }
        }

        // Asignar la función fetchData al ref
        fetchDataRef.current = fetchData;

        fetchData();
    }, [route, page, search]);

    return {
        dataRecord,
        fetchData: () => fetchDataRef.current(), // Llamada a la función fetchData almacenada en el ref
        loading,
    }

}

export default useFetchGetRecord;