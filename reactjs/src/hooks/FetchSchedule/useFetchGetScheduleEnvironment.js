import { useState, useEffect } from 'react';
import { API_URL } from '../../const/api';
import { useNavigate } from 'react-router-dom';

export const useFetchGetScheduleEnvironment = (route, idAmbiente, idTrimestre) => {

    const userToken = localStorage.getItem('access_token');

    const [dataSchedule, setDataSchedule] = useState([]);
    const [loading, setLoading] = useState(false);
    const Navigate = useNavigate();
    const [alertMessage, setAlertMessage] = useState("")
    const [openErrorModal, setOpenErrorModal] = useState(false);
    const [horasAsignadas, setHorasAsignadasValue] = useState(1)

    useEffect(() => {
        const fetchData = async () => {
            if (idAmbiente && idTrimestre) {
                try {
                    setLoading(true);
                    const response = await fetch(`${API_URL}${route}/${idAmbiente}/${idTrimestre}`, {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${userToken}`,
                        },
                        redirect: "follow",
                    });
                    if (response.status === 401) {
                        setLoading(false);
                        // Redirigir a la pantalla de Forbidden (403)
                        Navigate('/403-forbidden');
                        return;
                    } else if (response.ok) {
                        setLoading(false);
                        const result = await response.json();
                        setDataSchedule(result);

                        // Calcular las horas asignadas
                        const totalHoras = result.reduce((total, scheduleItem) => total + (scheduleItem.horasAsignadas || 0), 0);

                        // Llamar a setHorasAsignadasValue con el valor calculado
                        if (setHorasAsignadasValue) {
                            setHorasAsignadasValue(totalHoras);
                        }

                    } else if (response.status === 404) {
                        setLoading(false);
                        setAlertMessage("No existe un horario académico para el ambiente en el trimestre seleccionado");
                        setOpenErrorModal(true);
                    }
                } catch (error) {
                    console.log(`Error al obtener la información: ${error}`);
                    setLoading(false);
                    setOpenErrorModal(true); // Mostrar mensaje de error al usuario
                }
            }
        };

        fetchData();
    }, [idAmbiente, idTrimestre]);

    return (
        {
            dataSchedule,
            loading,
            alertMessage,
            openErrorModal,
            setOpenErrorModal,
        }
    )
}
