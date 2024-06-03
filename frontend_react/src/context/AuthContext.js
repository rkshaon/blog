import React, {createContext, useContext, useState, useEffect, useCallback} from "react";
import { useCookies } from "react-cookie";

const AuthContext = createContext();

export const useAuth = ()=>{
    return useContext(AuthContext);
}

export const AuthProvider = ({children})=>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const checkAuth = useCallback(() => {
        if (cookies.token) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      }, [cookies.token]);
    
      useEffect(() => {
        checkAuth();
      }, [checkAuth]);
    
      const login = (token) => {
        setCookie('token', token, { path: '/', expires: new Date(Date.now() + 604800000) });
        setIsLoggedIn(true);
      };
    
      const logout = () => {
        removeCookie('token');
        setIsLoggedIn(false);
      };

      return (
        <AuthContext.Provider value={{isLoggedIn, login, logout, checkAuth}}>
            {children}
        </AuthContext.Provider>
      )

}