import React from 'react';
import { API_URL, csrf_token} from '../../const/api';
import { getContratoByName, getSedeByName } from '../useObjectMapping';
import useModal from '../useModal';

export const useFetchPutInstructor = (idUsuario) => {

    const userToken = localStorage.getItem('access_token');

    const { isModal: successModalOpen, ShowOpenModal: openSuccessModal, ShowCloseModal: closeSuccessModal } = useModal();
    const { isModal: errorModalOpen, ShowOpenModal: openErrorModal, ShowCloseModal: closeErrorModal } = useModal();

    const fetchPutInstructor = async (nombreCompleto, tipoDocumento, documento, email, telefono, tipoContrato, ciudad, profesion, experiencia, sede) => {

        let idContrato = getContratoByName(tipoContrato);
        let idSede = getSedeByName(sede);

        // console.log(
        //     `nombreCompleto: ${nombreCompleto},
        //     tipoDocumento: ${tipoContrato},
        //     documento: ${documento},
        //     email: ${email},
        //     telefono: ${telefono},
        //     idContrato: ${idContrato},
        //     ciudad:  ${ciudad},
        //     profesion: ${profesion},
        //     experiencia: ${experiencia},
        //     idSede: ${sede}`
        // )

        try {
            const response = await fetch(`${API_URL}/UpdateInstructor/${idUsuario}`, {
                method: "PUT",
                headers: { 
                    'Content-Type': 'application/json',
                    'Cookie': csrf_token,
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
                console.log(data.message); // Mensaje definido en Laravel
                openSuccessModal();
            }
            else {
                console.log(response.error)
                const errorData = await response.json();
                console.log(errorData); // Aquí puedes ver los detalles del error devueltos por Laravel
                openErrorModal();
            }

        } catch (error) {
            console.log(`Error Updating Instructor: ${error}`)
            openErrorModal();
        }
    }

    return (
        {
            fetchPutInstructor,
            successModalOpen,
            errorModalOpen,
            closeSuccessModal,
            closeErrorModal,
        }
    )
}
