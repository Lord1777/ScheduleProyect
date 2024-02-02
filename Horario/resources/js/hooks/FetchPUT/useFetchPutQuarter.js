import React from 'react';
import { API_URL } from '../../const/api';
import useRequestOptionsPut from './useRequestOptionsPut';

export const useFetchPutQuarter = () => {

    const { requestOptionsPut } = useRequestOptionsPut();
    

    const fetchPutQuarter = async(idTrimestre, trimestre, fechaInicio, fechaFinal) =>{

        console.log(
            idTrimestre,
            `idTrimestre: ${trimestre},
            Fecha Inicial: ${fechaInicio},
            Fecha Final: ${fechaFinal}`
        )

        try {
            const response = await fetch(`${API_URL}/updateQuater/${idTrimestre}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    trimestre,
                    fechaInicio,
                    fechaFinal
                }),
            })

            if (response.ok) {
                const data = await response.json();
                console.log(data.message);
            } else {
                console.error(`Error updating quater: ${response.statusText}`);
                const data = await response.json();
                console.log(data.error);
            }

        } catch (error) {
            console.log(`Error Updating Quarter: ${error}`)
        }
    }
  return (
    {
        fetchPutQuarter
    }
  )
}
