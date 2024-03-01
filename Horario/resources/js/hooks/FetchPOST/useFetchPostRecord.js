import { getModalidadByName, getJornadaByName } from '../useObjectMapping';
import { API_URL, csrf_token } from '../../const/api';
import useModal from '../useModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useFetchPostRecord = (route) => {

    const userToken = localStorage.getItem('access_token');

    const { isModal: successModalOpen, ShowOpenModal: openSuccessModal, ShowCloseModal: closeSuccessModal } = useModal();
    const { isModal: errorModalOpen, ShowOpenModal: openErrorModal, ShowCloseModal: closeErrorModal } = useModal();
    const [alertMessage, setAlertMessage] = useState('');
    const [ ruta , setRuta] = useState('');

    const navigate = useNavigate();

    const fetchSubmitRecord = async (ficha, idPrograma, modalidad, jornada) => {

        //id de la Modalidad
        let idModalidad = getModalidadByName(modalidad);

        // id de la Jornada
        let idJornada = getJornadaByName(jornada);

        try {
            const response = await fetch(`${API_URL}${route}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf_token,
                    'Authorization': `Bearer ${userToken}`,
                },
                body: JSON.stringify({
                    ficha,
                    idPrograma,
                    idModalidad,
                    idJornada,
                })
            })

            if (response.ok) {
                const data = await response.json()
                openSuccessModal();
            }
            else if (response.status === 401) {
                // Redirigir a la pantalla de Forbidden (403)
                navigate('/403-forbidden');
                return;
            }
            else if(response.status === 422){
                const data = await response.json();
                setAlertMessage(data.error)
                openErrorModal()
            }
            else if(response.status === 500){
                const data = await response.json();
                setAlertMessage(data.error)
                setRuta('/CrudFichas')
                openErrorModal();
            }

        } catch (err) {
            console.log(`Error Creating Environment: ${err}`)
            openErrorModal();
        }
    }

    return (
        {
            fetchSubmitRecord,
            successModalOpen,
            errorModalOpen,
            closeSuccessModal,
            closeErrorModal,
            alertMessage,
            ruta
        }
    )
}

export default useFetchPostRecord