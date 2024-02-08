import React from 'react'
import useModal from '../useModal';
import { API_URL } from '../../const/api';
import { getNivelDeFormacionByName } from '../useObjectMapping';

export const useFecthPutProgram = (id) => {

    const { isModal: successModalOpen, ShowOpenModal: openSuccessModal, ShowCloseModal: closeSuccessModal } = useModal();
    const { isModal: errorModalOpen, ShowOpenModal: openErrorModal, ShowCloseModal: closeErrorModal } = useModal();

    const fetchPutProgram = async (nombre, duracion, formacion) => {

        let idNivelFormacion = getNivelDeFormacionByName(formacion)

        try {

            const response = await fetch(`${API_URL}/UpdateProgram/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
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
            } else {
                console.error(`Error updating program: ${response.statusText}`);
                openErrorModal();
            }

        } catch (error) {
            console.error(`Error updating program: ${error}`);
            openErrorModal();
        }
    }

    return {
        fetchPutProgram,
        successModalOpen,
        errorModalOpen,
        closeSuccessModal,
        closeErrorModal,
    }
}
