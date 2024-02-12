import React from 'react';
import { API_URL } from '../../const/api';
import useRequestOptionsPut from './useRequestOptionsPut';


export const useFetchPutManageEnvironment = () => {

    const { requestOptionsPut } = useRequestOptionsPut();

    const fetchManageEnvironment = async(route, idAmbiente) =>{

        try {
            const response = await fetch(`${API_URL}${route}/${idAmbiente}`, requestOptionsPut)

            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // Mensaje definido en Laravel
            }

        } catch (error) {
            console.log(`Error Updating Environment: ${error}`)
        }
    }
  return (
    {
        fetchManageEnvironment
    }
  )
}
