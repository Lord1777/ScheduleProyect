import React from 'react';
import { API_URL } from '../../const/api';
import useRequestOptionsGet from './useRequestOptionsGet';

export const useFetchLogout = () => {

    const { requestOptionsGet } = useRequestOptionsGet();

    const fetchLogout = async(route) => {
        try {
            const response = await fetch(`${API_URL}${route}`, requestOptionsGet)

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
