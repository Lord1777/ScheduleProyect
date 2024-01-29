import React from 'react';
import { API_URL, csrf_token } from '../../const/api';
import { getNivelDeFormacionByName } from '../useObjectMapping';


const useFetchPostProgram = (route) => {

    const fetchSubmitProgram = async( nombre, duracion, nivelDeFormacion ) =>{

        // Nivel de formación
        let idNivelFormacion = getNivelDeFormacionByName(nivelDeFormacion);

        try {
            const response = await fetch(`${API_URL}${route}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf_token,
                },
                body: JSON.stringify({
                    nombre,
                    duracion,
                    idNivelFormacion
                })
            });
    
            if(response.ok){
                const data = await response.json();
                console.log(data.message); // Mensaje definido en Laravel
            }
        } catch (error) {
            console.log(`Error Creating Program: ${error}`);
        }
    }

  return (
    {
        fetchSubmitProgram,
    }
  )
}

export default useFetchPostProgram
