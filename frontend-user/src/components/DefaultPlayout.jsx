import { Link, Outlet, Navigate, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { FaBell, FaReceipt } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
export default function DefaultLayout() {
    const { user, token, cart, notify, setNotify, setUser, setToken, setCart } = useStateContext();
    const [img, setImg] = useState();
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
        setNotify();
        setCart();
    }, [])

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId && userId > 0) {
            getFile(userId);
        }
    }, [])

    const getFile = async (userId) => {
        const response = await axiosClient.get(`/file/user/${userId}`);
        try{
            const image = await axiosClient.get(`/file/${response.data.file_name}`,{
                responseType: 'blob',
            });
            
            setImg(URL.createObjectURL(image.data));
        }catch(error){
            console.log(error);
        }
    }


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
        //https://i.imgur.com/bpDDMvc.png
        //https://i.imgur.com/oBgQ85X.png
        //https://i.imgur.com/O8JikQC.png
        <div className="w-full" >

            <div className="flex justify-between pr-10 pl-20 mb-5 bg-bgheader-300">
                <div className=" mx-2 text-center my-2">
                    <Link to="/" className="">
                        <img className="w-[150px]" src="https://i.imgur.com/EFWt4EG.png" alt="" />
                    </Link>
                </div>
                {
                    token ? (
                        <div className="flex items-center space-x-4 ">
                            <div className="relative inline-block">
                                <FaBell onClick={goNotify} className="hover:cursor-pointer text-xl" />
                                <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
                                    {notify}
                                </div>
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
                            <div className="group relative">
                                <div onClick={goCustomer} className="flex gap-2 hover:cursor-pointer">
                                {img ?
                                    <img src={img} className="w-6 h-6 rounded-full border object-cover" alt="uploaded image" />
                                    :
                                    <FaUserCircle
                                        className="w-6 h-6 rounded-full border object-cover"
                                    />
                                }
                                <p
                                    
                                    className="text-lg font-medium text-gray-700 "
                                >
                                    {user.name}
                                </p>
                                </div>
                                <div
                                    className="btn-logout text-red-600 hover:text-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute"
                                >
                                    <a
                                        href="#"
                                        onClick={onLogout}

                                    >
                                        Logout
                                    </a>
                                </div>

                            </div>

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
            <div className="w-full ">
                <div className=" w-[85%] mx-auto " >
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