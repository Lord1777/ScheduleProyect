import React, {useState, useEffect} from 'react';
import { API_URL } from '../../const/api';
import useRequestOptionsGet from '../FetchGET/useRequestOptionsGet';


const useFetchGetInfoBarRecord = (route, idFicha) => {

    const { requestOptionsGet } = useRequestOptionsGet();

    const [dataInfoRecord, setDataInfoRecord] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}${route}/${idFicha}`, requestOptionsGet);
                const result = await response.json();

                if(response.status === 404){
                    alert('No existe horario academico para esta ficha')
                }
                
                setDataInfoRecord(result);

            } catch (err) {
                console.log('Error al obtener datos:', err);
            }
        }
        fetchData();
    }, []);

  return {
    dataInfoRecord,
  }
}

export default useFetchGetInfoBarRecord
