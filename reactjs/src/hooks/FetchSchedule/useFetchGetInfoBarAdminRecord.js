import {useState, useEffect} from 'react';
import { API_URL } from '../../const/api';
import { useNavigate } from 'react-router-dom';

export const useFetchGetInfoBarAdminRecord = (route, idFicha, idHorario) => {

    const userToken = localStorage.getItem('access_token');

    const [dataInfoRecord, setDataInfoRecord] = useState([]);
    const Navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}${route}/${idFicha}/${idHorario}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userToken}`,
                    },
                    redirect: "follow",
                });
                if (response.status === 401) {
                    // Redirigir a la pantalla de Forbidden (403
                    Navigate('/403-forbidden');
                    return;
                }
                // else if(response.status === 404){
                //     //alert('No existe horario academico para esta ficha')
                //     setAlertMessage('No existe horario academico para esta ficha')
                //     setRuta('/ConsultaAprendiz')
                //     setModalOpen(true);
                // }
                if (response.ok) {
                    const result = await response.json();
                    setDataInfoRecord(result);
                    // openSuccessModal();
                }

            } catch (err) {
                console.log('Error al obtener datos:', err);
            }
        }
        fetchData();
    }, []);

  return (
    {
        dataInfoRecord,
    }
  )
}
