import React, { createContext, useContext, useState } from 'react'

const UserContext = createContext();

export const UserProvider = ({ children }) => {
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
