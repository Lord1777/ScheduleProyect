import React, { useState } from 'react';
import { API_URL } from '../../const/api';
import useRequestOptionsPost from './useRequestOptionsPost';
import { getContratoByName, getLimiteHorasByTypeContrato, getRolByName, getSedeByName } from '../useObjectMapping';

const useFetchPostInstructor = () => {

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
            const response = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
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
