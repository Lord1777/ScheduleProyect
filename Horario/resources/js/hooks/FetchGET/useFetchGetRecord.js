import React, { useState, useEffect } from 'react'
import useRequestOptionsGet from './useRequestOptionsGet';
import { API_URL } from '../../const/api';

const useFetchGetRecord = (route, page) => {

    const { requestOptionsGet } = useRequestOptionsGet();
    const [dataRecord, setDataRecord] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}${route}?page=${page}`, requestOptionsGet)
            .then((response) => response.json())
            .then((result) => setDataRecord(result))
            .catch((err) => console.log(err));
    }, [route, page]);

    return ({
        dataRecord,
    })

}

export default useFetchGetRecord;
