import React, {useState, useEffect} from 'react';
import { API_URL } from '../../const/api';

const useFetchGetPrograms = (route) => {

    const userToken = localStorage.getItem('access_token');

    const [dataPrograms, setDataPrograms] = useState([]);

    useEffect(() => {
        const fetchData = async() =>{
            try {
                const response = await fetch(`${API_URL}${route}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userToken}`,
                    },
                    redirect: "follow",
                })
                const data = await response.json();
                setDataPrograms(data);

            } catch (error) {
                console.log(`Error Creating Record: ${error}`)
            }
        }
        fetchData()
    }, [])


  return {
    dataPrograms,
  }
}

export default useFetchGetPrograms
