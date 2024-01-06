import React, { useState, useEffect } from 'react'
import useRequestOptionsGet from './useRequestOptionsGet';
import { API_URL } from '../../const/api';

const useFetchGetEnvironment = (route) => {

    const { requestOptionsGet } = useRequestOptionsGet();
    const [dataEnvironment, setDataEnvironment] = useState([]);

    useEffect(() => {

        fetch(`${API_URL}${route}`, requestOptionsGet)
            .then((response) => response.json())
            .then((result) => setDataEnvironment(result))
            .catch((err) => console.log(err));
    }, []);


    return ({
        dataEnvironment,
    })

}

export default useFetchGetEnvironment;
