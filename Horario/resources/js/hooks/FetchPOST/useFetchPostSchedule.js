import React, { useState } from 'react';
import { API_URL, csrf_token  } from '../../const/api';
import { ContinuoModal } from '../../components/Modals/ContinuoModal';
import { useNavigate } from 'react-router-dom';


export const useFetchPostSchedule = (route) => {

    const userToken = localStorage.getItem('access_token');

    const [duplicatesBox, setDuplicatesBox] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [ succesfullyModal, setSuccesfullyModal  ] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const navigate = useNavigate();

    const fetchSubmitSchedule = async({ idTrimestre, idFicha, globalStoreBoxes}) =>{
        try {
            const response = await fetch(`${API_URL}${route}`, {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf_token,
                    'Authorization': `Bearer ${userToken}`,
                 },
                body: JSON.stringify({
                    idTrimestre,
                    idFicha,
                    globalStoreBoxes: Array.from(globalStoreBoxes)
                })
            });

            if (response.status === 401) {
                // Redirigir a la pantalla de Forbidden (403)
                navigate('/403-forbidden');
                return;
            }

            const data = await response.json();

            if (data.error) {
                console.error('Error:', data.error);
                //alert(data.error);
                //alert(data.message);
                setModalOpen(true);
                setAlertMessage(data.message);
                if(data.duplicates){
                    setDuplicatesBox(data.duplicates);
                }
            } else {
                //alert(data.message);
                setAlertMessage(data.message);
                setSuccesfullyModal(true);
            }
        } catch (error) {
            console.log(` Error Creating Schedule: ${error}`);
        }
    }

  return (
    {
        fetchSubmitSchedule,
        setDuplicatesBox,
        duplicatesBox,
        modalOpen,
        setModalOpen,
        alertMessage,
        succesfullyModal,
        setSuccesfullyModal
    }
  )
}
