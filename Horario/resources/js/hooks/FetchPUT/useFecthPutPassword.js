import React, { useState } from 'react'
import { API_URL } from '../../const/api';

const useFecthPutPassword = () => {

    const [ loading, setLoading ] = useState(false);

    const fetchPutPassword = async (idUser, password) => {

        try {

            const response = await fetch(`${API_URL}/UpdatePassword/${idUser}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Cookie': csrf_token,
                    'Authorization': `Bearer ${userToken}`,
                 },
                body: JSON.stringify({
                    idUser,
                    password
                }),
            });

            if (response.ok) {
                const data = await response.json();
                
            } else if (response.status === 422) {
                const data = await response.json();
                
            }
            else if (response.status === 500) {
                const data = await response.json();
                
            }

        } catch (error) {
            console.error(`Error updating program: ${error}`);
        }
    }

  return {
    fetchPutPassword,
    loading,
    setLoading
  }
}

export default useFecthPutPassword