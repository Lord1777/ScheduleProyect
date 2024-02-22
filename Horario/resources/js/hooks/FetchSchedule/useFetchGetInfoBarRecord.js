import {useState, useEffect} from 'react';
import { API_URL } from '../../const/api';
import { useNavigate } from 'react-router-dom';

const useFetchGetInfoBarRecord = (route, idFicha) => {

    const [dataInfoRecord, setDataInfoRecord] = useState([]);
    const Navigate = useNavigate();
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
                if (response.status === 401) {
                    // Redirigir a la pantalla de Forbidden (403
                    Navigate('/403-forbidden');
                    return;
                }
                else if(response.status === 404){
                    //alert('No existe horario academico para esta ficha')
                    setAlertMessage('No existe horario academico para esta ficha')
                    setRuta('/ConsultaAprendiz')
                    setModalOpen(true);
                }
                const result = await response.json();

                setDataInfoRecord(result);

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
