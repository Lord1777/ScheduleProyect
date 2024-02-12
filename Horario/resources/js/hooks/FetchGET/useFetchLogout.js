import React from 'react';
import { API_URL } from '../../const/api';

export const useFetchLogout = () => {

    const userToken = localStorage.getItem('access_token');

    const fetchLogout = async(route) => {
        try {
            const response = await fetch(`${API_URL}${route}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`,
                },
                redirect: "follow",
            })

            if(response.ok){
                console.log('User Logout Succesfully');
            }
        } catch (error) {
            console.log(`Logout error: ${error}`)
        }
    }

  return {
    fetchLogout,
  }
}
