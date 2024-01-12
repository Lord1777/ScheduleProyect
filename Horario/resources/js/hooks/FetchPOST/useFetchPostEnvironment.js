import React, {useState} from 'react';
import useRequestOptionsPost from './useRequestOptionsPost';

const useFetchPostEnvironment = () => {

  const { requestOptionsPost } = useRequestOptionsPost();

    const fetchSubmitEnvironment = async() =>{
        
      try {
        const response = await fetch(`http://localhost:8000/api/createEnvironment`, requestOptionsPost)

        if(response.ok){
          const data = await response.json()
          console.log(data.message)
        }
        
      } catch (err) {
          console.log(`Error Creating Environment: ${err}`)
      }
    }

  return (
    {
      fetchSubmitEnvironment,
    }
  )
}

export default useFetchPostEnvironment
