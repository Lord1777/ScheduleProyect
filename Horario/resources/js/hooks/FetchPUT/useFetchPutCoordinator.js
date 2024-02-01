import React from 'react';
import { API_URL } from '../../const/api';
import useRequestOptionsPut from './useRequestOptionsPut';
import { getContratoByName, getSedeByName } from '../useObjectMapping';

export const useFetchPutCoordinator = (idUsario) => {

    const { requestOptionsPut } = useRequestOptionsPut();

    const fetchPutCoordinator = async (nombreCompleto, tipoDocumento, documento, email, telefono, tipoContrato, ciudad, profesion, experiencia, sede) => {
        
        let idContrato = getContratoByName(tipoContrato);
        let idSede = getSedeByName(sede);

        try {
            const response = await fetch(`${API_URL}/UpdateCoordinator/${idUsario}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombreCompleto,
                    tipoDocumento,
                    documento,
                    email,
                    telefono,
                    idContrato,
                    ciudad,
                    profesion,
                    experiencia,
                    idSede
                })
            })

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
            fetchPutCoordinator
        }
    )
}
