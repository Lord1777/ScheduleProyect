import React, {useState} from 'react';
import { getSedeByName, getTrueOrFalseByYesOrNot } from '../useObjectMapping';
import { API_URL, csrf_token } from '../../const/api';

const useFetchPostEnvironment = (route) => {
  

    const fetchSubmitEnvironment = async( ambiente, cantidadMesas, capacidad, catidadComputadores, aireAcondicionados, tableros, videoBeams, sede, ) =>{
        
      //Id de la sede
      let idSede = getSedeByName(sede);

      //True or False
      let aireAcondicionado = getTrueOrFalseByYesOrNot(aireAcondicionados);

      //True or False
      let videoBeam = getTrueOrFalseByYesOrNot(videoBeams);

      //True or False
      let tablero = getTrueOrFalseByYesOrNot(tableros);

      try {
        const response = await fetch(`${API_URL}${route}`, {
          method: "POST",
          headers: { 
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrf_token,
           },
          body: JSON.stringify({ 
            ambiente,
            cantidadMesas,
            capacidad,
            catidadComputadores,
            aireAcondicionado,
            tablero,
            videoBeam,
            idSede,
          })
        })

        if(response.ok){
          const data = await response.json()
          console.log(data.message)
        }
        
      } catch (err) {
          console.log(`Error Creating Environment: ${err}`)
      }
    }

  return (
    {
      fetchSubmitEnvironment,
    }
  )
}

export default useFetchPostEnvironment
