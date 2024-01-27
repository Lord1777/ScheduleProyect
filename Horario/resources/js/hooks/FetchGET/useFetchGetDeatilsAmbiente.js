import React, { useState, useEffect } from 'react';
import { API_URL } from '../../const/api';
import useRequestOptionsGet from './useRequestOptionsGet';

const useFetchGetDetailsAmbiente = (idAmbiente) => {
  const { requestOptionsGet } = useRequestOptionsGet();
  const [ambienteDetails, setAmbienteDetails] = useState(null);

  useEffect(() => {
    const fetchAmbienteDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/getEnvironment/${idAmbiente}`, requestOptionsGet);
        const data = await response.json();
        setAmbienteDetails(data);
      } catch (error) {
        console.error(err);
      }
    };

    if (idAmbiente) {
      fetchAmbienteDetails();
    }
  }, [idAmbiente, requestOptionsGet]);

  return {
    ambienteDetails,
  };
};

export default useFetchGetDetailsAmbiente;
