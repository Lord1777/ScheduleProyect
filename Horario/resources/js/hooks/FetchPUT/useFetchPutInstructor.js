import React from 'react';
import { API_URL } from '../../const/api';
import useRequestOptionsPut from './useRequestOptionsPut';
import { getContratoByName, getSedeByName } from '../useObjectMapping';

export const useFetchPutInstructor = (idUsuario) => {

    const { requestOptionsPut } = useRequestOptionsPut();

    const fetchPutInstructor = async (nombreCompleto, tipoDocumento, documento, email, telefono, tipoContrato, ciudad, profesion, experiencia, sede) => {
        //console.log("Valores en fetchPutInstructor:", nombreCompleto, tipoDocumento, documento, email, telefono, tipoContrato, ciudad, profesion, experiencia, sede);
        let idContrato = getContratoByName(tipoContrato);
        let idSede = getSedeByName(sede);

        // console.log(
        //     `nombreCompleto: ${nombreCompleto},
        //     tipoDocumento: ${tipoContrato},
        //     documento: ${documento},
        //     email: ${email},
        //     telefono: ${telefono},
        //     idContrato: ${idContrato},
        //     ciudad:  ${ciudad},
        //     profesion: ${profesion},
        //     experiencia: ${experiencia},
        //     idSede: ${sede}`
        // )

        try {
            const response = await fetch(`${API_URL}/UpdateInstructor/${idUsuario}`, {
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
            else {
                console.log(response.error)
            }

        } catch (error) {
            console.log(`Error Updating Instructor: ${error}`)
        }
    }

    return (
        {
            fetchPutInstructor
        }
    )
}
