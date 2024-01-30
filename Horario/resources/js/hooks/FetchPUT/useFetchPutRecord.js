import React from 'react';
import { API_URL } from '../../const/api';
import useRequestOptionsPut from './useRequestOptionsPut';

export const useFetchPutRecord = () => {
    const { requestOptionsPut } = useRequestOptionsPut();

    const fetchPutRecord = async (id, NFicha, Duracion, Programa, Modalidad, NivelFormacion, JornadaAcademica) => {
        try {
            const response = await fetch(`${API_URL}/updateRecord/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    NFicha,
                    Duracion,
                    Programa,
                    Modalidad,
                    NivelFormacion,
                    JornadaAcademica,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // Mensaje definido en el servidor
            } else {
                // Manejar errores aquí si es necesario
                console.error(`Error updating record: ${response.statusText}`);
            }
        } catch (error) {
            console.error(`Error updating record: ${error}`);
        }
    };

    return {
        fetchPutRecord,
    };
};
