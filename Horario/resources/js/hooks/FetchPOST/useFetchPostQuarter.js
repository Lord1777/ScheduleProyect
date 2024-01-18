import React, { useState } from 'react';

const useFetchPostQuarter = () => {

    const fetchSubmitQuarter = async (trimestre, fechaInicio, fechaFinal) => {

        try {
            const response = await fetch(`http://localhost:8000/api/createQuarters`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
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
