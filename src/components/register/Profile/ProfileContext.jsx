import React,{useState,createContext} from "react";

export const ClientContext = createContext()

export const ClientProvider = ({children})=>{
    const [client,setClient]=useState(null)
    return(
        <ClientContext.Provider value={{client,setClient}}>
            {children}
        </ClientContext.Provider>
    )
}