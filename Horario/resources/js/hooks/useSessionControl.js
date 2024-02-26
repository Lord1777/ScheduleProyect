import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import useModal from "./useModal";

const useSessionControl = () => {

  let storedToken = localStorage.getItem('access_token');

    const { logout } = useUser();
    const { isModal, ShowOpenModal, ShowCloseModal } = useModal();
    const [alertMessage, setAlertMessage] = useState('');
    const [ ruta, setRuta ] = useState('')

    useEffect(() => {
        const updateUserActivity = () => {
            localStorage.setItem('lastActivity', Date.now());
        };

        const checkUserActivity = () => {
            const lastActivity = localStorage.getItem('lastActivity');
            const sessionTimeout = 15 * 60 * 1000; // 10 minutos en milisegundos

            if (lastActivity && Date.now() - lastActivity > sessionTimeout && storedToken != null) {
                setAlertMessage('Sesión cerrada debido a inactividad')
                setRuta('/')
                ShowOpenModal()
                logout();
            }
        };

        const interval = setInterval(checkUserActivity, 60000); // Verificar cada minuto
        document.addEventListener('mousemove', updateUserActivity);
        document.addEventListener('keydown', updateUserActivity);

        return () => {
            clearInterval(interval);
            document.removeEventListener('mousemove', updateUserActivity);
            document.removeEventListener('keydown', updateUserActivity);
        };
    }, []);

    return {
        isModal,
        ShowOpenModal,
        ShowCloseModal,
        alertMessage,
        ruta
    }
};

export default useSessionControl;