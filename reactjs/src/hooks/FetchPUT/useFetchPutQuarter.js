import { API_URL, csrf_token  } from '../../const/api';
import useModal from '../useModal';

export const useFetchPutQuarter = () => {

    const userToken = localStorage.getItem('access_token');

    const { isModal: successModalOpen, ShowOpenModal: openSuccessModal, ShowCloseModal: closeSuccessModal } = useModal();
    const { isModal: errorModalOpen, ShowOpenModal: openErrorModal, ShowCloseModal: closeErrorModal } = useModal();

    const fetchPutQuarter = async (idTrimestre, trimestre, fechaInicio, fechaFinal) => {

        // console.log(
        //     idTrimestre,
        //     `trimestre: ${trimestre},
        //     Fecha Inicial: ${fechaInicio},
        //     Fecha Final: ${fechaFinal}`
        // )

        try {
            const response = await fetch(`${API_URL}/updateQuater/${idTrimestre}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    // 'X-CSRF-TOKEN': csrf_token,
                    'Authorization': `Bearer ${userToken}`,
                 },
                body: JSON.stringify({
                    trimestre,
                    fechaInicio,
                    fechaFinal
                }),
            })

            if (response.ok) {
                const data = await response.json();
                openSuccessModal();
            } else {
                console.error(`Error updating quater: ${response.statusText}`);
                const data = await response.json();
                openErrorModal()
            }

        } catch (error) {
            console.log(`Error Updating Quarter: ${error}`)
            openErrorModal();
        }
    }
    return (
        {
            fetchPutQuarter,
            successModalOpen,
            errorModalOpen,
            closeSuccessModal,
            closeErrorModal,
        }
    )
}
