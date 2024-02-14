import React, { useState } from 'react';
import { API_URL, csrf_token } from '../../const/api';


export const useFetchPutScheduleRecord = (route, idHorario) => {

    const userToken = localStorage.getItem('access_token');

    const [duplicatesBox, setDuplicatesBox] = useState([]);

    const fetchUpdateScheduleRecord = async ({ idTrimestre, idFicha, globalStoreBoxes }) => {

        try {
            const response = await fetch(`${API_URL}${route}/${idHorario}`, {
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

            if(response.ok){
                console.log(data.message);
            }

            if (data.error) {
                console.error('Error:', data.error);
                if (data.duplicates) {
                    setDuplicatesBox(data.duplicates);
                }
            }

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
