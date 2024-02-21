import React, { useState } from 'react';
import { API_URL, csrf_token } from '../../const/api';
import useModal from '../useModal';
import { useNavigate } from 'react-router-dom';


const useFetchPostQuarter = (route) => {

    const userToken = localStorage.getItem('access_token');

    const { isModal: successModalOpen, ShowOpenModal: openSuccessModal, ShowCloseModal: closeSuccessModal } = useModal();
    const { isModal: errorModalOpen, ShowOpenModal: openErrorModal, ShowCloseModal: closeErrorModal } = useModal();
    const [alertMessage, setAlertMessage] = useState('');
    const [ ruta , setRuta] = useState('');

    const navigate = useNavigate();

    const fetchSubmitQuarter = async (trimestre, fechaInicio, fechaFinal) => {

        try {
            const response = await fetch(`${API_URL}${route}`, {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf_token,
                    'Authorization': `Bearer ${userToken}`,
                 },
                body: JSON.stringify({
                    trimestre,
                    fechaInicio,
                    fechaFinal
                })
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // Mensaje definido en Laravel
                openSuccessModal();
            }
            else if (response.status === 401) {
                // Redirigir a la pantalla de Forbidden (403)
                navigate('/403-forbidden');
                return;
            }
            else if(response.status === 422){
                const data = await response.json();
                setAlertMessage(data.error)
                openErrorModal()
            }
            else if(response.status === 500){
                const data = await response.json();
                setAlertMessage(data.error)
                setRuta('/CrudTrimestres')
                openErrorModal();
            }
        } catch (err) {
            console.error(`Error Creating Quarter: ${err}`);
            openErrorModal();
        }
    }

    return (
        {
            fetchSubmitQuarter,
            successModalOpen,
            errorModalOpen,
            closeSuccessModal,
            closeErrorModal,
            alertMessage,
            ruta
        }
    )
}

export default useFetchPostQuarter
