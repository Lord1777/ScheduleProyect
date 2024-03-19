import React, { useState } from 'react';
import { API_URL, csrf_token } from '../../const/api';
import { useNavigate } from 'react-router-dom';
import useModal from '../useModal';

export const useFetchPostForgotPassword = (route) => {

    const Navigate = useNavigate();
    const { isModal: successModalOpen, ShowOpenModal: openSuccessModal, ShowCloseModal: closeSuccessModal } = useModal();
    const { isModal: errorModalOpen, ShowOpenModal: openErrorModal, ShowCloseModal: closeErrorModal } = useModal();
    const [alertMessage, setAlertMessage] = useState('');
    const [ruta, setRuta] = useState('');

    const handleForgotPassword = async (email) => {

        try {
            const response = await fetch(`${API_URL}${route}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'X-CSRF-TOKEN': csrf_token,
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                const data = await response.json();
                setAlertMessage("Hemos enviado una contraseña temporal de acceso al correo electrónico proporcionado.");
                setRuta("/")
                openSuccessModal();
                //console.log(data);
                //throw new Error('Error al solicitar restablecimiento de contraseña');
            }
            else if (response.status === 404) {
                setAlertMessage("El correo electrónico ingresado es incorrecto o no existe.");
                openErrorModal();
            }
            else if(response.status === 500){
                setAlertMessage("No hemos podido atender la solicitud para el restablecimiento de contraseña, por favor inténtelo más tarde.");
                openErrorModal();
            }
            else {
                throw new Error('Error al solicitar restablecimiento de contraseña');
            }

        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        {
            handleForgotPassword,
            successModalOpen,
            closeSuccessModal,
            errorModalOpen,
            closeErrorModal,
            alertMessage,
            ruta
        }
    )
}
