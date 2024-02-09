import React, { useState } from 'react';
import { API_URL, csrf_token  } from '../../const/api';
import { ContinuoModal } from '../../components/Modals/ContinuoModal';


export const useFetchPostSchedule = (route) => {

    const [duplicatesBox, setDuplicatesBox] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [ succesfullyModal, setSuccesfullyModal  ] = useState(false);
    
    const [alertMessage, setAlertMessage] = useState('');


    const fetchSubmitSchedule = async({ idTrimestre, idFicha, globalStoreBoxes}) =>{
        console.log(idTrimestre, idFicha, globalStoreBoxes);
        try {
            const response = await fetch(`${API_URL}${route}`, {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf_token,
                 },
                body: JSON.stringify({
                    idTrimestre,
                    idFicha,
                    globalStoreBoxes: Array.from(globalStoreBoxes)
                })
            });

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
                console.log(data.message);
                //alert(data.message);
                setSuccesfullyModal(true);
                setAlertMessage(data.message);
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
