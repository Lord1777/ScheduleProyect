import React, {useState, useEffect} from 'react';
import { API_URL } from '../../const/api';
import useRequestOptionsGet from '../FetchGET/useRequestOptionsGet';

const useFetchGetPrograms = (route) => {

    const [dataPrograms, setDataPrograms] = useState([]);

    const { requestOptionsGet } = useRequestOptionsGet();

    useEffect(() => {
        const fetchData = async() =>{
            try {
                const response = await fetch(`${API_URL}${route}`, requestOptionsGet)
                const data = await response.json();
                setDataPrograms(data);

            } catch (error) {
                console.log(`Error Creating Record: ${error}`)
            }
        }
        fetchData()
    }, [])


  return {
    dataPrograms,
  }
}

export default useFetchGetPrograms
