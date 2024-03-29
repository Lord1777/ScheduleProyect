import {useState, useEffect} from 'react';
import { API_URL } from '../../const/api';
import useModal from '../useModal';

const useFetchGetInfoBarRecord = (route, idFicha) => {

    const { isModal: successModalOpen, ShowOpenModal: openSuccessModal, ShowCloseModal: closeSuccessModal } = useModal();
    const [dataInfoRecord, setDataInfoRecord] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [ ruta, setRuta ] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}${route}/${idFicha}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    redirect: "follow",
                });
                
                if(response.status === 404){
                    //alert('No existe horario academico para esta ficha')
                    setAlertMessage('No existe horario academico para esta ficha')
                    setRuta('/ConsultaAprendiz')
                    setModalOpen(true);
                }
                if (response.ok) {
                    const result = await response.json();
                    setDataInfoRecord(result);
                    openSuccessModal();
                }
            } catch (err) {
                console.log('Error al obtener datos:', err);
            }
        }
        fetchData();
    }, []);

  return {
    dataInfoRecord,
    modalOpen,
    setModalOpen,
    alertMessage,
    ruta
  }
}

export default useFetchGetInfoBarRecord
