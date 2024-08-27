import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../axios-client";
const StateContext = createContext({
    user: null,
    token: null,
    cart: null,
    products: null,
    setUser: () => {},
    setToken: () => {},
    setCart: () => {},
    setProduct: () => {},
});

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [cart, _setCart] = useState(0);
    const [products, _setProduct] = useState([]);

    const setCart = async () => {
        try {
            const user_id = localStorage.getItem('userId');
            const res = await axiosClient.get(`/cart/${user_id}`);
            _setCart(res.data.data.length); // Store the cart data in state
        } catch (error) {
            console.error(error);
        }
    }
    const setProduct = async () => {
        try {
            const res = await axiosClient.get('/products');
            
            _setProduct(res.data.data);
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
        setProduct();
    }, []);

    return (
        <StateContext.Provider value={{
            user,
            setUser,
            token,
            setToken,
            cart,
            setCart,
            products,
            setProduct
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
