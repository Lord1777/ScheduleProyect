import React, { useState } from 'react';
import { API_URL, csrf_token } from '../../const/api';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const useFetchLogin = (route) => {

    const userToken = localStorage.getItem('access_token');

    const { authenticateUser } = useUser();
    const [ loading, setLoading ] = useState(false);

    const navigate = useNavigate();

    const authUser = async (documento, password) => {
        try {
            const response = await fetch(`${API_URL}${route}`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf_token,
                    'Authorization': `Bearer ${userToken}`,
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
        } catch (error) {
            console.log(`Server Error: ${error}`);
        }
        
    };

    return {
        authUser,
        loading,
        setLoading
    };
};

export default useFetchLogin;