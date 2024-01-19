import React, { useState } from 'react'

const useModalAsignar = () => {

    const [isModal, setIsModal] = useState(false);

    const openModal = () => {
        setIsModal(true);
    };

    const closeModal = () => {
        setIsModal(false);
    }


    return {
        isModal,
        openModal,
        closeModal,
    }
}

export default useModalAsignar