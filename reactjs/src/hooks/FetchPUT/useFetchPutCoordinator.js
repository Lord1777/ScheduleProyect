import React, { useState } from 'react';
import { API_URL, csrf_token } from '../../const/api';
import { getContratoByName, getSedeByName } from '../useObjectMapping';
import useModal from '../useModal';

export const useFetchPutCoordinator = (idUsuario) => {

    const userToken = localStorage.getItem('access_token');

    const { isModal: successModalOpen, ShowOpenModal: openSuccessModal, ShowCloseModal: closeSuccessModal } = useModal();
    const { isModal: errorModalOpen, ShowOpenModal: openErrorModal, ShowCloseModal: closeErrorModal } = useModal();
    const [alertMessage, setAlertMessage] = useState('');
    const [ruta, setRuta] = useState('');

    const fetchPutCoordinator = async (nombreCompleto, tipoDocumento, documento, email, telefono, tipoContrato, ciudad, profesion, experiencia, sede) => {
        
        let idContrato = getContratoByName(tipoContrato);
        let idSede = getSedeByName(sede);

        try {
            const response = await fetch(`${API_URL}/UpdateCoordinator/${idUsuario}`, {
                method: "PUT",
                headers: { 
                    'Content-Type': 'application/json',
                    // 'X-CSRF-TOKEN': csrf_token,
                    'Authorization': `Bearer ${userToken}`,
                 },
                body: JSON.stringify({
                    nombreCompleto,
                    tipoDocumento,
                    documento,
                    email,
                    telefono,
                    idContrato,
                    ciudad,
                    profesion,
                    experiencia,
                    idSede
                })
            })

            if (response.ok) {
                const data = await response.json();
                openSuccessModal();
            }
            else if (response.status === 422) {
                const data = await response.json();
                setAlertMessage(data.error)
                openErrorModal();
            }
            else if (response.status === 500) {
                const data = await response.json();
                setAlertMessage(data.error)
                setRuta('/CrudCoordinadores')
                openErrorModal();
            }

        } catch (error) {
            console.log(`Error Updating Coordinator: ${error}`);
            openErrorModal();
        }
    }
    return (
        {
            fetchPutCoordinator,
            successModalOpen,
            errorModalOpen,
            closeSuccessModal,
            closeErrorModal,
            alertMessage,
            ruta
        }
    )
}
