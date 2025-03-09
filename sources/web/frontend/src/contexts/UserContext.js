import React, { createContext, useState, useContext } from "react";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userAddress, setUserAddress] = useState(null); 
  const [userType, setUserType] = useState(null); 

  return (
    <UserContext.Provider value={{ userAddress, setUserAddress, userType, setUserType }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
