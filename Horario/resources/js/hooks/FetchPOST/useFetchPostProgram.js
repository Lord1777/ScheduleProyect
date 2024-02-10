import React from 'react';
import { API_URL, csrf_token } from '../../const/api';
import { getNivelDeFormacionByName } from '../useObjectMapping';
import useModal from '../useModal';


const useFetchPostProgram = (route) => {

    const { isModal: successModalOpen, ShowOpenModal: openSuccessModal, ShowCloseModal: closeSuccessModal } = useModal();
    const { isModal: errorModalOpen, ShowOpenModal: openErrorModal, ShowCloseModal: closeErrorModal } = useModal();

    const fetchSubmitProgram = async (nombre, duracion, nivelDeFormacion) => {

        // Nivel de formación
        let idNivelFormacion = getNivelDeFormacionByName(nivelDeFormacion);

        try {
            const response = await fetch(`${API_URL}${route}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf_token,
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
            else{
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
        }
    )
}

export default useFetchPostProgram
