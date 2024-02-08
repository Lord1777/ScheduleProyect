import React from 'react';
import { API_URL } from '../../const/api';
import { getContratoByName, getSedeByName } from '../useObjectMapping';
import useModal from '../useModal';

export const useFetchPutCoordinator = (idUsario) => {

    const { isModal: successModalOpen, ShowOpenModal: openSuccessModal, ShowCloseModal: closeSuccessModal } = useModal();
    const { isModal: errorModalOpen, ShowOpenModal: openErrorModal, ShowCloseModal: closeErrorModal } = useModal();

    const fetchPutCoordinator = async (nombreCompleto, tipoDocumento, documento, email, telefono, tipoContrato, ciudad, profesion, experiencia, sede) => {
        
        let idContrato = getContratoByName(tipoContrato);
        let idSede = getSedeByName(sede);

        try {
            const response = await fetch(`${API_URL}/UpdateCoordinator/${idUsario}`, {
                method: "PUT",
                headers: { 
                    'Content-Type': 'application/json',
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
                console.log(data.message); // Mensaje definido en Laravel
                openSuccessModal();
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
        }
    )
}
