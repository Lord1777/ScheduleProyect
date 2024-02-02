import React from 'react';
import { API_URL } from '../../const/api';
import useRequestOptionsPut from './useRequestOptionsPut';

export const useFetchPutQuarter = () => {

    const { requestOptionsPut } = useRequestOptionsPut();

    const fetchPutQuarter = async(idTrimestre, fechaIni, fechaFin) =>{

        console.log(
            `idTrimestre: ${idTrimestre},
            Fecha Inicial: ${fechaIni},
            Fecha Final: ${fechaFin}`
        )

        try {
            const response = await fetch(`${API_URL}/updateQuater/${idTrimestre}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    idTrimestre,
                    fechaIni,
                    fechaFin,
                }),
            })

            if (response.ok) {
                const data = await response.json();
                console.log(data.message);
            } else {
                console.error(`Error updating quater: ${response.statusText}`);
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
