import React from 'react';
import { API_URL } from '../../const/api';
import useRequestOptionsPut from './useRequestOptionsPut';


export const useFetchPutManageCoordinator = () => {

    const { requestOptionsPut } = useRequestOptionsPut();

    const fetchManageCoordinator = async(route, idUsuario) =>{

        try {
            const response = await fetch(`${API_URL}${route}/${idUsuario}`, requestOptionsPut)

            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // Mensaje definido en Laravel
            }

        } catch (error) {
            console.log(`Error Updating Coordinator: ${error}`);
        }
    }
  return (
    {
        fetchManageCoordinator
    }
  )
}
