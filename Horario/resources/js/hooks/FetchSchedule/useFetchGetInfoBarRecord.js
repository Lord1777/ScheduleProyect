import React, {useState, useEffect} from 'react';
import { API_URL } from '../../const/api';

const useFetchGetInfoBarRecord = (route, idFicha) => {

    const [dataInfoRecord, setDataInfoRecord] = useState([]);

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
