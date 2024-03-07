import React, { useState } from 'react';
import { API_URL, csrf_token } from '../../const/api';


export const useFetchPutScheduleRecord = (route, idHorario) => {

    const userToken = localStorage.getItem('access_token');

    const [duplicatesBox, setDuplicatesBox] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [succesfullyModal, setSuccesfullyModal] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const fetchUpdateScheduleRecord = async ({ idTrimestre, idFicha, globalStoreBoxes }) => {

        try {
            const response = await fetch(`${API_URL}${route}/${idHorario}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    // 'X-CSRF-TOKEN': csrf_token,
                    'Authorization': `Bearer ${userToken}`,
                },
                body: JSON.stringify({
                    idTrimestre,
                    idFicha,
                    globalStoreBoxes: Array.from(globalStoreBoxes)
                })
            });

            const data = await response.json();
            if (response.status === 401) {
                // Redirigir a la pantalla de Forbidden (403)
                navigate('/403-forbidden');
                return;
            }
            else if (response.ok) {
                //console.log(data.message);
                setAlertMessage(data.message);
                setSuccesfullyModal(true);
            }
            else if (data.error) {
                //console.error('Error:', data.error);
                setModalOpen(true);
                setAlertMessage(data.message);
                if (data.duplicates) {
                    setDuplicatesBox(data.duplicates);
                }
            }

        } catch (error) {
            console.log(`Error Updating Schedule: ${error}`)
        }
    }
    return (
        {
            fetchUpdateScheduleRecord,
            duplicatesBox,
            setDuplicatesBox,
            modalOpen,
            setModalOpen,
            alertMessage,
            succesfullyModal,
            setSuccesfullyModal
        }
    )
}
