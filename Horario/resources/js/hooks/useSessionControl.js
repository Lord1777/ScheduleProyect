import React, { useEffect } from "react";
import { useUser } from "../context/UserContext";

const useSessionControl = () => {

  let storedToken = localStorage.getItem('access_token');

  const { logout } = useUser();

  useEffect(() => {
    const updateUserActivity = () => {
      localStorage.setItem('lastActivity', Date.now());
    };

    const checkUserActivity = () => {
      const lastActivity = localStorage.getItem('lastActivity');
      const sessionTimeout = 15 * 60 * 1000; // 10 minutos en milisegundos

      if (lastActivity && Date.now() - lastActivity > sessionTimeout && storedToken) {
        alert('Sesión cerrada debido a inactividad');
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
};

export default useSessionControl;