import { useState, useEffect } from 'react';
import { API_URL } from '../../const/api';
import { useNavigate } from 'react-router-dom';

export const useFetchGetScheduleInstructor = (route, idUsuario, idTrimestre, idFicha) => {

    const userToken = localStorage.getItem('access_token');

    const [dataSchedule, setDataSchedule] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [ ruta, setRuta ] = useState('');
    const Navigate = useNavigate();
    
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
                if (response.status === 401) {
                    // Redirigir a la pantalla de Forbidden (403)
                    Navigate('/403-forbidden');
                    return;
                }
                else if(response.ok){
                const result = await response.json();

                    setDataSchedule(result);

                } else if (response.status === 404) {
                    const result = await response.json();
                    setAlertMessage(result.error);
                    setRuta('/');
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
        alertMessage,
        ruta
    }
}
