import React, { useState, useEffect } from 'react';
import { API_URL } from '../../const/api';

export const useFetchGetScheduleInstructor = (route, idUsuario, idTrimestre, idFicha) => {

    const userToken = localStorage.getItem('access_token');

    const [dataSchedule, setDataSchedule] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}${route}/${idUsuario}/${idTrimestre}/${idFicha}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + userToken,
                    },
                    redirect: "follow",
                })
                const result = await response.json();

                if(response.ok){
                    setDataSchedule(result);

                } else if (response.status === 404  || result.length === 0) {
                    alert(result.error);
                }

            } catch (error) {
                console.log(`Error al obtener la información: ${error}`)
            }
            finally{
                setLoading(false);
            }
        }

        fetchData();
    }, [idTrimestre, idFicha])

    return {
        dataSchedule,
        loading
    }
}
