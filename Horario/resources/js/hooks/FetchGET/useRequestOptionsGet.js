import React,{useState} from 'react'
import { csrf_token } from '../../const/api';

export const useRequestOptionsGet = () => {

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
