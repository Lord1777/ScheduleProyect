import React, { useState } from 'react';
import { API_URL, csrf_token } from '../../const/api';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const useFetchLogin = (route) => {

    const { authenticateUser } = useUser();
    const [ loading, setLoading ] = useState(false);
    const [ alertMessage, setAlertMessage ] = useState("");
    const [ openErrorModal, setOpenErrorModal ] = useState(false);

    const navigate = useNavigate();

    // console.log(csrf_token)

    const authUser = async (documento, password) => {
        try {
            const response = await fetch(`${API_URL}${route}`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    // 'X-CSRF-TOKEN': csrf_token,
                 },
                body: JSON.stringify({ documento, password }),
            });

            if ( response.ok ) {
                const data = await response.json();
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('role', data.role);
                localStorage.setItem('user_data', JSON.stringify(data.data));
                authenticateUser(data.access_token, data.role, data.data);

                if( data.role === 'coordinador' ){
                    navigate('/Panel');
                } else if ( data.role === 'instructor' ){
                    navigate(`/HorarioInstructor/${data.data.idUsuario}`);
                }
            }
            else if( response.status === 401 ){
                setAlertMessage("Documento o contraseña incorrecta, por favor vuelva a intentarlo.")
                setOpenErrorModal(true);
            }
        } catch (error) {
            console.log(`Server Error: ${error}`);
        }
        
    };

    return {
        authUser,
        loading,
        setLoading,
        alertMessage,
        openErrorModal,
        setOpenErrorModal
    };
};

export default useFetchLogin;