import React, { useState } from 'react'
import useRequestOptionsPost from './useRequestOptionsPost'

const useFetchPostQuarter = ({ trimestre, fechaInicio, fechaFinal }) => {

    const { requestOptionsPost } = useRequestOptionsPost({
        trimestre,
        fechaInicio,
        fechaFinal});

    const fetchSubmitQuarter = async () => {

        try {
            const response = await fetch(`http://localhost:8000/api/createQuarters`, requestOptionsPost);
    
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
