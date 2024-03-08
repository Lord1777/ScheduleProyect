import React, {useState} from 'react';
import { API_URL, csrf_token } from '../../const/api';

export const useFetchPutManageInstructor = () => {

    const userToken = localStorage.getItem('access_token');
    const [Loading, setLoading] = useState(true);


    const fetchManageInstructor = async(route, idUsuario) =>{

        try {
            const response = await fetch(`${API_URL}${route}/${idUsuario}`, {
                method: "PUT",
                headers: { 
                    'Content-Type': 'application/json',
                    // 'X-CSRF-TOKEN': csrf_token,
                    'Authorization': `Bearer ${userToken}`,
                 },
            })

            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // Mensaje definido en Laravel
                setLoading(false);
            }

        } catch (error) {
            console.log(`Error Updating Instructor: ${error}`)
            setLoading(false)
        }
    }

  return (
    {
        fetchManageInstructor,
        Loading,
    }
  )
}