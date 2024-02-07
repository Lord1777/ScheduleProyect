import React, { createContext, useContext, useState } from 'react'
import { useFetchLogout } from '../hooks/FetchGET/useFetchLogout';

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const { fetchLogout } = useFetchLogout();
    const [user, setUser] = useState(null);
  
    const authenticateUser = (token, role, userData) => {
      setUser({
        token,
        role,
        userData,
      });
    };
  
    const logout = () => {
      setUser(null);
      localStorage.removeItem('access_token');
      localStorage.removeItem('role');
      localStorage.removeItem('user_data');
      localStorage.removeItem('lastActivity');
      fetchLogout('/logout');
    };
  
    return (
      <UserContext.Provider value={{ user, authenticateUser, logout }}>
        {children}
      </UserContext.Provider>
    );
  };
  
  export const useUser = () => {
    return useContext(UserContext);
  };
