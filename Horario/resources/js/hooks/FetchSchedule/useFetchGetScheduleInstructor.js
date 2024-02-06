import React, { useState, useEffect } from 'react';
import { API_URL } from '../../const/api';
import useRequestOptionsGet from '../FetchGET/useRequestOptionsGet';


export const useFetchGetScheduleInstructor = (route, idUsuario) => {

    const { requestOptionsGet } = useRequestOptionsGet();

    const [dataSchedule, setDataSchedule] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}${route}/${idUsuario}`, requestOptionsGet)
                const result = await response.json();

                if (response.status === 404  || result.length === 0) {
                    alert('Estimado instructor, aun no existe un horario academico para usted');
                }

                setDataSchedule(result);
            } catch (error) {
                console.log(`Error al obtener la información: ${error}`)
            }
            finally{
                setLoading(false);
            }
        }

        fetchData();
    }, [])

    return {
        dataSchedule,
        loading
    }
}
