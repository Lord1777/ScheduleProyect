import React, {useState} from 'react';
import { API_URL, csrf_token } from '../../const/api';


export const useFetchPutScheduleRecord = (route) => {

    const userToken = localStorage.getItem('access_token');

    const [duplicatesBox, setDuplicatesBox] = useState([]);

    const fetchUpdateScheduleRecord = async({ idTrimestre, idFicha, globalStoreBoxes}) =>{

        try {
            const response = await fetch(`${API_URL}${route}`, {
                method: "PUT",
                headers: { 
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf_token,
                    'Authorization': `Bearer ${userToken}`,
                 },
                body: JSON.stringify({
                    idTrimestre,
                    idFicha,
                    globalStoreBoxes: Array.from(globalStoreBoxes)
                })
            });

            const data = await response.json();
            
        } catch (error) {
            console.log(`Error Updating Schedule: ${error}`)
        }
    }
  return (
    {
        fetchUpdateScheduleRecord,
        duplicatesBox,
        setDuplicatesBox
    }
  )
}
