import React, { useState } from 'react';
import { API_URL, csrf_token } from '../../const/api';
import useModal from '../useModal';


const useFetchPostQuarter = (route) => {

    const userToken = localStorage.getItem('access_token');

    const { isModal: successModalOpen, ShowOpenModal: openSuccessModal, ShowCloseModal: closeSuccessModal } = useModal();
    const { isModal: errorModalOpen, ShowOpenModal: openErrorModal, ShowCloseModal: closeErrorModal } = useModal();

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
            else{
                openErrorModal()
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
        }
    )
}

export default useFetchPostQuarter
