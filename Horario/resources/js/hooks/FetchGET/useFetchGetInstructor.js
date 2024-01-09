import React, { useState, useEffect } from 'react';
import useRequestOptionsGet from './useRequestOptionsGet';
import { API_URL } from '../../const/api';


const useFetchGetInstructor = (route) => {

  const { requestOptionsGet } = useRequestOptionsGet();
  const [dataInstructor, setDataInstructor] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}${route}`, requestOptionsGet)
      .then((response) => response.json())
      .then((result) => setDataInstructor(result))
      .catch((err) => console.log(err));
  }, []);





  return (
    {
      dataInstructor,
    }
  );
}



export default useFetchGetInstructor;