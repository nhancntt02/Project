import { Link, Outlet, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
export default function DefaultLayout() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('shipperId')) {
            navigate('/login');
        }
    }, [])


    const onLogout = (ev) => {
        localStorage.removeItem('shipperId');
        navigate('/login');
    }

    return (
        <div className="w-full" >
            <div className="w-full bg-bgheader-100 min-h-[100vh]">
                <div className="flex justify-end">
                    <div
                        className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 hover:cursor-pointer transition duration-300"
                        onClick={onLogout}
                    >
                        Đăng xuất
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