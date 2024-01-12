import React from 'react';
import { API_URL } from '../../const/api';

const useFetchLogin = () => {

    const authUser = async (documento, password) => {
        console.log(password)

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ documento, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
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