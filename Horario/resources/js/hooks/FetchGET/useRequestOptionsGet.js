import React,{useState} from 'react'

export const useRequestOptionsGet = () => {

  const csrf_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    let myHeaders = new Headers();
    myHeaders.set('Cookie', csrf_token);

    let requestOptionsGet = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

  return (
    {
        requestOptionsGet,
    }
  )
}

export default useRequestOptionsGet
