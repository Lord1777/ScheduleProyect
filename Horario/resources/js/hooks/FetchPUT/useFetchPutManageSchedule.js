import { useState } from 'react'
import { API_URL, csrf_token } from '../../const/api';
import useModal from '../useModal';

export const useFetchPutManageSchedule = () => {

    const { isModal: successModalOpen, ShowOpenModal: openSuccessModal, ShowCloseModal: closeSuccessModal } = useModal();
    const { isModal: errorModalOpen, ShowOpenModal: openErrorModal, ShowCloseModal: closeErrorModal } = useModal();
    const [alertMessage, setAlertMessage] = useState('');
    const userToken = localStorage.getItem('access_token');

    const fetchManageSchedule = async(route, idHorario) => {

        try {
            const response = await fetch(`${API_URL}${route}/${idHorario}`, {
                method: "PUT",
                headers: { 
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf_token,
                    'Authorization': `Bearer ${userToken}`,
                 },
            })

            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // Mensaje definido en Laravel
                setAlertMessage(data.message)
                openSuccessModal();
            } else if (response.status === 422) {
                const data = await response.json();
                setAlertMessage(data.error)
                openErrorModal();
            }else if (response.status === 500) {
                const data = await response.json();
                setAlertMessage(data.error)
                openErrorModal();
            }
        } catch (error) {
            console.log(`Error Updating Schedule: ${error}`);
            openErrorModal();
        }

    }

  return (
    {
        fetchManageSchedule,
        successModalOpen,
        errorModalOpen,
        closeSuccessModal,
        closeErrorModal,
        alertMessage,
    }
  )
}
