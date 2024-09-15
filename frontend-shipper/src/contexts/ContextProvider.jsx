import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../axios-client";
const StateContext = createContext({
});

export const ContextProvider = ({children}) => {
    

    return (
        <StateContext.Provider value={{

        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
