import React, { useState, useEffect } from 'react'
import useRequestOptionsGet from './useRequestOptionsGet';
import { API_URL } from '../../const/api';


export const useFetchGetQuarter = (route, page) => {

  const { requestOptionsGet } = useRequestOptionsGet();
  const [dataQuarter, setDataQuarter] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}${route}`, requestOptionsGet)
      .then((response) => response.json())
      .then((result) => setDataQuarter(result))
      .catch((err) => console.log(err));
  }, [route, page])


  return (
    {
      dataQuarter,
    }
  )
}

export default useFetchGetQuarter;
