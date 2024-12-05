import React, { createContext, useState,useEffect } from 'react';
import Cookies from 'js-cookie'
// Token kontekstini yaratamiz
export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    // useEffect(() => {
    //     const savedToken = Cookies.get('token');
    //     if (savedToken) {
    //         setToken(savedToken); // Cookie'dan tokenni o'qish
    //         console.log(token)
    //     }
    // }, []);
    return (
        <TokenContext.Provider value={{ token, setToken }}>
            {children}
        </TokenContext.Provider>
    );
};  