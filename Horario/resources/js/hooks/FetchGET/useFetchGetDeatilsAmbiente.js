import React, { useState } from 'react';
import { API_URL } from '../../const/api';
import useRequestOptionsGet from './useRequestOptionsGet';

const useFetchGetDetailsAmbiente = (idAmbiente) => {
  const { requestOptionsGet } = useRequestOptionsGet();
  const [ambienteDetails, setAmbienteDetails] = useState(null);
  const [error, setError] = useState(null);

  const fetchAmbienteDetails = async () => {
    try {
      const response = await fetch(`${API_URL}/getEnvironment/${idAmbiente}`, requestOptionsGet);

      if (!response.ok) {
        if (response.status === 429) {
          // Implement exponential backoff
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
          return fetchAmbienteDetails();
        } else {
          throw new Error('Network response was not ok');
        }
      }

      const data = await response.json();
      setAmbienteDetails(data);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  return {
    ambienteDetails,
    error,
    fetchAmbienteDetails
  };
};

export default useFetchGetDetailsAmbiente;
