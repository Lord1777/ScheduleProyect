import React, { useState } from 'react';
import useRequestOptionsGet from './useRequestOptionsGet';


const useFetchGetInstructor = () => {

  const { requestOptionsGet } = useRequestOptionsGet();
  const [dataInstructor, setDataInstructor] = useState([]);

  const fetchDataInstructor = async () => {

    try {
      await fetch(`http://localhost:8000/getInstructors`, requestOptionsGet)
        .then((response) => response.json())
        .then((result) => setDataInstructor(result));

    } catch (error) {
      console.error(`Request Error: ${error}`);
    }


  }

  return (
    {
      dataInstructor,
      fetchDataInstructor,
    }
  );
}


export default useFetchGetInstructor;