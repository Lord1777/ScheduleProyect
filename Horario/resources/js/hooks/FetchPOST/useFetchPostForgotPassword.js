import React from 'react';
import { API_URL, csrf_token } from '../../const/api';

export const useFetchPostForgotPassword = (route) => {

    const handleForgotPassword = async (email) => {

        try {
            const response = await fetch(`${API_URL}${route}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf_token,
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error('Error al solicitar restablecimiento de contraseña');
            }

            const data = await response.json();
            console.log(data.message);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        {
            handleForgotPassword,
        }
    )
}
