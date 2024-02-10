import React, { useState } from 'react';
import { getLimiteHorasByTypeContrato, getRolByName, getContratoByName, getSedeByName } from '../useObjectMapping';
import { API_URL, csrf_token  } from '../../const/api';
import useModal from '../useModal';

const useFetchPostCoordinator = (route) => {

    const { isModal: successModalOpen, ShowOpenModal: openSuccessModal, ShowCloseModal: closeSuccessModal } = useModal();
    const { isModal: errorModalOpen, ShowOpenModal: openErrorModal, ShowCloseModal: closeErrorModal } = useModal();

    const fetchSubmitCoordinator = async (sede, tipoContrato, tipoDocumento, ciudad, documento, email, experiencia, nombreCompleto, profesion, telefono) => {

        //Rol asignado
        let idRol = getRolByName('coordinador');

        //Limite de horas semanales
        let limiteHoras = getLimiteHorasByTypeContrato(tipoContrato);

        //Id del contrato
        let idContrato = getContratoByName(tipoContrato);

        //Id de la sede
        let idSede = getSedeByName(sede);

        try {
            const response = await fetch(`${API_URL}${route}`,{
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf_token,
                 },
                body: JSON.stringify({
                    tipoDocumento,
                    ciudad,
                    documento,
                    email,
                    experiencia,
                    nombreCompleto,
                    profesion,
                    telefono,
                    limiteHoras,
                    idRol,
                    idContrato,
                    idSede,
                })
            })
            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // Mensaje definido en Laravel
                openSuccessModal();
            }
            else{
                openErrorModal();
            }
        } catch (error) {
            console.log(`Error Creating Coordinator: ${error}`)
            openErrorModal();
        }
    }

    return (
        {
            fetchSubmitCoordinator,
            successModalOpen,
            errorModalOpen,
            closeSuccessModal,
            closeErrorModal,
        }
    )
}

export default useFetchPostCoordinator
