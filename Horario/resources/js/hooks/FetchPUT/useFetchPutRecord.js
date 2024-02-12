import { API_URL, csrf_token } from '../../const/api';
import useModal from '../useModal';
import { getJornadaByName, getModalidadByName } from '../useObjectMapping';

export const useFetchPutRecord = (id) => {

    const userToken = localStorage.getItem('access_token');
    
    const { isModal: successModalOpen, ShowOpenModal: openSuccessModal, ShowCloseModal: closeSuccessModal } = useModal();
    const { isModal: errorModalOpen, ShowOpenModal: openErrorModal, ShowCloseModal: closeErrorModal } = useModal();

    const fetchPutRecord = async (ficha, modalidad, jornada) => {


        let idJornada = getJornadaByName(jornada);
        let idModalidad = getModalidadByName(modalidad);

        console.log(
            `NumeroF: ${ficha},
            idModalidad: ${idModalidad},
            idJornadaAcademica: ${idJornada}`
        )

        try {
            const response = await fetch(`${API_URL}/updateRecord/${id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Cookie': csrf_token,
                    'Authorization': `Bearer ${userToken}`,
                 },
                body: JSON.stringify({
                    ficha,
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
