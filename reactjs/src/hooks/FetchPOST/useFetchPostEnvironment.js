import React, { useState } from 'react';
import { getSedeByName, getTrueOrFalseByYesOrNot } from '../useObjectMapping';
import { API_URL, csrf_token } from '../../const/api';
import { useNavigate } from 'react-router-dom';

const useFetchPostEnvironment = (route) => {

    const userToken = localStorage.getItem('access_token');

    const [ succesfullyModal, setSuccesfullyModal  ] = useState(false);
    const [ errorModal, setErrorModal ] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [ ruta , setRuta] = useState('');

    const navigate = useNavigate();

    const fetchSubmitEnvironment = async (ambiente, cantidadMesas, capacidad, catidadComputadores, aireAcondicionados, tableros, videoBeams, sede,) => {

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
                    'Authorization': `Bearer ${userToken}`,
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

            if (response.ok) {
                const data = await response.json()
                setSuccesfullyModal(true);
            }
            else if (response.status === 401) {
                // Redirigir a la pantalla de Forbidden (403)
                navigate('/403-forbidden');
                return;
            }
            else if(response.status === 422){
                const data = await response.json();
                setAlertMessage(data.error)
                setErrorModal(true)
            }
            else if(response.status === 500){
                const data = await response.json();
                setAlertMessage(data.error)
                setRuta('/CrudAmbientes')
                setErrorModal(true);
            }

        } catch (err) {
            console.log(`Error Creating Environment: ${err}`)
        }
    }

    return (
        {
            fetchSubmitEnvironment,
            succesfullyModal,
            setSuccesfullyModal,
            errorModal,
            setErrorModal,
            alertMessage,
            ruta,
        }
    )
}

export default useFetchPostEnvironment
