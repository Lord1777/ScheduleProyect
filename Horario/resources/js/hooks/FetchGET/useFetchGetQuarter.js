import React, { useState, useEffect, useRef } from 'react'
import useRequestOptionsGet from './useRequestOptionsGet';
import { API_URL } from '../../const/api';


export const useFetchGetQuarter = (route, page, search) => {

  const { requestOptionsGet } = useRequestOptionsGet();
  const [dataQuarter, setDataQuarter] = useState([]);
  const fetchDataRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}${route}?page=${page}&search=${search}`, requestOptionsGet);
        const result = await response.json();
        setDataQuarter(result);
      } catch (err) {
        console.error('Error al obtener datos:', err);
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
    }
  )
}

export default useFetchGetQuarter;
