import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../axios-client";
const StateContext = createContext({
    user: null,
    token: null,
    cart: null,
    products: null,
    notify: null,
    setUser: () => {},
    setToken: () => {},
    setCart: () => {},
    setProduct: () => {
        
    },
    setNotify: () => {}
});

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [cart, _setCart] = useState(0);
    const [products, _setProduct] = useState([]);
    const [notify, _setNotify] = useState(0);

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
    const setNotify = async () => {
        try {
            const user_id = localStorage.getItem('userId');
            const res = await axiosClient.get(`/notify/${user_id}`);
            const temp = res.data.data;
            let count = 0;
            for (let index = 0; index < temp.length; index++) {
                if(temp[index].notify_status == 0)
                    count++;
            }
            
            _setNotify(count);
        } catch (error) {
            console.log(error);
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
        setNotify();
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
            setProduct,
            notify,
            setNotify
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
