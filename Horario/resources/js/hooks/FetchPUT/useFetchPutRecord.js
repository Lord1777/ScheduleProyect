import { API_URL } from '../../const/api';
import useModal from '../useModal';
import { getJornadaByName, getModalidadByName } from '../useObjectMapping';
import useRequestOptionsPut from './useRequestOptionsPut';

export const useFetchPutRecord = (id) => {
    const { requestOptionsPut } = useRequestOptionsPut();
    const { isModal: successModalOpen, ShowOpenModal: openSuccessModal, ShowCloseModal: closeSuccessModal } = useModal();
    const { isModal: errorModalOpen, ShowOpenModal: openErrorModal, ShowCloseModal: closeErrorModal } = useModal();

    const fetchPutRecord = async (ficha, duracion, programa, modalidad, jornada) => {


        let idJornada = getJornadaByName(jornada);
        let idModalidad = getModalidadByName(modalidad);

        console.log(
            `NumeroF: ${ficha},
            duracion: ${duracion},
            Programa: ${programa},
            idModalidad: ${idModalidad},
            idJornadaAcademica: ${idJornada}`
        )

        try {
            const response = await fetch(`${API_URL}/updateRecord/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ficha,
                    duracion,
                    programa,
                    idModalidad,
                    idJornada
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message);
                openSuccessModal();
            } else {
                console.error(`Error updating record: ${response.statusText}`);
                openErrorModal();
            }
        } catch (error) {
            console.error(`Error updating record: ${error}`);
            openErrorModal();
        }
    };

    return {
        fetchPutRecord,
        successModalOpen,
        errorModalOpen,
        closeSuccessModal,
        closeErrorModal,
    };
};
