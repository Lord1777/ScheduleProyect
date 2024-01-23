import React, { useState } from 'react'

const useModalAsignar = () => {

    const [isModal, setIsModal] = useState(false);
    const [asignaciones, setAsignaciones] = useState({});

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
        asignaciones,
        setAsignaciones,
    }
}

export default useModalAsignar