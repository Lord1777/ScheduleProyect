import React from 'react';
import { API_URL } from '../../const/api';
import useRequestOptionsPut from './useRequestOptionsPut';

export const useFetchPutManageRecord = () => {

    const { requestOptionsPut } = useRequestOptionsPut();

    const fetchManageRecord = async(route, idFicha) =>{

        try {
            const response = await fetch(`${API_URL}${route}/${idFicha}`, requestOptionsPut)

            if(response.ok){
                const data = await response.json();
                console.log(data.message) // Mensaje definido en Laravel
            }
            
        } catch (error) {
            console.log(`Error Updating Record: ${error}`)
        }

    }

  return (
    {
        fetchManageRecord
    }
  )
}
