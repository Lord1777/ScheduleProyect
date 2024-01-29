import React, { useState } from 'react';
import { API_URL, csrf_token } from '../../const/api';


const useFetchPostQuarter = (route) => {

    const fetchSubmitQuarter = async (trimestre, fechaInicio, fechaFinal) => {

        try {
            const response = await fetch(`${API_URL}${route}`, {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf_token,
                 },
                body: JSON.stringify({
                    trimestre,
                    fechaInicio,
                    fechaFinal
                })
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // Mensaje definido en Laravel
            }
        } catch (err) {
            console.error(`Error Creating Quarter: ${err}`);
        }
    }

    return (
        {
            fetchSubmitQuarter,
        }
    )
}

export default useFetchPostQuarter
