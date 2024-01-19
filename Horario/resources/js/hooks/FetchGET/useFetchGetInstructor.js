import React, { useState, useEffect } from 'react';
import useRequestOptionsGet from './useRequestOptionsGet';
import { API_URL } from '../../const/api';


const useFetchGetInstructor = (route, page) => {

  const { requestOptionsGet } = useRequestOptionsGet();
  const [dataInstructor, setDataInstructor] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}${route}?page=${page}`, requestOptionsGet)
      .then((response) => response.json())
      .then((result) => {setDataInstructor(result)
      console.log(result)})
      .catch((err) => console.log(err));
  }, [route, page]);

  return (
    {
      dataInstructor,
    }
  );
}



export default useFetchGetInstructor;