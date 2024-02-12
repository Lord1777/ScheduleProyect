import React, { useState, useEffect } from 'react';
import { API_URL } from '../../const/api';

const useFetchGetScheduleRecord = (route, idFicha) => {

    const [dataSchedule, setDataSchedule] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await fetch(`${API_URL}${route}/${idFicha}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    redirect: "follow",
                })
                const result = await response.json();

                if(response.status === 404 || result.length === 0){
                    alert('No existe horario academico para esta ficha')
                }

                setDataSchedule(result);
            } catch (error) {
                console.log(`Error al obtener informacion del horario academico: ${error}`)
            }
            finally{
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return {
        dataSchedule,
        loading
    }
}

export default useFetchGetScheduleRecord
