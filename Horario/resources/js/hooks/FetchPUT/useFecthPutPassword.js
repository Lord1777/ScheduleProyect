import React, { useState } from 'react'
import { API_URL, csrf_token } from '../../const/api';
import useModal from '../useModal';
import { useUser } from '../../context/UserContext';

const useFecthPutPassword = () => {

    const userToken = localStorage.getItem('access_token');
    const [loading, setLoading] = useState(false);
    const { isModal: successModalOpen, ShowOpenModal: openSuccessModal, ShowCloseModal: closeSuccessModal } = useModal();
    const { isModal: errorModalOpen, ShowOpenModal: openErrorModal, ShowCloseModal: closeErrorModal } = useModal();
    const { isModal: modalChangePasword, ShowOpenModal: openPasswordModal, ShowCloseModal: closePasswordModal } = useModal();
    const [alertMessage, setAlertMessage] = useState('');
    const [ruta, setRuta] = useState('');
    const [ rutaPanel, setRutaPanel ] = ('');

    const fetchPutPassword = async (idUsuario, password) => {

        try {

            const response = await fetch(`${API_URL}/UpdatePassword/${idUsuario}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf_token,
                    'Authorization': `Bearer ${userToken}`,
                },
                body: JSON.stringify({
                    idUsuario,
                    password
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setAlertMessage(data.message)
                openSuccessModal();
                closePasswordModal();

                // Modificar el valor de la propiedad 'sesion' a 1 en los datos del usuario
                let userData = localStorage.getItem('user_data');
                if (userData) {
                    userData = JSON.parse(userData);
                    userData.sesion = 1;
                    localStorage.setItem('user_data', JSON.stringify(userData));
                }
            }

            else if (response.status === 422) {
                setAlertMessage("La contraseña es incorrecta.")
                openErrorModal();
            }

            else if (response.status === 404) {
                setAlertMessage("Usuario no encontrado.")
                openErrorModal();
            }
            else if (response.status === 400) {
                setAlertMessage("La nueva contraseña no puede ser igual a la anterior.")
                openErrorModal();
            }
            else if (response.status === 500) {
                setAlertMessage("Ha, ocurrido un error, intentalo más tarde.")
                setRuta('/Perfil')
                setRutaPanel('/Panel')
                openErrorModal();
                closePasswordModal();
            }

        } catch (error) {
            console.error(`Error updating password: ${error}`);
        }
    }

    return {
        fetchPutPassword,
        loading,
        setLoading,
        closeSuccessModal,
        successModalOpen,
        closeErrorModal,
        errorModalOpen,
        alertMessage,
        ruta,
        openPasswordModal,
        closePasswordModal,
        modalChangePasword,
        rutaPanel
    }
}

export default useFecthPutPassword