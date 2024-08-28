import { Link, Outlet, Navigate, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { FaBell, FaReceipt } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
export default function DefaultLayout() {
    const { user, token, cart, setUser, setToken, setCart } = useStateContext()
    const navigate = useNavigate();

    const onLogout = (ev) => {
        ev.preventDefault()
        axiosClient.post('/logout')
            .then(() => {
                setUser({})
                setToken(null)
                localStorage.removeItem('userId');
            })
            .catch(error => {
                console.error('Logout error:', error);
                // Handle error if necessary
            });
    }

    useEffect(() => {

        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data);
            })
            .catch(error => {
                localStorage.setItem('userId', 0)
            })
        setCart();
    }, [])






    const goCustomer = () => {
        navigate('/customer');
    }

    const goNotify = () => {
        navigate('/notify');
    }

    const goCart = () => {
        navigate('/cart');
    }
    const goOrder = () => {
        navigate('/order');
    }

    return (
        <div className="w-full" >

            <div className="flex justify-between">

                <div className="border mx-2 px-2 py-1 text-center text-gray-700 bg-blue-300 hover:text-white rounded hover:bg-blue-800 ring-1 mt-5">
                    <Link to="/" className="">Trang chủ</Link>
                </div>
                {
                    token ? (
                        <div className="flex items-center space-x-4">
                            <div>
                                <FaBell onClick={goNotify} className="hover:cursor-pointer text-xl"/>
                            </div>
                            <div>
                                <FaReceipt onClick={goOrder} className="hover:cursor-pointer text-xl" />
                            </div>
                            <div className="relative inline-block">
                                <FaShoppingCart onClick={goCart} className="hover:cursor-pointer text-2xl" />
                                <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
                                    {cart}
                                </div>
                            </div>
                            <p onClick={goCustomer} className="text-lg font-medium text-gray-700 hover:cursor-pointer">{user.name}</p>
                            <a href="#" onClick={onLogout} className="btn-logout text-red-600 hover:text-red-800">
                                Logout
                            </a>
                        </div>
                    ) : (
                        <div className="flex space-x-4 mx-2 mt-5">
                            <div className="relative inline-block">
                                <FaShoppingCart onClick={goCart} className="hover:cursor-pointer text-2xl" />
                                <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
                                    {cart}
                                </div>
                            </div>
                            <Link to="/login" className="text-blue-500 hover:underline">
                                Đăng nhập
                            </Link>
                            <Link to="/signup" className="text-blue-500 hover:underline">
                                Đăng ký
                            </Link>
                        </div>
                    )
                }



            </div>
            <div className="w-full">
                <div className=" w-[85%] mx-auto" >
                    <Outlet />
                </div>
            </div>
            <footer className="bg-gray-800 text-white py-4">
                <div className="container mx-auto text-center">
                    © 2024 Your Company. All rights reserved.
                </div>
            </footer>

        </div>
    );
}