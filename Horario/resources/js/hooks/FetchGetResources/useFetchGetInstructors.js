import React, {useState, useEffect} from 'react';
import { API_URL } from '../../const/api';
import useRequestOptionsGet from '../FetchGET/useRequestOptionsGet';


export const useFetchGetInstructors = (route) => {
    const [dataInstructors, setDataInstructors] = useState([]);

    const { requestOptionsGet } = useRequestOptionsGet();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}${route}`, requestOptionsGet)
                const data = await response.json();
                setDataInstructors(data);
            } catch (err) {
                console.log(`Error Fetch Data: ${err}`)
            } 
        };

        fetchData();
    }, []);

  return {
        dataInstructors,
    }
}
