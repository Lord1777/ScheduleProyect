import React, {useState, useEffect} from 'react';
import { API_URL } from '../../const/api';
import useRequestOptionsGet from '../FetchGET/useRequestOptionsGet';

export const useFetchGetEnvironments = (route) => {
    const [dataEnvironments, setDataEnvironments] = useState([]);

    const { requestOptionsGet } = useRequestOptionsGet();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}${route}`, requestOptionsGet)
                const data = await response.json();
                setDataEnvironments(data);
            } catch (err) {
                console.log(`Error Fetch Data: ${err}`)
            } 
        };

        fetchData();
    }, []);

  return {
    dataEnvironments,
  }
}
