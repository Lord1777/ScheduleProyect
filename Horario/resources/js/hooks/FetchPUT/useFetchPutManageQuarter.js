import React from 'react';

export const useFetchPutManageQuarter = () => {

    const fetchManageQuarter = async(route, idTrimestre) =>{

        try {
            const response = await fetch(`${API_URL}${route}/${idTrimestre}`, useRequestOptionsPut)

            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // Mensaje definido en Laravel
            }

        } catch (error) {
            console.log(`Error Updating Quarter: ${error}`)
        }
    }
  return (
    {
        fetchManageQuarter
    }
  )
}
