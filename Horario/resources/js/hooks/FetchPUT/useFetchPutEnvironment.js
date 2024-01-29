import React from 'react';
import { API_URL } from '../../const/api';
import useRequestOptionsPut from './useRequestOptionsPut';

export const useFetchPutEnvironment = () => {

    const { requestOptionsPut } = useRequestOptionsPut();

    const fetchPutEnvironment = async(route, id, ambiente, cantidadMesas, capacidad, cantidadComputadores, aireAcondicionado, tablero, videoBeam, idSede) =>{

        try {
            const response = await fetch(`${API_URL}/updateEnvironment/${id}`,{
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                  ambiente,
                  cantidadMesas,
                  capacidad,
                  cantidadComputadores,
                  aireAcondicionado,
                  tablero,
                  videoBeam,
                  idSede,
                })
            })

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
        fetchPutEnvironment
   }
  )
}
