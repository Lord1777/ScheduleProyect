import React from 'react';
import { API_URL, csrf_token } from '../../const/api';


export const useFetchPostSchedule = () => {

    const fetchSubmitSchedule = async({ trimestre, globalStoreBoxes}) =>{
        try {

            console.log(trimestre, globalStoreBoxes);

            const response = await fetch(`${API_URL}/createSchedule`, {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf_token,
                 },
                body: JSON.stringify({
                    trimestre,
                    globalStoreBoxes: Array.from(globalStoreBoxes)
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // Mensaje definido en Laravel
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
