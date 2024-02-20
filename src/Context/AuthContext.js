import React, {createContext, useState} from 'react';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState({
    login: false,
    userDetails: null,
  });

  return (
    <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn, isLoading,setIsLoading}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
