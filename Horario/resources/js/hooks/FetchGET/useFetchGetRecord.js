import React, { useState, useEffect } from 'react'
import useRequestOptionsGet from './useRequestOptionsGet';
import { API_URL } from '../../const/api';

const useFetchGetRecord = (route) => {

    const { requestOptionsGet } = useRequestOptionsGet();
    const [dataRecord, setDataRecord] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}${route}`, requestOptionsGet)
            .then((response) => response.json())
            .then((result) => setDataRecord(result))
            .catch((err) => console.log(err));
    }, []);





    return ({
        dataRecord,
    })

}

export default useFetchGetRecord;
