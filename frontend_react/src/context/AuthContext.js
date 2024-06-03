import React, {createContext, useContext, useState, useEffect} from "react";
import { useCookies } from "react-cookie";

const AuthContext = createContext();

export const useAuth = ()=>{
    return useContext(AuthContext);
}

export const AuthProvider = ({children})=>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    useEffect(() => {
        if (cookies.token) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      }, [cookies]);
    
      const login = (token) => {
        setCookie('token', token, { path: '/', expires: new Date(Date.now() + 604800000) });
        setIsLoggedIn(true);
      };
    
      const logout = () => {
        removeCookie('token');
        setIsLoggedIn(false);
      };

      return (
        <AuthContext.Provider value={{isLoggedIn, login, logout}}>
            {children}
        </AuthContext.Provider>
      )

}