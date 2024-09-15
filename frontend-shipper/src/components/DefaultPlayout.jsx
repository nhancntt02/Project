import { Link, Outlet, Navigate, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { FaBell, FaReceipt } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
export default function DefaultLayout() {
    const [img, setImg] = useState();
    const navigate = useNavigate();

    if (!localStorage.getItem('shipperId')) {
        navigate('/login');
    }

    const onLogout = (ev) => {
        ev.preventDefault()
        axiosClient.post('/logout')
            .then(() => {
                localStorage.removeItem('employeeId');
            })
            .catch(error => {
                console.error('Logout error:', error);
                // Handle error if necessary
            });
    }



    return (
        <div className="w-full" >
            <div className="w-full ">
                <div className="flex justify-end ">
                    <div onClick={onLogout}>
                        Logout
                    </div>
                </div>
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