import React, { useState } from 'react';
import { API_URL, csrf_token } from '../../const/api';
import { getContratoByName, getLimiteHorasByTypeContrato, getRolByName, getSedeByName } from '../useObjectMapping';
import useModal from '../useModal';
import { useNavigate } from 'react-router-dom';

const useFetchPostInstructor = (route) => {

    const userToken = localStorage.getItem('access_token');

    const { isModal: successModalOpen, ShowOpenModal: openSuccessModal, ShowCloseModal: closeSuccessModal } = useModal();
    const { isModal: errorModalOpen, ShowOpenModal: openErrorModal, ShowCloseModal: closeErrorModal } = useModal();
    const [alertMessage, setAlertMessage] = useState('');
    const [ruta, setRuta] = useState('');

    const navigate = useNavigate();

    const fetchSubmitInstructor = async (sede, tipoContrato, tipoDocumento, ciudad, documento, email, experiencia, nombreCompleto, profesion, telefono) => {

        //Rol asignado
        let idRol = getRolByName('instructor');

        //Limite de horas semanales
        let limiteHoras = getLimiteHorasByTypeContrato(tipoContrato);

        //Id del contrato
        let idContrato = getContratoByName(tipoContrato);

        //Id de la sede
        let idSede = getSedeByName(sede);

        try {
            const response = await fetch(`${API_URL}${route}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf_token,
                    'Authorization': `Bearer ${userToken}`,
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
            } else if (response.status === 401) {
                // Redirigir a la pantalla de Forbidden (403)
                navigate('/403-forbidden');
                return;
            } else if (response.status === 422) {
                const data = await response.json();
                setAlertMessage(data.error)
                openErrorModal()
            }
            else if (response.status === 500) {
                const data = await response.json();
                setAlertMessage(data.error)
                setRuta('/CrudInstructor')
                openErrorModal();
            }
        } catch (error) {
            console.log(`Error Creating Instructor: ${error}`);
            openErrorModal();
        }
    }


    return (
        {
            fetchSubmitInstructor,
            successModalOpen,
            errorModalOpen,
            closeSuccessModal,
            closeErrorModal,
            alertMessage,
            ruta,
        }
    )
}

export default useFetchPostInstructor
