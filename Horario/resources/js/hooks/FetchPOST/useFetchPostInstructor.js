import React, { useState } from 'react';
import { API_URL, csrf_token } from '../../const/api';
import { getContratoByName, getLimiteHorasByTypeContrato, getRolByName, getSedeByName } from '../useObjectMapping';

const useFetchPostInstructor = (route) => {

    const fetchSubmitInstructor = async (sede, tipoContrato, tipoDocumento, ciudad, documento, email, experiencia, nombreCompleto, profesion, telefono) => {

        //Rol asignado
        let idRol = getRolByName('instructor');

        //Limite de horas semanales
        let limiteHoras = getLimiteHorasByTypeContrato(tipoContrato);

        //Id del contrato
        let idContrato = getContratoByName(tipoContrato);

        //Id de la sede
        let idSede = getSedeByName(sede);
        
        try {
            const response = await fetch(`${API_URL}${route}`, {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf_token,
                 },
                body: JSON.stringify({
                    tipoDocumento,
                    ciudad,
                    documento,
                    email,
                    experiencia,
                    nombreCompleto,
                    profesion,
                    telefono,
                    limiteHoras,
                    idRol,
                    idContrato,
                    idSede,
                })
            })
            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // Mensaje definido en Laravel
            }
        } catch (error) {
            console.log(`Error Creating Instructor: ${error}`)
        }
    }


    return (
        {
            fetchSubmitInstructor
        }
    )
}

export default useFetchPostInstructor
