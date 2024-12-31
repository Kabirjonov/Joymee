import React,{createContext,useState,useContext, useEffect} from "react";
import tranlation from './translation'

const LanguageContext = createContext()

export const LanguageProvider  =  ({children})=>{
    const saveLanguage = localStorage.getItem('language')||'uz'
    const [language,setLanguage]=useState(saveLanguage)
    const [cart,setCart]=useState(false)

    const changeLanguage = (lang)=>{
        setLanguage(lang)
        localStorage.getItem('language',lang)
    }
    return(
        <LanguageContext.Provider value={{language,changeLanguage,tranlation,cart,setCart}}>
            {children}
        </LanguageContext.Provider>
    )
}
export const useLanguage = ()=>useContext(LanguageContext)