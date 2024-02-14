import React, { useState } from 'react'
import useModal from '../useModal';
import { API_URL, csrf_token } from '../../const/api';
import { getNivelDeFormacionByName } from '../useObjectMapping';

export const useFecthPutProgram = (id) => {

    const userToken = localStorage.getItem('access_token');

    const { isModal: successModalOpen, ShowOpenModal: openSuccessModal, ShowCloseModal: closeSuccessModal } = useModal();
    const { isModal: errorModalOpen, ShowOpenModal: openErrorModal, ShowCloseModal: closeErrorModal } = useModal();
    const [alertMessage, setAlertMessage] = useState('');
    const [ruta, setRuta] = useState('');

    const fetchPutProgram = async (nombre, duracion, formacion) => {

        let idNivelFormacion = getNivelDeFormacionByName(formacion)

        try {

            const response = await fetch(`${API_URL}/UpdateProgram/${id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Cookie': csrf_token,
                    'Authorization': `Bearer ${userToken}`,
                 },
                body: JSON.stringify({
                    nombre,
                    duracion,
                    idNivelFormacion
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message);
                openSuccessModal();
            } else if (response.status === 422) {
                const data = await response.json();
                setAlertMessage(data.error)
                openErrorModal();
            }
            else if (response.status === 500) {
                const data = await response.json();
                setAlertMessage(data.error)
                setRuta('/CrudProgramas')
                openErrorModal();
            }

        } catch (error) {
            console.error(`Error updating program: ${error}`);
        }
    }

    return {
        fetchPutProgram,
        successModalOpen,
        errorModalOpen,
        closeSuccessModal,
        closeErrorModal,
        alertMessage,
        ruta
    }
}
