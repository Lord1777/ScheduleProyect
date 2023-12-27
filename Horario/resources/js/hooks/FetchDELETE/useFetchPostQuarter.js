import React, { useState } from 'react'
import useRequestOptionsPost from './useRequestOptionsPost'

export const useFetchPostQuarter = ({ trimestre, fechaInicio, fechaFinal }) => {

    const { requestOptionsPost } = useRequestOptionsPost({trimestre, fechaInicio, fechaFinal});

    const fetchSubmitQuarter = async () => {

        try {
            const response = await fetch(`http://localhost:8000/createQuarters`, requestOptionsPost);
    
            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // Mensaje definido en Laravel
            } else {

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
