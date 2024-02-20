import { useState, useEffect } from 'react'
import { API_URL } from '../../const/api'
import { useNavigate } from 'react-router-dom';

export const useFetchGetRecords = (route) => {

    const [dataRecords, setDataRecords] = useState([]);
    const Navigate = useNavigate();

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
                if (response.status === 401) {
                    // Redirigir a la pantalla de Forbidden (403)
                    Navigate('/403-forbidden');
                    return;
                }
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
