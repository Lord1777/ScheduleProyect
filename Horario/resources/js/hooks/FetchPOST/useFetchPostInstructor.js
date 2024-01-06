import React, { useState } from 'react';
import { API_URL } from '../../const/api';
import useRequestOptionsPost from './useRequestOptionsPost';
import { getLimiteHorasByIdContrato, getRolByName } from '../useObjectMapping';

const useFetchPostInstructor = ({nombreCompleto, tipoDeDocumento, documento, email, telefono, idContrato, ciudad, profesion, experiencia, idSede}) => {

    //Rol asignado
    let idRol = getRolByName('instructor');

    //Limite de horas semanales
    let limiteHoras = getLimiteHorasByIdContrato(idContrato);

    const { requestOptionsPost} = useRequestOptionsPost({
        nombreCompleto,
        tipoDeDocumento,
        documento,
        email,
        telefono,
        idContrato,
        ciudad,
        profesion,
        experiencia,
        limiteHoras,
        idSede,
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
