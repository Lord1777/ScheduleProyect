import React from 'react';
import { API_URL } from '../../const/api';
import useRequestOptionsPut from './useRequestOptionsPut';

export const useFetchPutRecord = (id) => {
    const { requestOptionsPut } = useRequestOptionsPut();

    const fetchPutRecord = async ( ficha, duracion, programa, modalidad, jornada ) => {
        console.log(
            `NumeroF: ${ficha},
            duracion: ${duracion},
            Programa: ${programa},
            Modalidad: ${modalidad},
            JornadaAcademica: ${jornada}`
        )
        try {
            const response = await fetch(`${API_URL}/updateRecord/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ficha,
                    duracion,
                    programa,
                    modalidad,
                    jornada
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // Mensaje definido en el servidor
            } else {
                // Manejar errores aquí si es necesario
                console.error(`Error updating record: ${response.statusText}`);
                console.log(data.error);
            }
        } catch (error) {
            console.error(`Error updating record: ${error}`);
        }
    };

    return {
        fetchPutRecord,
    };
};
