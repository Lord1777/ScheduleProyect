import {getModalidadByName, getJornadaByName} from '../useObjectMapping';
import { API_URL, csrf_token } from '../../const/api';

const useFetchPostRecord = (route) => {

    const fetchSubmitRecord = async (ficha, idPrograma, modalidad, jornada) => {

        //id de la Modalidad
        let idModalidad = getModalidadByName(modalidad);

        // id de la Jornada
        let idJornada = getJornadaByName(jornada);

        console.log(
            ficha, 
            idPrograma, 
            idModalidad, 
            idJornada)

        try {
            const response = await fetch(`${API_URL}${route}`, {
                method: 'POST', 
                headers: { 
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf_token,
                },
                body: JSON.stringify({
                    ficha, 
                    idPrograma, 
                    idModalidad, 
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