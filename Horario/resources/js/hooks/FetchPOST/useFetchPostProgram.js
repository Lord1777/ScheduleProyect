import React, { useState } from 'react';
import { API_URL, csrf_token } from '../../const/api';
import { getNivelDeFormacionByName } from '../useObjectMapping';
import useModal from '../useModal';
import { useNavigate } from 'react-router-dom';


const useFetchPostProgram = (route) => {

    const userToken = localStorage.getItem('access_token');

    const { isModal: successModalOpen, ShowOpenModal: openSuccessModal, ShowCloseModal: closeSuccessModal } = useModal();
    const { isModal: errorModalOpen, ShowOpenModal: openErrorModal, ShowCloseModal: closeErrorModal } = useModal();
    const [alertMessage, setAlertMessage] = useState('');
    const [ ruta , setRuta] = useState('');

    const navigate = useNavigate();

    const fetchSubmitProgram = async (nombre, duracion, nivelDeFormacion) => {

        // Nivel de formación
        let idNivelFormacion = getNivelDeFormacionByName(nivelDeFormacion);

        try {
            const response = await fetch(`${API_URL}${route}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf_token,
                    'Authorization': `Bearer ${userToken}`,
                },
                body: JSON.stringify({
                    nombre,
                    duracion,
                    idNivelFormacion
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
                setRuta('/CrudProgramas')
                openErrorModal();
            }
        } catch (error) {
            console.log(`Error Creating Program: ${error}`);
            openErrorModal();
        }
    }

    return (
        {
            fetchSubmitProgram,
            successModalOpen,
            errorModalOpen,
            closeSuccessModal,
            closeErrorModal,
            alertMessage,
            ruta
        }
    )
}

export default useFetchPostProgram
