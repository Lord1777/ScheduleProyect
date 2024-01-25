import React, { useState, useEffect } from 'react';
import { API_URL } from '../../const/api';

const useFetchGetQuarters = () => {
    const [dataQuarters, setDataQuarters] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}/getQuarters`, {
                    method: "GET",
                    headers: new Headers({ 'Content-type': 'application/json' }),
                    redirect: 'follow',
                });
                const data = await response.json();
                setDataQuarters(data);
            } catch (err) {
                console.log(`Error Fetch Data: ${err}`)
            } 
        };

        fetchData();
    }, []);

    return {
        dataQuarters,
    };
};

export default useFetchGetQuarters;