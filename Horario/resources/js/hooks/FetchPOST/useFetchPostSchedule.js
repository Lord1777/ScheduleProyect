import React from 'react';
import { API_URL, csrf_token } from '../../const/api';


export const useFetchPostSchedule = (route) => {

    const fetchSubmitSchedule = async({ idTrimestre, idFicha, globalStoreBoxes}) =>{
        console.log(idTrimestre, idFicha, globalStoreBoxes);
        try {
            const response = await fetch(`${API_URL}${route}`, {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf_token,
                 },
                body: JSON.stringify({
                    idTrimestre,
                    idFicha,
                    globalStoreBoxes: Array.from(globalStoreBoxes)
                })
            });

            const data = await response.json();

            if (data.error) {
                console.error('Error:', data.error);
                //alert(data.error);
                alert(data.message);
            } else {
                console.log(data.message);
                alert(data.message);
            }
        } catch (error) {
            console.log(` Error Creating Schedule: ${error}`);
        }
    }

  return (
    {
        fetchSubmitSchedule,
    }
  )
}
