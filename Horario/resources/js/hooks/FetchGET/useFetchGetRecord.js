import React, { useState, useEffect } from 'react'
import useRequestOptionsGet from './useRequestOptionsGet';
import { API_URL } from '../../const/api';

const useFetchGetRecord = (route, page, search) => {

    const { requestOptionsGet } = useRequestOptionsGet();
    const [dataRecord, setDataRecord] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        console.log(dataRecord)
        fetch(`${API_URL}${route}?page=${page}&search=${search}`, requestOptionsGet)
            .then((response) => response.json())
            .then((result) => {
                setDataRecord(result)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            });
            console.log(dataRecord);
    }, [route, page, search]);

    return {
        dataRecord,
        loading,
    }

}

export default useFetchGetRecord;