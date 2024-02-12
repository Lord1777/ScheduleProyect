import React, { useState, useEffect, useRef } from 'react';
import { API_URL } from '../../const/api';


const useFetchGetCoordinator = (route, page, search) => {
    const userToken = localStorage.getItem('access_token');
    const [dataCoordinator, setDataCoordinator] = useState([]);
    const fetchDataRef = useRef(() => {});
    const [loading, setLoading] = useState(true);

    if (userToken) {
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch(`${API_URL}${route}?page=${page}&search=${search}`, {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${userToken}`,
                        },
                        redirect: "follow",
                    });
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
    }

    return {
        dataCoordinator,
        fetchData: () => fetchDataRef.current(),
        loading,
    };
};


export default useFetchGetCoordinator;
