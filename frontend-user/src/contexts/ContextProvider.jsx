import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../axios-client";
const StateContext = createContext({
    user: null,
    token: null,
    cart: null,
    setUser: () => {},
    setToken: () => {},
    setCart: () => {},
});

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [cart, _setCart] = useState(0);

    const setCart = async () => {
        try {
            const user_id = localStorage.getItem('userId');
            const res = await axiosClient.get(`/cart/${user_id}`);
            _setCart(res.data.data.length); // Store the cart data in state
        } catch (error) {
            console.error(error);
        }
    }

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    useEffect(() => {
        setCart(); // Fetch cart data when the user is set
        
    }, []);

    return (
        <StateContext.Provider value={{
            user,
            setUser,
            token,
            setToken,
            cart,
            setCart,
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
