import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    idUsuario: null,
    idRol: null
  });

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);
  
  const setIdUsuarioYRol = (idUsuario, idRol) => {
    const newUser = { idUsuario, idRol };
    setUserData(newUser);
    localStorage.setItem('userData', JSON.stringify(newUser));
  };

  const logout = () => {
    setUserData({
      idUsuario: null,
      idRol: null
    });
    localStorage.removeItem('userData');
  };
  return (
    <UserContext.Provider value={{ userData, setIdUsuarioYRol, logout }}>
      {children}
    </UserContext.Provider>
  );
};
