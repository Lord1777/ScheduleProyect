import React, { useState, useEffect } from 'react';
import { API_URL } from '../../const/api';

export const useFetchGetOneQuarter = (route) => {

    const userToken = localStorage.getItem('access_token');

    const [dataQuarter, setDataQuarter] = useState([]);


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
