import React from 'react';
import { API_URL, csrf_token } from '../../const/api';

export const useFetchPutManageQuarter = () => {

    const userToken = localStorage.getItem('access_token');

    const fetchManageQuarter = async(route, idTrimestre) =>{

        try {
            const response = await fetch(`${API_URL}${route}/${idTrimestre}`, {
                method: "PUT",
                headers: { 
                    'Content-Type': 'application/json',
                    'Cookie': csrf_token,
                    'Authorization': `Bearer ${userToken}`,
                 },
            })

            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // Mensaje definido en Laravel
            }

        } catch (error) {
            console.log(`Error Updating Quarter: ${error}`)
        }
    }
  return (
    {
        fetchManageQuarter
    }
  )
}
