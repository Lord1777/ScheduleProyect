import React from 'react';
import { API_URL, csrf_token } from '../../const/api';

const useFetchLogin = (route) => {

    const authUser = async (documento, password) => {

        try {
            const response = await fetch(`${API_URL}${route}`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf_token,
                 },
                body: JSON.stringify({ documento, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('access_token', data.access_token)
                localStorage.setItem('role', data.role)
            }
        } catch (error) {
            console.log(`Server Error: ${error}`);
        }
    };

    return {
        authUser,
    };
};

export default useFetchLogin;