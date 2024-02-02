import React, { useState, useEffect } from 'react';
import { API_URL } from '../../const/api';
import useRequestOptionsGet from '../FetchGET/useRequestOptionsGet';

const useFetchGetScheduleRecord = (route, idFicha) => {

    const { requestOptionsGet } = useRequestOptionsGet();

    const [dataSchedule, setDataSchedule] = useState([]);

    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await fetch(`${API_URL}${route}/${idFicha}`, requestOptionsGet)
                const result = await response.json();

                // if(response.status === 404){
                //     alert('No existe horario academico para esta ficha')
                // }

                setDataSchedule(result);
            } catch (error) {
                console.log(`Error al obtener informacion del horario academico: ${error}`)
            }
        }

        fetchData();
    }, []);

    return {
        dataSchedule,
    }
}

export default useFetchGetScheduleRecord
