import React from 'react';
import { API_URL } from '../../const/api';
import useRequestOptionsPut from './useRequestOptionsPut';

export const useFetchPutManageQuarter = () => {

    const { requestOptionsPut } = useRequestOptionsPut();

    const fetchManageQuarter = async(route, idTrimestre) =>{

        try {
            const response = await fetch(`${API_URL}${route}/${idTrimestre}`, requestOptionsPut)

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
