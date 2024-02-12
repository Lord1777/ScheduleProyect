import React, { useState, useEffect } from 'react';
import { API_URL } from '../../const/api';
import useRequestOptionsGet from '../FetchGET/useRequestOptionsGet';


export const useFetchGetScheduleInstructor = (route, idUsuario, idTrimestre, idFicha) => {

    const { requestOptionsGet } = useRequestOptionsGet();

    const [dataSchedule, setDataSchedule] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}${route}/${idUsuario}/${idTrimestre}/${idFicha}`, requestOptionsGet)
                const result = await response.json();

                if(response.ok){
                    setDataSchedule(result);

                } else if (response.status === 404  || result.length === 0) {
                    alert(result.error);
                    setAlertMessage(result.error)
                    setModalOpen(true);
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
        loading,
        modalOpen,
        setModalOpen,
        alertMessage
    }
}
