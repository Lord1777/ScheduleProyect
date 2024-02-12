import React, {useState, useEffect} from 'react';
import { API_URL } from '../../const/api';

export const useFetchGetEnvironments = (route) => {

    const userToken = localStorage.getItem('access_token');

    const [dataEnvironments, setDataEnvironments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
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
                setDataEnvironments(data);
            } catch (err) {
                console.log(`Error Fetch Data: ${err}`)
            } 
        };

        fetchData();
    }, []);

  return {
    dataEnvironments,
  }
}
