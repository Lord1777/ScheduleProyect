import React, { useState, useEffect } from 'react'
import { API_URL } from '../../const/api'
import useRequestOptionsGet from '../FetchGET/useRequestOptionsGet'


export const useFetchGetRecords = (route) => {

    const [dataRecords, setDataRecords] = useState([]);

    const { requestOptionsGet } = useRequestOptionsGet();

    useEffect(() => {
        const fetchData = async() =>{
            try {
                const response = await fetch(`${API_URL}${route}`, requestOptionsGet)
                const data = await response.json();
                setDataRecords(data);
            } catch (error) {
                console.log(`Error Creating Record: ${error}`)
            }
        }
        fetchData()
    }, [])

  return {
    dataRecords,
  }
}
