import React, { useState, useEffect, useRef } from 'react';
import { API_URL } from '../../const/api';
import { useNavigate } from 'react-router-dom';

const useFetchGetInfoUnitFicha = (route, id) => {

    const userToken = localStorage.getItem('access_token');
    const [dataFicha, setDataFicha] = useState([]);
    const fetchDataRef = useRef(() => {});
    const [loading, setLoading] = useState(true);
    const [loadingPagination, setLoadingPagination] = useState(true);
    const Navigate = useNavigate()

    if (userToken) {
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch(`${API_URL}${route}/${id}`, {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${userToken}`,
                        },
                        redirect: "follow",
                    });
                    if (response.status === 401) {
                        // Redirigir a la pantalla de Forbidden (403)
                        Navigate('/403-forbidden');
                        return;
                    }
                    const result = await response.json();
                    setDataFicha(result);
                } catch (error) {
                    console.error('Error al obtener datos:', error)
                }
                finally{
                    setLoading(false);
                }
            };
            fetchDataRef.current = fetchData;
            fetchData();
        }, []);

        
    }

  return {
    dataFicha,
    fetchData: () => fetchDataRef.current(),
    loading,
    setLoading,
  }
}

export default useFetchGetInfoUnitFicha