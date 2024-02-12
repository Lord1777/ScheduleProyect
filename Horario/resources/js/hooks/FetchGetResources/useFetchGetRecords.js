import React, { useState, useEffect } from 'react'
import { API_URL } from '../../const/api'

export const useFetchGetRecords = (route) => {

    const [dataRecords, setDataRecords] = useState([]);

    useEffect(() => {
        const fetchData = async() =>{
            try {
                const response = await fetch(`${API_URL}${route}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    redirect: "follow",
                })
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
