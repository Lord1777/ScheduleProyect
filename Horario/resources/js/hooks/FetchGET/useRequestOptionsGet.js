import React, { useState } from 'react'
import { csrf_token, access_token } from '../../const/api';

export const useRequestOptionsGet = () => {

  let myHeaders = new Headers();

  myHeaders.set('Authorization', `Bearer ${access_token}`);
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
