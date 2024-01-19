import React, { useState, useEffect } from 'react';
import useRequestOptionsGet from './useRequestOptionsGet';
import { API_URL } from '../../const/api';

const useFetchGetCoordinator = (route, page) => {

    const { requestOptionsGet } = useRequestOptionsGet();
    const [dataCoordinator, setDataCooordinator] = useState([]);


    useEffect(() => {
        fetch(`${API_URL}${route}?page=${page}`, requestOptionsGet)
            .then((response) => response.json())
            .then((result) => setDataCooordinator(result))
            .catch((err) => console.log(err))
    }, [route, page]);


    return (
        {
            dataCoordinator,
        }
    )
}

export default useFetchGetCoordinator;
