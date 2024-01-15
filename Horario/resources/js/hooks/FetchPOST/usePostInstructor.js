import React, { useState } from 'react';
import { API_URL } from '../../const/api';
import useRequestOptionsPost from './useRequestOptionsPost';
import { getLimiteHorasByIdContrato, getRolByName } from '../useObjectMapping';

const useFetchPostInstructor = ({nombre_Completo, tipo_De_Documento, documentO, emaiL, telefonO, id_Contrato, ciudaD, profesioN, experienciA, id_Sede}) => {

    //Rol asignado
    let idRol = getRolByName('instructor');

    //Limite de horas semanales
    let limiteHoras = getLimiteHorasByIdContrato(id_Contrato);

    const { requestOptionsPost} = useRequestOptionsPost({
        nombre_Completo,
        tipo_De_Documento,
        documentO,
        emaiL,
        telefonO,
        id_Contrato,
        ciudaD,
        profesioN,
        experienciA,
        limiteHoras,
        id_Sede,
        idRol
    })


    const fetchSubmitInstructor = async() =>{
        try {
            const response = await fetch(`${API_URL}/register`, requestOptionsPost)
            if(response.ok){
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
