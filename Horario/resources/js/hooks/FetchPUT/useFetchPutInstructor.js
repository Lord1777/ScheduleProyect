import React from 'react';
import { API_URL } from '../../const/api';
import useRequestOptionsPut from './useRequestOptionsPut';

export const useFetchPutInstructor = () => {

    const { requestOptionsPut } = useRequestOptionsPut();

    const fetchPutInstructor = async(route, idUsario) =>{

        try {
            const response = await fetch(`${API_URL}${route}/${idUsario}`, useRequestOptionsPut)

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
        fetchPutInstructor
    }
  )
}
