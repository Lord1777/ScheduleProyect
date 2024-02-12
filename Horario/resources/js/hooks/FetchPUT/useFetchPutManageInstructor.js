import React from 'react';
import { API_URL, csrf_token } from '../../const/api';

export const useFetchPutManageInstructor = () => {

    const userToken = localStorage.getItem('access_token');

    const fetchManageInstructor = async(route, idUsuario) =>{

        try {
            const response = await fetch(`${API_URL}${route}/${idUsuario}`, {
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
            console.log(`Error Updating Instructor: ${error}`)
        }
    }

  return (
    {
        fetchManageInstructor
    }
  )
}
