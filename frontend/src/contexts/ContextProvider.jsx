import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    permiss: null,
    setUser: () => {},
    setToken: () => {},
    setPermiss: () => {}
})

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));//
    const [permiss, setPermiss] = useState({});

    const setToken = (token) => {
        _setToken(token);
        if(token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    return (
        <StateContext.Provider value={{
            user,
            setUser,
            token,
            setToken,
            permiss,
            setPermiss
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);