import React, { useState, useEffect } from 'react'
import { API_URL } from '../../const/api'
import { useNavigate } from 'react-router-dom';

const useFetchGetComparationHorarioFicha = (route, idFicha, idTrimestre) => {

    const userToken = localStorage.getItem('access_token');
    const [dataSchedule, setDataSchedule] = useState([]);
    const [loading, setLoading] = useState(false);
    const Navigate = useNavigate();
    const [alertMessage, setAlertMessage] = useState("")
    const [openErrorModal, setOpenErrorModal] = useState(false);

    useEffect(() => {

        if (idFicha && idTrimestre) {
            const fetchData = async () => {
                try {
                    setLoading(true);
                    const response = await fetch(`${API_URL}${route}/${idFicha}/${idTrimestre}`, {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${userToken}`,
                        },
                        redirect: "follow",
                    })
                    if (response.status === 401) {
                        // Redirigir a la pantalla de Forbidden (403)
                        Navigate('/403-forbidden');
                        setLoading(false);
                        return;
                    }
                    else if(response.status === 404){
                        setAlertMessage("No existe un horario academico para el ficha en el trimestre seleccionado");
                        setOpenErrorModal(true);
                        setLoading(false);
                    }
                    else if(response.ok){
                        const result = await response.json();
                        setDataSchedule(result);
                        setLoading(false);
                    }
                }
                catch (error) {
                    console.log(`Error al obtener la información: ${error}`)
                }
                finally{
                    setLoading(false);
                }
            }
            fetchData();
        }

    }, [idTrimestre])

    return {
        dataSchedule,
        loading,
        alertMessage,
        openErrorModal,
        setOpenErrorModal,
    }
}

export default useFetchGetComparationHorarioFicha