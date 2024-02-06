import React, { useState } from 'react'

const useModal = () => {

    const [ isModal, setIsModal ] = useState(false);

    const ShowOpenModal = () =>{
        setIsModal(true);
    };

    const ShowCloseModal = () =>{
        setIsModal(false);
    }

  return {
    isModal,
    ShowOpenModal,
    ShowCloseModal,
  }
}

export default useModal