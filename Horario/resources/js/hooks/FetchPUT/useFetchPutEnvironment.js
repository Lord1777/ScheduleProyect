import React from 'react';
import { API_URL} from '../../const/api';
import { getSedeByName, getTrueOrFalseByYesOrNot } from '../useObjectMapping';
import useModal from '../useModal';

export const useFetchPutEnvironment = (id) => {

    const { isModal: successModalOpen, ShowOpenModal: openSuccessModal, ShowCloseModal: closeSuccessModal } = useModal();
    const { isModal: errorModalOpen, ShowOpenModal: openErrorModal, ShowCloseModal: closeErrorModal } = useModal();

    const fetchPutEnvironment = async (ambiente, cantidadMesas, capacidad, cantidadComputadores, AireAcondicionadoS, TableroS, VideoBeamS, sede,) => {

        let idSede = getSedeByName(sede);
        let aireAcondicionado = getTrueOrFalseByYesOrNot(AireAcondicionadoS);
        let videoBeam = getTrueOrFalseByYesOrNot(VideoBeamS);
        let tablero = getTrueOrFalseByYesOrNot(TableroS);

        try {
            const response = await fetch(`${API_URL}/updateEnvironment/${id}`, {
                method: "PUT",
                headers: { 
                    'Content-Type': 'application/json',
                 },
                body: JSON.stringify({
                    ambiente,
                    cantidadMesas,
                    capacidad,
                    cantidadComputadores,
                    aireAcondicionado,
                    tablero,
                    videoBeam,
                    idSede,
                })
            })

            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // Mensaje definido en Laravel
                openSuccessModal();
            }

        } catch (error) {
            console.log(`Error Updating Environment: ${error}`);
            openErrorModal();
        }
    }
    return (
        {
            fetchPutEnvironment,
            successModalOpen,
            errorModalOpen,
            closeSuccessModal,
            closeErrorModal
        }
    )
}
