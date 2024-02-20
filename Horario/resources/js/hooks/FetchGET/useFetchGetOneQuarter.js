import React, { useState, useEffect } from 'react';
import { API_URL } from '../../const/api';
import { useNavigate } from 'react-router-dom';

export const useFetchGetOneQuarter = (route) => {

    const userToken = localStorage.getItem('access_token');

    const [dataQuarter, setDataQuarter] = useState([]);
    const Navigate = useNavigate()

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
                });
                if (response.status === 401) {
                    // Redirigir a la pantalla de Forbidden (403)
                    Navigate('/403-forbidden');
                    return;
                  }
                const data = await response.json();
                setDataQuarter(data);
            } catch (error) {
                console.log(`Error Getting Quarter: ${error}`)
            }
        }

        fetchData();
    }, [])

    return (
        {
            dataQuarter,
        }
    )
}
