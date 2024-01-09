import React, {useState} from 'react'

export const useRequestOptionsPost = (requestData) => {

  const csrf_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    let myHeaders = new Headers();
    myHeaders.set('Content-Type', 'application/json');
    myHeaders.set('Cookie', csrf_token);

    let requestOptionsPost = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(requestData),
    };

  return (
    {
      requestOptionsPost,
    }
  )
}

export default useRequestOptionsPost
