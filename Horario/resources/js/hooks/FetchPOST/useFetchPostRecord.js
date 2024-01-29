import {getNivelDeFormacionByName, getModalidadByName, getJornadaByName} from '../useObjectMapping';
import { API_URL } from '../../const/api';

const useFetchPostRecord = () => {

    const fetchSubmitRecord = async (ficha, duracion, programa, modalidad, nivelFormacion, jornada) =>{

        //Id del nivelFormación
        let idNivelFormacion = getNivelDeFormacionByName(nivel);

        //id de la Modalidad
        let idModalidad = getModalidadByName(modalidad);

        // id de la Jornada
        let idJornada = getJornadaByName(jornada);

        try {
            const response = await fetch(`${API_URL}/createRecord`, {
                method: "POST", 
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    ficha, 
                    duracion,
                    programa, 
                    idModalidad, 
                    idNivelFormacion, 
                    idJornada,
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
            fetchSubmitRecord,
        }
    )
}

export default useFetchPostRecord